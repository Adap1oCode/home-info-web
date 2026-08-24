import "server-only";

import { ConfidentialClientApplication, type Configuration } from "@azure/msal-node";

/**
 * Sends the site's enquiry emails as info@ via Microsoft Graph.
 *
 * ── Why not SMTP ────────────────────────────────────────────────────────────
 * Both form routes used nodemailer against smtp.gmail.com. That was never
 * going to work for this mailbox: info@ is Microsoft 365, and M365 refuses
 * Basic Auth while Security Defaults are on —
 *
 *   535 5.7.139 Authentication unsuccessful, user is locked by your
 *   organization's security defaults policy
 *
 * — which is already written up in MICROSOFT_365_FIX.md. Microsoft is also
 * retiring SMTP Basic Auth outright, so the fix was never "find the right SMTP
 * password", it was "stop using SMTP".
 *
 * Graph is the path the reseller platform already uses to send as this exact
 * mailbox, with the same app registration. Enquiries therefore arrive from
 * info@ and land in its Sent Items, next to every other conversation with that
 * client — rather than from a separate sending identity nobody recognises.
 *
 * ── Credentials ─────────────────────────────────────────────────────────────
 * Four env vars, named to match the platform's own convention so the same
 * values can be copied between the two apps without translation. All four are
 * required; there is no fallback, because a half-configured mailer that
 * silently drops enquiries is worse than one that refuses to start.
 */

type GraphConfig = {
  clientId: string;
  tenantId: string;
  clientSecret: string;
  sender: string;
};

function readConfig(): GraphConfig | null {
  const clientId = process.env.MICROSOFT_CLIENT_ID?.trim();
  const tenantId = process.env.MICROSOFT_TENANT_ID?.trim();
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET?.trim();
  const sender = process.env.MICROSOFT_GRAPH_SENDER?.trim();
  if (!clientId || !tenantId || !clientSecret || !sender) return null;
  return { clientId, tenantId, clientSecret, sender };
}

/** True when all four variables are present — routes 500 early when false. */
export function graphMailConfigured(): boolean {
  return readConfig() !== null;
}

/**
 * MSAL caches tokens in-process, so the client is built once per config rather
 * than per request. Recreating it on every send would throw away that cache and
 * hit the token endpoint for every enquiry.
 */
let cachedApp: { key: string; app: ConfidentialClientApplication } | null = null;

function getApp(cfg: GraphConfig): ConfidentialClientApplication {
  const key = `${cfg.clientId}:${cfg.tenantId}`;
  if (cachedApp?.key === key) return cachedApp.app;
  const conf: Configuration = {
    auth: {
      clientId: cfg.clientId,
      authority: `https://login.microsoftonline.com/${cfg.tenantId}`,
      clientSecret: cfg.clientSecret,
    },
  };
  const app = new ConfidentialClientApplication(conf);
  cachedApp = { key, app };
  return app;
}

async function getAccessToken(cfg: GraphConfig): Promise<string> {
  const result = await getApp(cfg).acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });
  if (!result?.accessToken) throw new Error("Microsoft Graph returned no access token.");
  return result.accessToken;
}

export type GraphMail = {
  to: string;
  subject: string;
  text: string;
  html: string;
  /** The enquirer's address, so a reply in Outlook goes to them, not to us. */
  replyTo?: string;
};

/**
 * Sends one message. Throws on failure — the caller decides what the visitor
 * sees, and must not report success for a message that did not send.
 */
export async function sendGraphMail(mail: GraphMail): Promise<void> {
  const cfg = readConfig();
  if (!cfg) throw new Error("Microsoft Graph mail is not configured.");

  const token = await getAccessToken(cfg);

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(cfg.sender)}/sendMail`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          subject: mail.subject,
          body: { contentType: "HTML", content: mail.html },
          toRecipients: [{ emailAddress: { address: mail.to } }],
          ...(mail.replyTo
            ? { replyTo: [{ emailAddress: { address: mail.replyTo } }] }
            : {}),
        },
        /* Keep the copy. An enquiry that is not in Sent Items is invisible to
           whoever picks up the reply later. */
        saveToSentItems: true,
      }),
    },
  );

  if (!res.ok) {
    /* Graph puts the useful part in the body, not the status line — an
       ApplicationAccessPolicy excluding this mailbox reads as a bare 403
       otherwise, which is not a debuggable error message. */
    const detail = await res.text().catch(() => "");
    throw new Error(`Graph sendMail failed (${res.status}): ${detail.slice(0, 400)}`);
  }
}

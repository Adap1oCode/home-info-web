import { contact, phoneHref } from "@/config/site";
import { Unconfirmed } from "@/components/ui/unconfirmed";

/** The service pillar. Soft apricot rather than saturated — it should invite, not shout. */
export default function Talk() {
  return (
    <section id="talk" className="section-y mx-8 rounded-hero bg-coral-soft text-tx max-lg:mx-3.5">
      <div className="mx-auto max-w-[1240px] px-17 max-lg:px-6">
        <div className="grid grid-cols-[1.2fr_0.8fr] items-center gap-17 max-[900px]:grid-cols-1 max-[900px]:gap-11">
          <div>
            <span className="eyebrow bg-white text-coral-ink">Talking to us</span>
            <h2 className="mt-6.5 mb-6 text-[clamp(30px,3.5vw,46px)] tracking-[-0.03em]">
              Some things are quicker on the phone.
            </h2>
            <p className="max-w-[36em] text-[18px] leading-relaxed text-tx-mid">
              If a completion date has moved, if a client has raised something unusual, or if you are
              not sure which searches a property needs, it is usually a short conversation rather
              than a chain of emails.
            </p>
            <a
              href={phoneHref}
              className="mt-7.5 inline-block font-display text-[clamp(40px,5.2vw,66px)] leading-none font-bold tracking-[-0.05em] text-coral-ink hover:text-tx"
            >
              <Unconfirmed when={contact.phone.confirmed} title={contact.phone.note}>
                {contact.phone.display}
              </Unconfirmed>
            </a>
          </div>

          <dl className="flex flex-col gap-3">
            <Fact k="Answered by">{contact.answeredBy}</Fact>
            <Fact k="Hours">
              <Unconfirmed when={contact.hours.confirmed} title={contact.hours.note}>
                {contact.hours.days}, {contact.hours.from}&ndash;{contact.hours.to}
              </Unconfirmed>
            </Fact>
            <Fact k="Email replies">{contact.emailResponse}</Fact>
            <Fact k="Something urgent?">Tell us and we will let you know what is possible</Fact>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Fact({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="rounded-card bg-white px-6.5 py-5">
      <dt className="text-[11px] font-bold uppercase tracking-[0.13em] text-tx-low">{k}</dt>
      <dd className="mt-1 font-display text-[19px] leading-snug font-semibold tracking-[-0.025em]">
        {children}
      </dd>
    </div>
  );
}

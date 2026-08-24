import TrackerDashboard, { type PerformancePayload } from "@/components/tracker/tracker-dashboard";

export const metadata = {
  title: "Live Turnaround Tracker - Home Information Searches Ltd",
  description:
    "Live property-search turnaround times, published council by council and refreshed daily. See how fast, how consistent, and how many searches we complete.",
};

// Refresh at most once a day — matches the daily snapshot cadence of the API.
export const revalidate = 86400;

const API_BASE = process.env.PERFORMANCE_API_URL ?? "http://localhost:3001";

async function getPerformance(): Promise<PerformancePayload | null> {
  try {
    const res = await fetch(`${API_BASE}/api/public/performance?reseller=his`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return (await res.json()) as PerformancePayload;
  } catch {
    return null;
  }
}

export default async function LiveTurnaroundTracker() {
  const data = await getPerformance();

  if (!data) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-6 py-32 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Performance data is refreshing</h1>
        <p className="mt-3 text-gray-600">
          Our live turnaround figures are momentarily unavailable. Please check back shortly.
        </p>
      </section>
    );
  }

  /* Sora used to be loaded here, for this page only. It is the site-wide
     display face now (app/layout.tsx), so this page no longer needs its own
     copy of it — and the rest of the site no longer looks like a different
     website from its own headline page. */
  return <TrackerDashboard data={data} />;
}

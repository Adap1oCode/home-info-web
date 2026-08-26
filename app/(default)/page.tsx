
import Accreditations from "@/components/home/accreditations";
import Cta from "@/components/home/cta";
import Faqs from "@/components/home/faqs";
import Guides from "@/components/home/guides";
import Hero from "@/components/home/hero";
import Integrations from "@/components/home/integrations";
import Pillars from "@/components/home/pillars";
import Process from "@/components/home/process";
import Searches from "@/components/home/searches";
import Story from "@/components/home/story";
import Talk from "@/components/home/talk";
import Testimonials from "@/components/home/testimonials";
import Tools from "@/components/home/tools";
import Turnaround from "@/components/home/turnaround";
import { getPerformance } from "@/lib/performance";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Independent property searches for conveyancers",
  description:
    "Independent property searches for conveyancers and solicitors across England and Wales, with turnaround times published council by council.",
  path: "/",
});

/** Matches the performance API's own daily snapshot cadence. */
export const revalidate = 86_400;

export default async function Home() {
  // Fetched once and threaded down, so a section can never trigger its own call.
  const data = await getPerformance();

  return (
    <>
      <Hero data={data} />
      <Accreditations />
      <Pillars data={data} />
      <Turnaround data={data} />
      <Searches />
      <Story />
      <Process />
      <Integrations />
      <Talk />
      <Tools />
      <Testimonials />
      <Guides />
      <Faqs />
      <Cta />
    </>
  );
}

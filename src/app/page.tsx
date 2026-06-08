// Root URL serves the marketing page (same content as /welcome).
// The app dashboard lives at /app.
//
// This wrapper is a SERVER component (no "use client"), so the JSON-LD below is
// rendered into the initial HTML where crawlers and AI bots can read it. The
// actual marketing UI (WelcomePage) is a client component rendered as a child.
import WelcomePage from "./welcome/page";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <WelcomePage />
    </>
  );
}

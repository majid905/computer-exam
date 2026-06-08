// Renders one or more JSON-LD structured-data blocks as <script> tags.
// JSON-LD is how search engines AND AI assistants understand "what is this
// page about" in a machine-readable way. It's plain JSON inside a script tag —
// invisible to users, read by crawlers.
//
// This is a plain component (no hooks/state), so it works inside both server
// and client components.
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify is safe here — the values come from our own DB/config,
          // not raw user HTML. We escape "<" defensively to prevent breaking out
          // of the script tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}

// Server component: render one or many JSON-LD blocks.
// Eliminates <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(...)}}> boilerplate.

import type { JSX } from "react";

type JsonLdData = Record<string, unknown> | JsonLdData[] | null | undefined;

export function JsonLd({ data }: { data: JsonLdData }): JSX.Element | null {
  if (data == null) return null;
  if (Array.isArray(data)) {
    if (data.length === 0) return null;
    return (
      <>
        {data.map((d, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
          />
        ))}
      </>
    );
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLdBlocks({ blocks }: { blocks: JsonLdData[] }): JSX.Element | null {
  return <JsonLd data={blocks} />;
}
import { createClient, type QueryParams } from "@sanity/client";

/** How long (seconds) Sanity responses may be served from Next's data cache. */
export const SANITY_REVALIDATE = 60;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-01-02",
  useCdn: process.env.NODE_ENV == "production",
});

/**
 * All content reads go through here so Next's data cache (which on Vercel
 * survives redeploys) never holds Sanity content longer than SANITY_REVALIDATE.
 */
export const sanity = {
  fetch: <T>(query: string, params: QueryParams = {}) =>
    client.fetch<T>(query, params, {
      next: { revalidate: SANITY_REVALIDATE },
    }),
};

import { resolveFeedFile } from "@/lib/priceListFeed";

/** Feed se računa pri svakom zahtjevu kako bi se dnevni naziv promijenio u 07:00. */
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ file: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { file } = await context.params;
  const resolved = resolveFeedFile(file);

  if (!resolved) {
    return new Response("Not found", { status: 404 });
  }

  const isLatest = file.startsWith("latest") || file.includes("-latest.");

  return new Response(resolved.body, {
    status: 200,
    headers: {
      "Content-Type": resolved.contentType,
      "Content-Disposition": `inline; filename="${resolved.downloadName}"`,
      "Cache-Control": isLatest
        ? "no-store"
        : "public, max-age=86400, s-maxage=86400, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

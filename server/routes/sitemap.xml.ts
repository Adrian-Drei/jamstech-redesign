import { normalizeSiteUrl } from "../../app/config/site";

const escapeXml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const siteUrl = normalizeSiteUrl(config.public.siteUrl as string);
  const routes = ["/", "/work"];
  const urls = routes
    .map((path) => `  <url><loc>${escapeXml(new URL(path, `${siteUrl}/`).toString())}</loc></url>`)
    .join("\n");

  setHeader(event, "Content-Type", "application/xml; charset=utf-8");
  setHeader(event, "X-Robots-Tag", "noindex");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
});

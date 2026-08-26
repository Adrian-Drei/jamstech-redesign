import { normalizeSiteUrl } from "../../app/config/site";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const siteUrl = normalizeSiteUrl(config.public.siteUrl as string);
  const isPreview = Boolean(config.public.isPreview);

  setHeader(event, "Content-Type", "text/plain; charset=utf-8");

  if (isPreview) {
    return "User-agent: *\nDisallow: /\n";
  }

  return `User-agent: *\nAllow: /\nDisallow: /instruments\nSitemap: ${siteUrl}/sitemap.xml\n`;
});

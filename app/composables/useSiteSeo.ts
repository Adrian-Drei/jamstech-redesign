import { normalizeSiteUrl, site } from "~/config/site";

interface SiteSeoOptions {
  path: string;
  title: string;
  description: string;
  socialDescription?: string;
  type?: "website" | "profile";
  noindex?: boolean;
}

export const useSiteSeo = (options: SiteSeoOptions) => {
  const config = useRuntimeConfig();
  const siteUrl = normalizeSiteUrl(config.public.siteUrl as string);
  const canonicalUrl = new URL(options.path, `${siteUrl}/`).toString();
  const imageUrl = new URL(site.socialImage, `${siteUrl}/`).toString();
  const logoUrl = new URL(site.logo, `${siteUrl}/`).toString();
  const noindex = Boolean(config.public.isPreview) || options.noindex;
  const robots = noindex ? "noindex, nofollow" : "index, follow";
  const socialDescription = options.socialDescription ?? options.description;

  useSeoMeta({
    title: options.title,
    description: options.description,
    author: site.author,
    robots,
    ogType: options.type ?? "website",
    ogSiteName: site.name,
    ogLocale: site.locale,
    ogTitle: options.title,
    ogDescription: socialDescription,
    ogUrl: canonicalUrl,
    ogImage: imageUrl,
    ogImageSecureUrl: imageUrl,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: "image/png",
    ogImageAlt: site.socialImageAlt,
    twitterCard: "summary_large_image",
    twitterTitle: options.title,
    twitterDescription: socialDescription,
    twitterImage: imageUrl,
    twitterImageAlt: site.socialImageAlt,
  });

  useHead({
    link: [{ key: "canonical", rel: "canonical", href: canonicalUrl }],
    meta: [{ key: "og:logo", property: "og:logo", content: logoUrl }],
  });

  return { canonicalUrl, imageUrl, siteUrl };
};

export type ProjectCategory = "client-work" | "web-application" | "business-website" | "template";

export interface Project {
  slug: string; title: string; description: string; type: string;
  categories: ProjectCategory[]; stack: string[]; url?: string; year?: string;
  badge?: string; featured?: boolean;
  preview: "webonova" | "medical" | "travel" | "electrone" | "resort" | "wedding" | "booking";
}

export const projects: Project[] = [
  { slug: "webonova", title: "Webonova", description: "Modern websites for ambitious businesses.", type: "Web Design & Development", categories: ["client-work", "business-website"], stack: ["Nuxt", "Tailwind CSS", "Responsive Development"], url: "https://www.webonova.com/", year: "2026", badge: "CURRENT COMPANY", featured: true, preview: "webonova" },
  { slug: "lionspriderx", title: "LionsPrideRX", description: "A modern telehealth platform connecting patients with licensed doctors.", type: "Telehealth Platform", categories: ["client-work", "web-application"], stack: ["Nuxt", "Laravel"], url: "https://lionspriderx.com/", badge: "CLIENT PROJECT", preview: "medical" },
  { slug: "travel-ai-planner", title: "Travel AI Planner", description: "Personalized itineraries, local discoveries and smarter trip planning with AI.", type: "AI Trip Planning", categories: ["web-application"], stack: ["Nuxt", "Supabase", "OpenAI"], badge: "PERSONAL PROJECT", preview: "travel" },
  { slug: "electrone", title: "Electrone", description: "A product-led corporate catalog and commerce experience for industrial technology.", type: "Corporate Catalog & E-commerce", categories: ["client-work", "web-application", "business-website"], stack: ["Laravel", "Livewire", "Filament"], badge: "CLIENT PROJECT", preview: "electrone" },
  { slug: "private-resort", title: "Private Resort Website", description: "A polished hospitality experience designed to turn visits into stays.", type: "Hospitality Experience", categories: ["business-website", "template"], stack: ["Nuxt", "Tailwind CSS"], url: "https://template-resort-teal.vercel.app/", badge: "TEMPLATE", preview: "resort" },
  { slug: "wedding-rsvp", title: "Wedding RSVP", description: "A personal event experience that makes guest responses simple and memorable.", type: "Client Event Experience", categories: ["client-work", "web-application"], stack: ["Nuxt", "Supabase"], url: "https://wedding-rsvp-beige-sigma.vercel.app/", badge: "CLIENT PROJECT", preview: "wedding" },
  { slug: "resort-booking", title: "Resort Booking Platform", description: "A streamlined accommodation discovery and booking experience.", type: "Booking Template", categories: ["web-application", "template"], stack: ["Nuxt", "Tailwind CSS"], url: "https://booking-template-ashy.vercel.app/", badge: "TEMPLATE", preview: "booking" },
];

import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";
import { instagramProfileUrl } from "@/content/gallery";

/**
 * Person + WebSite JSON-LD for rich results and knowledge panels.
 */
export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    jobTitle: "Fashion model",
    description:
      "Male fashion model — editorial and runway. Albania-born; Milan, Paris, Dubai. Modeling coach.",
    image: absoluteUrl("/images/about/story.png"),
    sameAs: [instagramProfileUrl],
    knowsAbout: ["Fashion modeling", "Editorial photography", "Runway"],
    homeLocation: {
      "@type": "Place",
      name: "Dubai",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Official portfolio of Ermir Zeneli — male model, editorial and high-fashion work.",
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

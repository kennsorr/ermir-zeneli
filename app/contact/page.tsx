import type { Metadata } from "next";
import { PAGE_MAIN_CLASS, PAGE_CONTENT_CLASS, PAGE_TITLE_WITH_DESC_CLASS, PAGE_DESC_CLASS } from "@/lib/layout";
import { DEFAULT_OG_IMAGE_PATH, SITE_NAME, absoluteUrl } from "@/lib/seo";

const contactDescription =
  "Contact Ermir Zeneli — Instagram @ermirzeneli, email. Business, bookings, and partnership inquiries.";

export const metadata: Metadata = {
  title: "Contact",
  description: contactDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${SITE_NAME}`,
    description: contactDescription,
    url: absoluteUrl("/contact"),
    images: [{ url: absoluteUrl(DEFAULT_OG_IMAGE_PATH), alt: `${SITE_NAME} — contact` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${SITE_NAME}`,
    description: contactDescription,
    images: [absoluteUrl(DEFAULT_OG_IMAGE_PATH)],
  },
};

export default function ContactPage() {
  const links = [
    {
      label: "Instagram",
      handle: "@ermirzeneli",
      href: "https://instagram.com/ermirzeneli",
    },
    {
      label: "Email",
      handle: "ermir45@gmail.com",
      href: "mailto:ermir45@gmail.com",
    },
    // WhatsApp hidden for now: +355 69 299 5946, https://wa.me/355692995946
  ] as const;

  return (
    <main className={PAGE_MAIN_CLASS}>
      <div className={PAGE_CONTENT_CLASS}>
        <h1 className={PAGE_TITLE_WITH_DESC_CLASS}>
          Contact
        </h1>
        <p className={PAGE_DESC_CLASS}>
          Reach out for business and partnership inquiries.
        </p>
        <ul className="mt-[35px] flex flex-col gap-8 font-sans md:gap-10">
          {links.map(({ label, handle, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group block tracking-widest uppercase text-foreground-muted transition-colors duration-300 hover:text-foreground"
              >
                <span className="text-xs tracking-[0.2em]">{label}</span>
                <span className="mt-1 block text-base md:text-lg">{handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

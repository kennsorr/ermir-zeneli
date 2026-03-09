import { PAGE_MAIN_CLASS, PAGE_CONTENT_CLASS_NARROW, PAGE_TITLE_CLASS } from "@/lib/layout";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Ermir Zeneli — Instagram, email, WhatsApp.",
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
    {
      label: "WhatsApp",
      handle: "+355 69 299 5946",
      href: "https://wa.me/355692995946",
    },
  ] as const;

  return (
    <main className={PAGE_MAIN_CLASS}>
      <div className={PAGE_CONTENT_CLASS_NARROW}>
        <h1 className={PAGE_TITLE_CLASS}>
          Contact
        </h1>
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

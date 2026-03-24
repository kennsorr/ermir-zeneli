import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ermir Zeneli — Model Portfolio",
    short_name: "Ermir Zeneli",
    description:
      "Official portfolio — male fashion model. Editorial, runway, Dubai. Gallery, story, and contact.",
    start_url: "/",
    display: "browser",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/images/hero/panel-3.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

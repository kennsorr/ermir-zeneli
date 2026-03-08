/**
 * Gallery grid: each thumbnail image (in order) links to the corresponding Instagram post.
 * Images live in /public/images/gallery/1.png … 16.png.
 */
const postUrls = [
  "https://www.instagram.com/p/DUoeO6KiFIH/",
  "https://www.instagram.com/p/DU_KiwNE_Vx/",
  "https://www.instagram.com/p/DUYsxRPiO6X/",
  "https://www.instagram.com/p/DSnT5icCMEZ/",
  "https://www.instagram.com/p/DSVPYs0CCTI/",
  "https://www.instagram.com/p/DSidIHACEXl/",
  "https://www.instagram.com/p/DS_B60yiDqY/",
  "https://www.instagram.com/p/DPW1TY1iD7W/",
  "https://www.instagram.com/p/DPzQBk8CFLl/",
  "https://www.instagram.com/p/DNaha1OtSAy/",
  "https://www.instagram.com/p/DKpvAoVtCut/",
  "https://www.instagram.com/p/DJeQDEgtX_v/",
  "https://www.instagram.com/p/DHRC0P8tjfS/",
  "https://www.instagram.com/p/DGLpdmHtWz2/",
  "https://www.instagram.com/p/DExh1u9N81y/",
  "https://www.instagram.com/p/DAoWW-btHCB/",
] as const;

export const galleryItems = postUrls.map((url, i) => ({
  image: `/images/gallery/${i + 1}.png`,
  url,
}));

export const instagramProfileUrl = "https://www.instagram.com/ermirzeneli/";

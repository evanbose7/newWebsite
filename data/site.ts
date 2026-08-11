export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  shortBio: string;
  fullBio: string[];
  heroBadge: {
    label: string;
    title: string;
    subtitle: string;
    thumbnail: string;
    linkUrl: string;
  };
  socials: {
    platform: string;
    url: string;
    handle: string;
  }[];
  contactEmail: string;
  pressEmail: string;
  bookingEmail: string;
}

export const siteConfig: SiteConfig = {
  name: "JULIAN VANCE",
  role: "Author • Stand-up Comedian • Cultural Critic",
  tagline: "Crafting razor-sharp satire, unvarnished human stories, and quiet observations for a noisy world.",
  shortBio: "Julian Vance is an award-winning comedian, New York Times bestselling author, and creator of the critically acclaimed podcast 'Anatomy of a Rumor'. His work bridges razor-sharp observational humor with profound cultural critique.",
  fullBio: [
    "Born in Chicago and shaped by a decade of late-night sets in basement comedy clubs across Brooklyn and London, Julian Vance has established himself as one of modern satire's most unmistakable voices.",
    "His three bestselling books — including the PEN/Faulkner nominated essay collection 'Echoes of Midnight' — explore modern alienation, collective hysteria, and the art of staying sane in an era of non-stop broadcasting.",
    "When he isn't touring international comedy festivals or recording his top-charting weekly podcast, Julian works as a guest essayist for the Atlantic, Harper's, and the New Yorker.",
    "His latest Netflix stand-up special, 'Julian Vance: Unfiltered Live', was recorded at the historic Apollo Theater and nominated for two Primetime Emmy Awards."
  ],
  heroBadge: {
    label: "LATEST SPECIAL",
    title: "Echoes of Midnight: Live at the Apollo",
    subtitle: "Streaming globally on Netflix • 98% Critics Score",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    linkUrl: "/watch-listen"
  },
  socials: [
    { platform: "YouTube", url: "https://youtube.com", handle: "@julianvance" },
    { platform: "Spotify", url: "https://spotify.com", handle: "Anatomy of a Rumor" },
    { platform: "Instagram", url: "https://instagram.com", handle: "@julianvanceofficial" },
    { platform: "X (Twitter)", url: "https://x.com", handle: "@julianvance" },
    { platform: "Substack", url: "https://substack.com", handle: "Julian Vance's Dispatch" }
  ],
  contactEmail: "hello@julianvance.com",
  pressEmail: "press@julianvance.com",
  bookingEmail: "management@vancearts.com"
};

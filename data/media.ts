export interface MediaItem {
  id: string;
  title: string;
  category: 'Stand-up Special' | 'Podcast Episode' | 'TV & Late Night' | 'Interview & Feature';
  duration: string;
  date: string;
  thumbnail: string;
  embedUrl: string;
  isExternalLink?: boolean;
  description: string;
  featuredOnHome?: boolean;
}

export const mediaData: MediaItem[] = [
  {
    id: "media-01",
    title: "Julian Vance: Echoes of Midnight (Netflix Special Excerpt)",
    category: "Stand-up Special",
    duration: "1h 14m",
    date: "2025",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Recorded live at the Apollo Theater in New York. Julian dissects modern anxiety, group chats, and why nobody knows how to end a phone call anymore.",
    featuredOnHome: true
  },
  {
    id: "media-02",
    title: "Anatomy of a Rumor • Ep 142: The Fine Art of Unsubscribing",
    category: "Podcast Episode",
    duration: "48 mins",
    date: "AUG 2026",
    thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
    embedUrl: "https://open.spotify.com/embed/episode/7gXv8...",
    description: "Julian sits down with guest essayist Zadie Smith to discuss internet disengagement, ghosting culture, and why quietness feels like a revolutionary act.",
    featuredOnHome: true
  },
  {
    id: "media-03",
    title: "Late Night Appearance: The Monologue That Went Viral",
    category: "TV & Late Night",
    duration: "12 mins",
    date: "JUL 2026",
    thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Julian's guest couch interview discussing his latest book nomination and his rules for surviving family holiday dinners.",
    featuredOnHome: true
  },
  {
    id: "media-04",
    title: "BBC Radio 4 Cultural Keynote: 'Why Satire Still Matters'",
    category: "Interview & Feature",
    duration: "32 mins",
    date: "MAY 2026",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "In-depth audio interview delivered at the British Film Institute in London on the evolution of comedy in the post-truth era.",
    featuredOnHome: true
  },
  {
    id: "media-05",
    title: "Live at Sydney Comedy Festival: The Elevator Monologue",
    category: "Stand-up Special",
    duration: "18 mins",
    date: "APR 2026",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Stand-up set performed at the Enmore Theatre about corporate icebreakers and awkward elevator small talk.",
    featuredOnHome: false
  },
  {
    id: "media-06",
    title: "Anatomy of a Rumor • Ep 139: On Solitude & Coffee Shops",
    category: "Podcast Episode",
    duration: "55 mins",
    date: "MAR 2026",
    thumbnail: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop",
    embedUrl: "https://open.spotify.com/embed/episode/...",
    description: "Julian's solo episode reflecting on writing in public spaces and why every coffee shop now plays the exact same lo-fi playlist.",
    featuredOnHome: false
  }
];

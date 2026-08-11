export interface NewsItem {
  id: string;
  date: string;
  year: string;
  title: string;
  category: 'Tour Announcement' | 'Book Release' | 'Podcast' | 'Press & Honors' | 'General';
  description: string;
  linkText?: string;
  linkUrl?: string;
  image?: string;
}

export const newsFeedData: NewsItem[] = [
  {
    id: "news-01",
    date: "AUG 04",
    year: "2026",
    title: "The Noise & The Whispers 2026 World Tour Dates Announced",
    category: "Tour Announcement",
    description: "Julian Vance will hit 18 international cities this autumn starting at New York's Beacon Theatre. Pre-sale tickets open Thursday at 10 AM EST.",
    linkText: "View All Tour Dates",
    linkUrl: "/shows",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "news-02",
    date: "JUL 22",
    year: "2026",
    title: "Nominated for 2 Primetime Emmy Awards",
    category: "Press & Honors",
    description: "'Julian Vance: Echoes of Midnight' on Netflix has been nominated for Outstanding Variety Special (Pre-Recorded) and Outstanding Writing for a Variety Special.",
    linkText: "Watch the Special",
    linkUrl: "/watch-listen"
  },
  {
    id: "news-03",
    date: "JUN 15",
    year: "2026",
    title: "'Echoes of Midnight' Reaches 20 Weeks on NYT Bestseller List",
    category: "Book Release",
    description: "Vance's newest essay collection hits its milestone 20th consecutive week on the New York Times Non-Fiction Bestseller list.",
    linkText: "Explore Books",
    linkUrl: "/books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "news-04",
    date: "MAY 02",
    year: "2026",
    title: "Keynote Speaker at 2026 Edinburgh International Book Festival",
    category: "Press & Honors",
    description: "Julian will deliver the opening keynote address titled 'The Wit of Survival in an Overheated World' at Charlotte Square.",
    linkText: "Learn More",
    linkUrl: "/about"
  },
  {
    id: "news-05",
    date: "APR 11",
    year: "2026",
    title: "Anatomy of a Rumor Hits 15 Million Downloads",
    category: "Podcast",
    description: "Julian's weekly podcast reaches 15M lifetime downloads across Apple Podcasts and Spotify. Special anniversary listener call-in episode out now.",
    linkText: "Listen Now",
    linkUrl: "/watch-listen"
  },
  {
    id: "news-06",
    date: "FEB 18",
    year: "2026",
    title: "New Guest Column Published in The Atlantic",
    category: "General",
    description: "Read Julian's latest essay: 'Why We Can't Stop Apologizing for Being 5 Minutes Late'. Available to read online for Atlantic subscribers.",
    linkText: "Read Article",
    linkUrl: "https://theatlantic.com"
  }
];

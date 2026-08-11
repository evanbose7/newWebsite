export interface BookItem {
  id: string;
  title: string;
  subtitle: string;
  publishedYear: string;
  publisher: string;
  format: string;
  coverImage: string;
  accentColor: string;
  blurb: string;
  praiseQuotes: {
    quote: string;
    source: string;
  }[];
  buyLinks: {
    storeName: string;
    url: string;
  }[];
  sampleExcerpt: {
    chapterTitle: string;
    content: string[];
  };
  isBestseller?: boolean;
}

export const booksData: BookItem[] = [
  {
    id: "echoes-of-midnight",
    title: "Echoes of Midnight",
    subtitle: "Essays on Noise, Solitude, and Modern Comedy",
    publishedYear: "2025",
    publisher: "Farrar, Straus and Giroux",
    format: "Hardcover, Paperback, eBook & Audible",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
    accentColor: "#3D0C24",
    isBestseller: true,
    blurb: "A incandescent, razor-sharp exploration of how constant digital broadcasting has transformed human conversation into an endlessly escalating comedy of errors. Vance dissects our obsession with public performance with tenderness and unforgiving wit.",
    praiseQuotes: [
      {
        quote: "Julian Vance has written the definitive satirical autopsy of 2020s culture. Equal parts hilarious and haunting.",
        source: "The New York Times Book Review"
      },
      {
        quote: "A masterpiece of modern essay technique. Vance's prose crackles like dry wood in a midnight campfire.",
        source: "The Atlantic"
      }
    ],
    buyLinks: [
      { storeName: "Bookshop.org", url: "https://bookshop.org" },
      { storeName: "Amazon", url: "https://amazon.com" },
      { storeName: "Barnes & Noble", url: "https://barnesandnoble.com" },
      { storeName: "Audible (Narrated by Julian)", url: "https://audible.com" }
    ],
    sampleExcerpt: {
      chapterTitle: "Chapter 1: The Silence After The Punchline",
      content: [
        "There is a distinct sound that occurs when eight hundred people in a velvet-lined basement simultaneously realize that a joke wasn't actually a joke, but an inadvertent confession.",
        "It isn't a gasp. A gasp requires theatrical lung expansion. It is a microscopic intake of breath, a collective pause of judgment before the laugh arrives to rescue everyone from the truth.",
        "We live in an age where nobody wants to be caught sitting in that pause. We rush to comment, to react, to quote-tweet, to file the experience into a pre-cooked category before our nervous system has even finished processing the sound of the words."
      ]
    }
  },
  {
    id: "the-art-of-asking-why",
    title: "The Art of Asking Why",
    subtitle: "Inquiries into the Absurdity of Daily Rituals",
    publishedYear: "2023",
    publisher: "Penguin Random House",
    format: "Hardcover & Audiobook",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    accentColor: "#CFA052",
    isBestseller: true,
    blurb: "Why do we applaud when planes land? Why do corporate emails begin with 'I hope this finds you well'? In this critically acclaimed bestseller, Vance turns his comedic microscope onto the unwritten rules of civil society.",
    praiseQuotes: [
      {
        quote: "Witty, incisive, and unpretentious. Reading Vance is like seeing your own daily habits stripped of their rationalizations.",
        source: "The Washington Post"
      }
    ],
    buyLinks: [
      { storeName: "Bookshop.org", url: "https://bookshop.org" },
      { storeName: "Amazon", url: "https://amazon.com" }
    ],
    sampleExcerpt: {
      chapterTitle: "Chapter 3: The Protocol of Small Talk",
      content: [
        "If an alien were to eavesdrop on elevator rides across North America, they would reasonably conclude that humans spend 70% of their waking mental capacity calculating ambient temperature differentials.",
        "We treat small talk not as a bridge to connection, but as an acoustic shield designed to prevent real intimacy from accidentally breaking out."
      ]
    }
  },
  {
    id: "laughter-in-the-dark",
    title: "Laughter in the Dark",
    subtitle: "Notes from Ten Years on the Comedy Road",
    publishedYear: "2021",
    publisher: "Simon & Schuster",
    format: "Paperback & Audio",
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    accentColor: "#150510",
    blurb: "A gritty, hilariously honest memoir detailing Vance's early years sleeping on green room couches, bombing in regional diner-theaters, and discovering what it really takes to hold a microphone in front of strangers.",
    praiseQuotes: [
      {
        quote: "Required reading for anyone who has ever thought about standing on a stage alone with a microphone.",
        source: "Marc Maron, WTF Podcast"
      }
    ],
    buyLinks: [
      { storeName: "Amazon", url: "https://amazon.com" },
      { storeName: "Powell's Books", url: "https://powells.com" }
    ],
    sampleExcerpt: {
      chapterTitle: "Prologue: Ohio at 3 AM",
      content: [
        "The diner neon hummed in a frequency that matched the persistent vibration in my left ear. I had just completed a set for four people, two of whom were off-duty line cooks waiting for their rides home.",
        "That night I learned the most vital rule of stand-up: if you can make a line cook laugh while he is holding a mop at 3:15 in the morning, you can handle any theater in Western civilization."
      ]
    }
  },
  {
    id: "notes-from-the-fringe",
    title: "Notes from the Fringe",
    subtitle: "Collected Cultural Dispatches 2017-2020",
    publishedYear: "2020",
    publisher: "Vance Arts Press",
    format: "Limited Edition Hardcover & Digital",
    coverImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop",
    accentColor: "#E5583B",
    blurb: "An exclusive compilation of Vance's acclaimed dispatches written for Harpers, Slate, and his early independent gazette during his international festival tours.",
    praiseQuotes: [
      {
        quote: "Vance's voice is indispensable—sharp, generous, and endlessly curious.",
        source: "The Guardian"
      }
    ],
    buyLinks: [
      { storeName: "Julian Vance Official Store", url: "/store" }
    ],
    sampleExcerpt: {
      chapterTitle: "Dispatch 14: Edinburgh Under the Rain",
      content: [
        "The Royal Mile in August smells like damp wool, roasted nuts, and cheap beer. Three thousand performers are simultaneously asking you for five minutes of your life."
      ]
    }
  }
];

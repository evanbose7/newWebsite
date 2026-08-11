export interface ShowEvent {
  id: string;
  date: string;
  dayOfWeek: string;
  time: string;
  city: string;
  country: string;
  venue: string;
  tourName: string;
  status: 'On Sale' | 'Selling Fast' | 'Sold Out' | 'Extra Show Added';
  ticketUrl: string;
  vipAvailable: boolean;
  notes?: string;
}

export const showsData: ShowEvent[] = [
  {
    id: "show-01",
    date: "SEP 18, 2026",
    dayOfWeek: "THURSDAY",
    time: "8:00 PM",
    city: "New York, NY",
    country: "USA",
    venue: "Beacon Theatre",
    tourName: "The Noise & The Whispers Tour 2026",
    status: "Selling Fast",
    ticketUrl: "https://ticketmaster.com",
    vipAvailable: true,
    notes: "Special guest opener to be announced."
  },
  {
    id: "show-02",
    date: "SEP 19, 2026",
    dayOfWeek: "FRIDAY",
    time: "7:30 PM",
    city: "New York, NY",
    country: "USA",
    venue: "Beacon Theatre",
    tourName: "The Noise & The Whispers Tour 2026",
    status: "Sold Out",
    ticketUrl: "https://ticketmaster.com",
    vipAvailable: false,
    notes: "Live audio recording session."
  },
  {
    id: "show-03",
    date: "OCT 02, 2026",
    dayOfWeek: "FRIDAY",
    time: "8:30 PM",
    city: "London",
    country: "UK",
    venue: "Eventim Apollo, Hammersmith",
    tourName: "The Noise & The Whispers Tour 2026",
    status: "Extra Show Added",
    ticketUrl: "https://eventim.co.uk",
    vipAvailable: true
  },
  {
    id: "show-04",
    date: "OCT 14, 2026",
    dayOfWeek: "WEDNESDAY",
    time: "8:00 PM",
    city: "Chicago, IL",
    country: "USA",
    venue: "The Chicago Theatre",
    tourName: "The Noise & The Whispers Tour 2026",
    status: "Selling Fast",
    ticketUrl: "https://ticketmaster.com",
    vipAvailable: true
  },
  {
    id: "show-05",
    date: "OCT 24, 2026",
    dayOfWeek: "SATURDAY",
    time: "9:00 PM",
    city: "Los Angeles, CA",
    country: "USA",
    venue: "The Wiltern",
    tourName: "The Noise & The Whispers Tour 2026",
    status: "On Sale",
    ticketUrl: "https://livenation.com",
    vipAvailable: true,
    notes: "Post-show Q&A with book signing."
  },
  {
    id: "show-06",
    date: "NOV 08, 2026",
    dayOfWeek: "SUNDAY",
    time: "7:00 PM",
    city: "Toronto, ON",
    country: "Canada",
    venue: "Massey Hall",
    tourName: "The Noise & The Whispers Tour 2026",
    status: "On Sale",
    ticketUrl: "https://masseyhall.mobi",
    vipAvailable: false
  },
  {
    id: "show-07",
    date: "NOV 20, 2026",
    dayOfWeek: "FRIDAY",
    time: "8:00 PM",
    city: "Sydney",
    country: "Australia",
    venue: "Sydney Opera House (Concert Hall)",
    tourName: "The Noise & The Whispers Tour 2026",
    status: "Selling Fast",
    ticketUrl: "https://sydneyoperahouse.com",
    vipAvailable: true
  }
];

export const wedding = {
  hashtag: "#ShravanWedsSaiPriya",
  groom: {
    name: "Shravan Kumar",
    fullName: "Shravan Kumar Bhupelli",
    parents: "S/o Mr. Ramulu & Mrs. Swaroopa Bhupelli",
  },
  bride: {
    name: "Sai Priya",
    fullName: "Sai Priya Kothakapu",
    parents: "D/o Mr. Rajender & Mrs. Anuradha Kothakapu",
  },
  date: "2026-08-23T11:23:00-05:00",
  dateDisplay: "23rd August 2026",
  venue: {
    name: "Sri Venkateswara Swami (Balaji) Temple",
    address: "1145 Sullivan Rd, Aurora, IL 60506",
    mapUrl: "https://maps.google.com/?q=1145+Sullivan+Rd,+Aurora,+IL+60506",
  },
  shloka: {
    devanagari: "॥ ॐ श्री गणेशाय नमः ॥",
    blessing:
      "With the blessings of the Almighty and our beloved families, we joyfully invite you to grace the auspicious occasion of our wedding.",
  },
  events: [
    {
      id: "mehendi",
      name: "Mehendi Ceremony",
      tagline: "An evening of intricate henna and joy",
      date: "20th August 2026",
      time: "6:00 PM onwards",
      venue: "Aurora, Illinois",
      theme: "mehendi" as const,
    },
    {
      id: "sangeet",
      name: "Sangeet Night",
      tagline: "A night of music, dance and celebration",
      date: "21st August 2026",
      time: "6:00 PM onwards",
      venue: "Aurora, Illinois",
      theme: "sangeet" as const,
    },
    {
      id: "haldi",
      name: "Haldi Ceremony",
      tagline: "Filled with love, laughter and turmeric",
      date: "22nd August 2026",
      time: "9:00 AM onwards",
      venue: "Aurora, Illinois",
      theme: "haldi" as const,
    },
    {
      id: "wedding",
      name: "Wedding Ceremony",
      tagline: "The sacred union — Shubh Vivah",
      date: "23rd August 2026",
      time: "11:23 AM (Shubh Muhurat)",
      venue: "Sri Venkateswara Swami (Balaji) Temple, Aurora, IL",
      theme: "wedding" as const,
    },
  ],
};

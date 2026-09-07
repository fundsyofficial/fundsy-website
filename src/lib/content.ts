/** Placeholder editorial content.
 *
 *  Everything here is hand-written stand-in copy so the layouts can be judged
 *  with real sentences instead of lorem ipsum. In Phase 4 the listings, the
 *  mosaic and the rail all come from Supabase; the shapes below are what those
 *  queries need to return, so treat them as the schema sketch. */

import type { MosaicData } from "@/components/BoardMosaic";
import type { Deadline, FeaturedItem } from "@/components/FeaturedRail";

export const HERO = {
  eyebrow: "Made by students at UTD, UTA, SMU, TCU and UNT",
  title: "College in DFW gets cheaper when somebody tells you where to look.",
  body:
    "Fundsy keeps one running list of the scholarships, discounts, free food, campus services and local spots we’ve actually used. No sign-up, no paywall — just the stuff we wish someone had handed us freshman year.",
  tabs: [
    { href: "/resources", label: "Student resources" },
    { href: "/opportunities", label: "Opportunities" },
    { href: "/savings", label: "Savings" },
    { href: "/small-businesses", label: "Small businesses ♡" },
  ],
} as const;

export const MOSAIC: MosaicData = {
  lead: {
    href: "/resources#transport",
    src: "/assets/img/busride.jpg",
    alt: "A city bus pulling up to a stop",
    tone: "sun",
    pill: "Transportation",
    meta: "Updated 3 September",
    title: "How to actually get around DFW without a car",
  },
  flat: {
    pill: "Opportunities",
    title: "23 internships are taking applications right now",
    body:
      "Paid roles across Dallas and Fort Worth, sorted by deadline. Nine of them don’t ask for any prior experience.",
    rows: [
      { href: "/opportunities#scholarships", label: "Scholarships closing this month", note: "7 open" },
      { href: "/opportunities#jobs", label: "Campus jobs that fit a class schedule", note: "16 open" },
    ],
  },
  narrow: {
    href: "/small-businesses",
    src: "/assets/img/coffee.jpg",
    alt: "Stools along the counter of a small coffee shop",
    tone: "lilac",
    pill: "Small business",
    meta: "September spotlight",
    title: "Ceci’s Coffee, nine years by the UTA gates",
  },
  wide: {
    href: "/resources#food",
    src: "/assets/img/pantry.jpg",
    alt: "Shelves of produce in a food pantry",
    tone: "mint",
    pill: "Food",
    title: "The four campus pantries that never ask for paperwork",
    body: "Open weekly at UTD, UTA, UNT and Dallas College. Bring a tote and a student ID.",
  },
  chips: {
    items: [
      { href: "/resources#transport", label: "Transportation" },
      { href: "/resources#food", label: "Food" },
      { href: "/resources#health", label: "Healthcare" },
      { href: "/resources#academics", label: "Academics" },
      { href: "/opportunities#scholarships", label: "Scholarships" },
    ],
    action: { href: "/resources", label: "Browse every section" },
  },
};

export const HOME_FEATURED: FeaturedItem[] = [
  {
    href: "/resources#food",
    date: "12 September",
    title: "Where to eat for under ten dollars near every DFW campus",
    src: "/assets/img/market.jpg",
    alt: "A produce stall at a farmers market",
    tone: "mint",
  },
  {
    href: "/savings",
    date: "5 September",
    title: "Every museum in the metroplex you can walk into free",
    src: "/assets/img/campus2.jpg",
    alt: "The dome of a civic museum building",
    tone: "pink",
  },
  {
    href: "/opportunities#scholarships",
    date: "28 August",
    title: "Reading a scholarship deadline properly, and why it matters",
    src: "/assets/img/library.jpg",
    alt: "Someone reading in a library",
    tone: "sun",
  },
];

export const HOME_DEADLINES: Deadline[] = [
  { href: "/opportunities", label: "City of Arlington summer internship", days: 3 },
  { href: "/opportunities", label: "Terry Foundation scholarship", days: 9 },
  { href: "/opportunities", label: "UNT emergency aid grant", days: 21 },
  { href: "/opportunities", label: "Dallas Foundation, first-generation award", days: 30 },
];

export const SECTION_TILES = [
  {
    href: "/resources",
    tone: "sun",
    title: "Student resources",
    body: "Transportation, food, healthcare, wellness and academic help across the metroplex.",
    meta: "48 listings",
  },
  {
    href: "/opportunities",
    tone: "mint",
    title: "Opportunities",
    body: "Scholarships, internships, part-time jobs and volunteering, sorted by what closes soonest.",
    meta: "23 open now",
  },
  {
    href: "/savings",
    tone: "pink",
    title: "Savings + student discounts",
    body: "Verified discounts, free things to do on a weekend, and the cheap finds worth the drive.",
    meta: "60+ places",
  },
  {
    href: "/small-businesses",
    tone: "lilac",
    title: "Small businesses ♡",
    body: "Local owners we love, with their hours, links and whatever they offer students.",
    meta: "14 spotlights",
  },
] as const;

/* Initials rather than faces: a stock portrait standing in for a named
   ambassador is worse than an obvious placeholder. */
export const TEAM_INITIALS = [
  { initials: "AM", tone: "sun" },
  { initials: "RC", tone: "mint" },
  { initials: "PS", tone: "pink" },
  { initials: "JT", tone: "lilac" },
  { initials: "DL", tone: "sun" },
] as const;

export const INSTAGRAM = [
  { src: "/assets/img/ig1.jpg", tone: "pink" },
  { src: "/assets/img/ig2.jpg", tone: "sun" },
  { src: "/assets/img/ig3.jpg", tone: "mint" },
  { src: "/assets/img/ig4.jpg", tone: "lilac" },
  { src: "/assets/img/ig5.jpg", tone: "mint" },
  { src: "/assets/img/ig6.jpg", tone: "pink" },
] as const;

/* ---------------------------------------------------------------- resources */

export type ResourceCategory = {
  id: string;
  name: string;
  tone: Tone | "paper";
  keyTone: Tone;
  count: string;
  intro: string;
  photo: { src: string; alt: string };
  rows?: { title: string; pill?: string; body: string; link?: { href: string; label: string } }[];
  pairs?: { pill: string; title: string; body: string; link: { href: string; label: string } }[];
  trio?: { title: string; body: string }[];
  quote?: string;
};

import type { Tone } from "@/lib/site";

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: "transport",
    name: "Transportation",
    tone: "sun",
    keyTone: "sun",
    count: "11 listings",
    intro:
      "DFW is spread out and most of us are working with a bus pass, a hand-me-down car, or a friend who owes us a favour. Here’s what actually helps.",
    photo: { src: "/assets/img/busride.jpg", alt: "A city bus at a downtown stop" },
    rows: [
      {
        title: "DART GoPass student semester pass",
        pill: "Free to apply",
        body:
          "$60 for unlimited rail and bus for a full semester, verified with your .edu address. Works on the Red, Blue, Green and Orange lines plus every DART bus and the TRE toward Fort Worth.",
        link: { href: "/resources#transport", label: "Apply through GoPass" },
      },
      {
        title: "Campus shuttles that leave the campus",
        pill: "Free",
        body:
          "Four schools run shuttles to grocery stores and rail stations that aren’t on the official campus map. Times change every semester, so we re-check them in August and January.",
        link: { href: "/resources#transport", label: "See the routes by campus" },
      },
    ],
    quote:
      "If you’re commuting to UTA from Dallas, the TRE to CentrePort plus the 64 bus beats driving during rush hour almost every time. — Priya, UTA ’27",
  },
  {
    id: "food",
    name: "Food",
    tone: "mint",
    keyTone: "mint",
    count: "14 listings",
    intro:
      "Campus pantries, community fridges, and the restaurants that will feed you for under ten dollars. No paperwork required for anything in this section.",
    photo: { src: "/assets/img/market.jpg", alt: "Crates of produce at a market stall" },
    pairs: [
      {
        pill: "Open weekly",
        title: "Campus food pantries",
        body:
          "Six pantries across DFW schools. Most ask only for a student ID, and several stock fresh produce on delivery day.",
        link: { href: "/resources#food", label: "Hours and locations" },
      },
      {
        pill: "Any time",
        title: "Community fridges near campus",
        body:
          "Open-access fridges in Oak Cliff, Denton and south Arlington. Take what you need, leave what you can.",
        link: { href: "/resources#food", label: "Find the nearest one" },
      },
    ],
  },
  {
    id: "health",
    name: "Healthcare",
    tone: "pink",
    keyTone: "pink",
    count: "8 listings",
    intro:
      "Where to go without insurance, what your student health fee already covers, and the clinics that charge on a sliding scale.",
    photo: { src: "/assets/img/clinic.jpg", alt: "A clinician preparing a vaccination" },
    rows: [
      {
        title: "Sliding-scale clinics in Dallas and Tarrant counties",
        body:
          "Nine clinics that set the price against your income, including two that stay open past 7pm on weekdays. Bring a pay stub if you have one; most will work without it.",
        link: { href: "/resources#health", label: "See the clinic list" },
      },
      {
        title: "What your student health fee already pays for",
        body:
          "You are probably already covered for basic visits, some vaccines and a set number of counselling sessions. We broke it down school by school.",
        link: { href: "/resources#health", label: "Check your school" },
      },
    ],
  },
  {
    id: "wellness",
    name: "Wellness",
    tone: "lilac",
    keyTone: "lilac",
    count: "7 listings",
    intro:
      "Counselling, crisis lines, free gym access and the quiet places to sit when the library is full.",
    photo: { src: "/assets/img/yoga.jpg", alt: "A stretching class in a studio" },
    trio: [
      { title: "Free counselling sessions", body: "How many you get, and how to book without a three-week wait." },
      { title: "24-hour support lines", body: "Texas and national lines, including text-only options." },
      { title: "Rec centres open to all students", body: "Four campuses let visiting students in free with an ID." },
    ],
  },
  {
    id: "academics",
    name: "Academics",
    tone: "paper",
    keyTone: "ink",
    count: "8 listings",
    intro:
      "Tutoring, writing centres, textbook workarounds and the advising appointments worth booking early.",
    photo: { src: "/assets/img/library.jpg", alt: "A student working at a desk of books" },
    rows: [
      {
        title: "Getting textbooks without paying list price",
        body:
          "Library reserves, interlibrary loan, open-access editions and the three rental sites that consistently come out cheapest.",
        link: { href: "/resources#academics", label: "Read the guide" },
      },
    ],
  },
];

export const RESOURCE_FEATURED: FeaturedItem[] = [
  {
    href: "/resources#food",
    date: "12 September",
    title: "Where to eat for under ten dollars near every campus",
    src: "/assets/img/pantry.jpg",
    alt: "Produce shelves in a grocery aisle",
    tone: "mint",
  },
  {
    href: "/resources#transport",
    date: "5 September",
    title: "The TRE, the 64, and getting to Fort Worth for $2.50",
    src: "/assets/img/busride.jpg",
    alt: "A city bus at a stop",
    tone: "sun",
  },
  {
    href: "/resources#health",
    date: "28 August",
    title: "What to say when a clinic asks about insurance",
    src: "/assets/img/clinic.jpg",
    alt: "A clinician at work",
    tone: "pink",
  },
];

export const RESOURCE_DEADLINES: Deadline[] = [
  { href: "/resources#food", label: "Campus pantry volunteer sign-up", days: 4 },
  { href: "/resources#health", label: "Free flu clinic, UTD", days: 12 },
  { href: "/resources#transport", label: "Spring bus pass, discounted rate", days: 26 },
];

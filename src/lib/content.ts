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

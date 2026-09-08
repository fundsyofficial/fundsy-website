/** Content for the six sections built out in Phase 3.
 *
 *  Same caveat as content.ts: hand-written stand-in copy so the layouts can be
 *  judged with real sentences. Every listing here needs checking by a student
 *  before it goes live — the dates, amounts and deadlines are plausible, not
 *  verified. In Phase 4+ this comes from Supabase. */

import type { Deadline, FeaturedItem } from "@/components/FeaturedRail";
import type { Tone } from "@/lib/site";

/* --------------------------------------------------------------- about ---- */

export const ABOUT = {
  intro:
    "Two students started keeping a list. It got long enough to be worth sharing, and then long enough to need a website.",
  story: [
    "In spring 2025 Amy missed a scholarship deadline she'd have qualified for, because the only place it was posted was a noticeboard in a building she had no reason to walk into. Ryan had been keeping a note on his phone of every place near campus that took a student ID. Comparing the two, it was obvious neither of us was the only one missing things.",
    "Fundsy is that list, checked and kept current. Everything on it has been used by a student at a DFW school, or verified by one who called ahead. If we can't confirm something, it doesn't go up.",
  ],
  principles: [
    {
      tone: "sun" as Tone,
      title: "Free to read, always",
      body: "No account, no paywall, no email gate. A resource you can only reach by handing over your details isn't a resource, it's a mailing list.",
    },
    {
      tone: "mint" as Tone,
      title: "Checked by someone who was there",
      body: "A student on that campus confirms every listing before it goes up, and re-checks the time-sensitive ones each semester.",
    },
    {
      tone: "pink" as Tone,
      title: "Small businesses don't pay us",
      body: "Spotlights are free. We write about places we actually go, and we say so when a business gives us something.",
    },
    {
      tone: "lilac" as Tone,
      title: "We say when we don't know",
      body: "If a deadline is unclear or a discount is inconsistent, the listing says that instead of guessing.",
    },
  ],
  numbers: [
    { value: "48", label: "listings checked this semester" },
    { value: "6", label: "DFW campuses covered" },
    { value: "12", label: "students keeping it current" },
    { value: "$0", label: "taken from any business" },
  ],
  goals: [
    "An ambassador on every DFW campus, not just the six we cover now",
    "Listings in Spanish, since a third of the students we're writing for are more comfortable reading it",
    "A weekly text for deadlines, for students who don't open newsletters",
  ],
};

/* ------------------------------------------------------- opportunities ---- */

export type Listing = {
  title: string;
  pill?: string;
  body: string;
  link?: { href: string; label: string };
};

export type Section = {
  id: string;
  name: string;
  tone: Tone | "paper";
  keyTone: Tone;
  count: string;
  intro: string;
  photo: { src: string; alt: string };
  /* Categories deliberately don't all look the same: "rows" is the full
     listing, "pairs" a two-up, "trio" a compact three-up. */
  layout?: "rows" | "pairs" | "trio";
  listings: Listing[];
  note?: string;
};

export const OPPORTUNITY_SECTIONS: Section[] = [
  {
    id: "scholarships",
    name: "Scholarships",
    tone: "mint",
    keyTone: "mint",
    count: "7 open",
    intro:
      "Money you don't pay back. Most of these close on a date nobody advertises well, which is the whole reason this page exists.",
    photo: { src: "/assets/img/grads.jpg", alt: "Students at a graduation ceremony" },
    listings: [
      {
        title: "Terry Foundation Scholarship",
        pill: "Closes Dec 15",
        body: "Full tuition plus a living stipend for Texas students entering a state university. Two essays and one recommendation. Selective, but the application is shorter than most people expect.",
        link: { href: "/opportunities#scholarships", label: "Read the requirements" },
      },
      {
        title: "Dallas Foundation first-generation award",
        pill: "Closes in 30 days",
        body: "For students who are the first in their family to attend college. No minimum GPA. Reviewers have said the personal statement carries more weight than the transcript.",
        link: { href: "/opportunities#scholarships", label: "See what they ask for" },
      },
      {
        title: "Departmental awards nobody applies for",
        pill: "Varies",
        body: "Most departments hold small awards that go unclaimed because they're only posted to a mailing list. We list the ones we've confirmed, by school and department.",
        link: { href: "/opportunities#scholarships", label: "Find yours" },
      },
    ],
    note: "Apply even when you think you won't get it. The departmental ones in particular often have fewer applicants than awards. — Amy",
  },
  {
    id: "internships",
    name: "Internships",
    tone: "sun",
    keyTone: "sun",
    count: "9 open",
    intro:
      "Paid only. We don't list unpaid internships — if a company can afford an intern, it can afford to pay one.",
    photo: { src: "/assets/img/jobs.jpg", alt: "Interview notes on a desk" },
    listings: [
      {
        title: "City of Arlington summer internship",
        pill: "Closes in 3 days",
        body: "Twelve weeks, paid hourly, across planning, parks and communications. Open to sophomores and up at any Texas school. No prior experience required for most of the roles.",
        link: { href: "/opportunities#internships", label: "Apply" },
      },
      {
        title: "Nine roles that don't ask for experience",
        pill: "Rolling",
        body: "Sorted out of the wider list, because 'entry level, three years required' is the single most common complaint we hear.",
        link: { href: "/opportunities#internships", label: "See the nine" },
      },
    ],
  },
  {
    id: "jobs",
    name: "Part-time jobs",
    tone: "pink",
    keyTone: "pink",
    count: "16 open",
    intro:
      "Work that fits around a class schedule, mostly on or near campus, with managers who understand what finals week is.",
    photo: { src: "/assets/img/library.jpg", alt: "A student working at a desk" },
    listings: [
      {
        title: "On-campus jobs, by school",
        pill: "Term time",
        body: "Library desks, rec centres, labs and department offices. On-campus work is usually the most flexible around a timetable and doesn't cost you a commute.",
        link: { href: "/opportunities#jobs", label: "Browse by campus" },
      },
      {
        title: "Work-study, and whether you qualify",
        body: "Work-study is need-based and has to be on your aid offer, but plenty of students who qualify never claim it because nobody explained what it was.",
        link: { href: "/opportunities#jobs", label: "Check your eligibility" },
      },
    ],
  },
  {
    id: "volunteering",
    name: "Volunteering",
    tone: "lilac",
    keyTone: "lilac",
    count: "11 listed",
    intro:
      "For service hours, for a scholarship application, or because it's a good way to spend a Saturday.",
    photo: { src: "/assets/img/market.jpg", alt: "A community market stall" },
    listings: [
      {
        title: "Placements that sign off service hours",
        pill: "Ongoing",
        body: "Not every organisation will sign a form. These will, and we've noted who to ask at each one.",
        link: { href: "/opportunities#volunteering", label: "See the list" },
      },
      {
        title: "One-off weekends",
        body: "Food bank shifts, park clean-ups and festival crews. No commitment past the day itself.",
        link: { href: "/opportunities#volunteering", label: "What's coming up" },
      },
    ],
  },
];

export const OPPORTUNITY_DEADLINES: Deadline[] = [
  { href: "/opportunities#internships", label: "City of Arlington summer internship", days: 3 },
  { href: "/opportunities#scholarships", label: "Terry Foundation scholarship", days: 9 },
  { href: "/opportunities#scholarships", label: "UNT emergency aid grant", days: 21 },
  { href: "/opportunities#scholarships", label: "Dallas Foundation, first-generation", days: 30 },
];

export const OPPORTUNITY_FEATURED: FeaturedItem[] = [
  {
    href: "/opportunities#scholarships",
    date: "28 August",
    title: "Reading a scholarship deadline properly, and why it matters",
    src: "/assets/img/library.jpg",
    alt: "Someone reading in a library",
    tone: "mint",
  },
  {
    href: "/opportunities#internships",
    date: "20 August",
    title: "What “entry level” actually means on a DFW job posting",
    src: "/assets/img/jobs.jpg",
    alt: "Interview notes on a desk",
    tone: "sun",
  },
  {
    href: "/opportunities#jobs",
    date: "11 August",
    title: "Work-study, explained by someone who nearly missed it",
    src: "/assets/img/grads.jpg",
    alt: "Students at graduation",
    tone: "pink",
  },
];

/* ------------------------------------------------------------- savings ---- */

export const SAVINGS_SECTIONS: Section[] = [
  {
    id: "discounts",
    name: "Student discounts",
    tone: "pink",
    keyTone: "pink",
    count: "60+ places",
    intro:
      "Places that take a student ID, checked by calling ahead so you don't get turned away at the counter.",
    photo: { src: "/assets/img/coffee.jpg", alt: "The counter of a small coffee shop" },
    listings: [
      {
        title: "Restaurants and cafés",
        pill: "Show your ID",
        body: "Around forty places across Dallas, Arlington, Denton and Fort Worth. We note the ones that only honour it on weekdays, because that catches people out.",
        link: { href: "/savings#discounts", label: "See the map" },
      },
      {
        title: "Gyms, salons and shops",
        body: "Less obvious than food, and often a bigger saving. Several gyms will match a student rate if you ask, even when it isn't advertised.",
        link: { href: "/savings#discounts", label: "Browse the list" },
      },
      {
        title: "Software and subscriptions",
        pill: "Free or reduced",
        body: "Most of the big ones are free with a .edu address, and a few keep it for a year after you graduate. Worth doing before you lose the email.",
        link: { href: "/savings#discounts", label: "What to claim now" },
      },
    ],
    note: "Ask even where it isn't posted. Roughly a third of the places on this list gave a discount when a student simply asked. — Ryan",
  },
  {
    id: "free",
    name: "Free things to do",
    tone: "mint",
    keyTone: "mint",
    count: "23 listed",
    intro:
      "A weekend that costs nothing. Museums, parks, gardens and events, with the days and times that are actually free.",
    photo: { src: "/assets/img/campus2.jpg", alt: "The dome of a civic museum" },
    listings: [
      {
        title: "Museums that are always free",
        pill: "Any day",
        body: "General admission costs nothing at several of the biggest institutions in the metroplex — some charge only for special exhibitions.",
        link: { href: "/savings#free", label: "See which ones" },
      },
      {
        title: "Free on a particular day",
        body: "A longer list, but you have to time it. We keep the days current because they change more often than you'd think.",
        link: { href: "/savings#free", label: "Check the calendar" },
      },
    ],
  },
  {
    id: "cheap",
    name: "Cheap finds",
    tone: "sun",
    keyTone: "sun",
    count: "18 listed",
    intro:
      "Thrift, refill, borrow and repair. The things that quietly cost the most as a student, done cheaper.",
    photo: { src: "/assets/img/market.jpg", alt: "A market stall" },
    listings: [
      {
        title: "Furnishing a first apartment",
        body: "Thrift stores worth the drive, the weeks when students move out and leave everything on the kerb, and two free-cycle groups that actually have stock.",
        link: { href: "/savings#cheap", label: "Read the guide" },
      },
      {
        title: "Textbooks without paying list price",
        pill: "Every semester",
        body: "Library reserves, interlibrary loan, open-access editions and the three rental sites that consistently come out cheapest.",
        link: { href: "/resources#academics", label: "Read the guide" },
      },
    ],
  },
];

export const SAVINGS_FEATURED: FeaturedItem[] = [
  {
    href: "/savings#free",
    date: "5 September",
    title: "Every museum in the metroplex you can walk into free",
    src: "/assets/img/campus2.jpg",
    alt: "The dome of a civic museum",
    tone: "mint",
  },
  {
    href: "/savings#discounts",
    date: "30 August",
    title: "Places that take a student ID, mapped",
    src: "/assets/img/coffee.jpg",
    alt: "A coffee shop counter",
    tone: "pink",
  },
  {
    href: "/savings#cheap",
    date: "19 August",
    title: "Furnishing a first apartment for under $200",
    src: "/assets/img/market.jpg",
    alt: "A market stall",
    tone: "sun",
  },
];

/* ---------------------------------------------------- small businesses ---- */

export type Business = {
  slug: string;
  name: string;
  area: string;
  kind: string;
  offer: string;
  blurb: string;
  tone: Tone;
  src: string;
  alt: string;
};

export const SPOTLIGHT = {
  name: "Ceci’s Coffee",
  area: "Arlington",
  src: "/assets/img/coffee.jpg",
  alt: "Stools along the counter at Ceci’s Coffee",
  headline: "Ceci’s Coffee has been quietly feeding UTA students for nine years",
  body: [
    "Ceci opened three blocks from campus in 2016 and still writes the specials on a chalkboard herself. Students get a dollar off any drink, and if you show up with a laptop after 8pm she’ll usually top off your cup for free.",
    "We asked what she wishes students knew. “That you can sit here all day and nobody will ask you to leave. People think there’s a rule. There isn’t.”",
  ],
  offer: "$1 off any drink with a student ID",
};

export const BUSINESSES: Business[] = [
  { slug: "cecis-coffee", name: "Ceci’s Coffee", area: "Arlington", kind: "Coffee", offer: "$1 off any drink", blurb: "Nine years by the UTA gates. Free refills after 8pm if you’re working.", tone: "lilac", src: "/assets/img/coffee.jpg", alt: "A coffee shop counter" },
  { slug: "bishop-arts-bakery", name: "Bishop Arts Bakery", area: "Oak Cliff", kind: "Bakery", offer: "15% off before 11am", blurb: "Everything is made that morning. Get there early or it’s gone.", tone: "pink", src: "/assets/img/bakery.jpg", alt: "A decorated cake on a bakery counter" },
  { slug: "north-market", name: "North Market Produce", area: "Denton", kind: "Grocery", offer: "10% off on Wednesdays", blurb: "Family-run, cheaper than the chains, and they’ll tell you what’s worth buying that week.", tone: "mint", src: "/assets/img/market.jpg", alt: "Crates of produce" },
  { slug: "the-reading-room", name: "The Reading Room", area: "Denton", kind: "Bookshop", offer: "Student trade-in credit", blurb: "Secondhand textbooks and a back room nobody minds you studying in.", tone: "sun", src: "/assets/img/library.jpg", alt: "Shelves of books" },
];

/* ---------------------------------------------------------------- team ---- */

export type Member = {
  initials: string;
  name: string;
  role: string;
  school: string;
  major: string;
  bio: string;
  tone: Tone;
};

export const FOUNDERS: Member[] = [
  {
    initials: "AM",
    name: "Amy Sanchez Ramirez",
    role: "Co-founder",
    school: "UT Arlington",
    major: "Public policy",
    bio: "Started the list after missing a scholarship deadline that was only posted on a noticeboard. Handles partnerships and writes most of the small business spotlights.",
    tone: "sun",
  },
  {
    initials: "RC",
    name: "Ryan [surname needed]",
    role: "Co-founder",
    school: "UT Dallas",
    major: "Computer science",
    bio: "Kept a phone note of every place near campus that took a student ID. Builds and maintains the site, and checks the transportation listings each semester.",
    tone: "mint",
  },
];

export const AMBASSADORS: Member[] = [
  { initials: "PS", name: "Priya Shah", role: "Ambassador", school: "UT Arlington", major: "Nursing", bio: "Covers healthcare and the commuter routes into Arlington.", tone: "pink" },
  { initials: "JT", name: "Jordan Taylor", role: "Ambassador", school: "SMU", major: "Economics", bio: "Tracks scholarships and departmental awards nobody applies for.", tone: "lilac" },
  { initials: "DL", name: "Dani Lopez", role: "Ambassador", school: "UNT", major: "Studio art", bio: "Finds the free things to do, and most of the Denton listings.", tone: "sun" },
  { initials: "MO", name: "Marcus Obi", role: "Ambassador", school: "TCU", major: "Kinesiology", bio: "Wellness, rec centres and anything involving a gym membership.", tone: "mint" },
  { initials: "HN", name: "Hana Nguyen", role: "Ambassador", school: "Dallas College", major: "Business", bio: "Covers the Dallas College campuses and part-time work.", tone: "pink" },
  { initials: "SB", name: "Sam Brooks", role: "Ambassador", school: "UT Dallas", major: "Biology", bio: "Runs the campus pantry listings and re-checks them monthly.", tone: "lilac" },
];

export const OPEN_CAMPUSES = ["Texas Woman’s University", "UT Southwestern", "Tarrant County College"];

/* ---------------------------------------------------------- newsletter ---- */

export type Issue = {
  date: string;
  title: string;
  href: string;
  /* The issue's own opening line, taken from its LinkedIn preview text.
     Amy's words, not a summary written here. */
  excerpt?: string;
};

/* Titles, links and excerpts all come from the newsletter's own public pages,
   so every word here is Amy's. Nothing is summarised or paraphrased. */
export const ISSUES: Issue[] = [
  {
    date: "August 2026",
    title: "The Fundsy Scoop | August 2026",
    href: "https://www.linkedin.com/pulse/fundsy-scoop-august-2026-amy-sanchez-ramirez-sfpjc",
    excerpt:
      "school is basically back… gulp (ᵕ—ᴗ—)",
  },
  {
    date: "July 2026",
    title: "The Fundsy Scoop | July 2026",
    href: "https://www.linkedin.com/pulse/fundsy-scoop-july-2026-amy-sanchez-ramirez-1yc4c",
    excerpt:
      "Wrapping up July and getting ready for a new semester. Helping college students find scholarships, internships, campus jobs, career resources, and…",
  },
  {
    date: "May 2026",
    title: "Fundsy Newsletter — Eighth Edition",
    href: "https://www.linkedin.com/pulse/fundsy-newsletter-eighth-edition-may-2026-amy-sanchez-ramirez-8hdcf",
    excerpt:
      "Welcome back to Fundsy Scoop, your student-built space for scholarships, jobs, and staying on track when things get heavy",
  },
  {
    date: "April 2026",
    title: "Fundsy Newsletter — Seventh Edition",
    href: "https://www.linkedin.com/pulse/fundsysmoo-newsletter-seventh-edition-april-2026-amy-sanchez-ramirez-e1igc",
    excerpt:
      "Welcome back to Fundsy Scoop, your student-made guide to scholarships, opportunities, and college support",
  },
  {
    date: "March 2026",
    title: "Fundsy Newsletter — Sixth Edition",
    href: "https://www.linkedin.com/pulse/fundsysmoo-newsletter-sixth-edition-march-2026-amy-sanchez-ramirez-tdjdc",
    excerpt:
      "Welcome back to Fundsy Scoop, a small but growing space where we share scholarships, funding opportunities, and honest guidance for students navigating…",
  },
  {
    date: "February 2026",
    title: "Fundsy Newsletter — Fifth Edition",
    href: "https://www.linkedin.com/pulse/fundsysmoo-newsletter-fifth-edition-february-2026-amy-sanchez-ramirez-hlkyc",
    excerpt:
      "Welcome back to Fundsy Scoop, a growing space for scholarships, funding opportunities, and honest conversations for students navigating school, money,…",
  },
  {
    date: "January 2026",
    title: "Fundsy Newsletter — Fourth Edition",
    href: "https://www.linkedin.com/pulse/fundsysmoo-newsletter-fourth-edition-january-2026-amy-sanchez-ramirez-y5cbc",
    excerpt:
      "Welcome back to Fundsy Scoop — a small but growing space for scholarships, funding opportunities, and honest guidance for students figuring things out…",
  },
  {
    date: "December 2025",
    title: "Fundsy Newsletter — Third Edition",
    href: "https://www.linkedin.com/pulse/fundsysmoo-newsletter-third-edition-december-2025-amy-sanchez-ramirez-dxvbe",
    excerpt:
      "Welcome back to Fundsy Scoop — your monthly (trying to make bi-weekly) guide for scholarships, on-campus jobs, and career growth at SMU and beyond. …",
  },
];

/* ----------------------------------------------------------- resources ---- */

export const RESOURCE_SECTIONS: Section[] = [
  {
    id: "transport",
    name: "Transportation",
    tone: "sun",
    keyTone: "sun",
    count: "11 listings",
    intro:
      "DFW is spread out and most of us are working with a bus pass, a hand-me-down car, or a friend who owes us a favour. Here’s what actually helps.",
    photo: { src: "/assets/img/busride.jpg", alt: "A city bus at a downtown stop" },
    listings: [
      {
        title: "DART GoPass student semester pass",
        pill: "Free to apply",
        body: "$60 for unlimited rail and bus for a full semester, verified with your .edu address. Works on the Red, Blue, Green and Orange lines plus every DART bus and the TRE toward Fort Worth.",
        link: { href: "/resources#transport", label: "Apply through GoPass" },
      },
      {
        title: "Campus shuttles that leave the campus",
        pill: "Free",
        body: "Four schools run shuttles to grocery stores and rail stations that aren’t on the official campus map. Times change every semester, so we re-check them in August and January.",
        link: { href: "/resources#transport", label: "See the routes by campus" },
      },
    ],
    note: "If you’re commuting to UTA from Dallas, the TRE to CentrePort plus the 64 bus beats driving during rush hour almost every time. — Priya, UTA ’27",
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
    layout: "pairs",
    listings: [
      {
        title: "Campus food pantries",
        pill: "Open weekly",
        body: "Six pantries across DFW schools. Most ask only for a student ID, and several stock fresh produce on delivery day.",
        link: { href: "/resources#food", label: "Hours and locations" },
      },
      {
        title: "Community fridges near campus",
        pill: "Any time",
        body: "Open-access fridges in Oak Cliff, Denton and south Arlington. Take what you need, leave what you can.",
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
    listings: [
      {
        title: "Sliding-scale clinics in Dallas and Tarrant counties",
        body: "Nine clinics that set the price against your income, including two that stay open past 7pm on weekdays. Bring a pay stub if you have one; most will work without it.",
        link: { href: "/resources#health", label: "See the clinic list" },
      },
      {
        title: "What your student health fee already pays for",
        body: "You are probably already covered for basic visits, some vaccines and a set number of counselling sessions. We broke it down school by school.",
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
    intro: "Counselling, crisis lines, free gym access and the quiet places to sit when the library is full.",
    photo: { src: "/assets/img/yoga.jpg", alt: "A stretching class in a studio" },
    layout: "trio",
    listings: [
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
    intro: "Tutoring, writing centres, textbook workarounds and the advising appointments worth booking early.",
    photo: { src: "/assets/img/library.jpg", alt: "A student working at a desk of books" },
    listings: [
      {
        title: "Getting textbooks without paying list price",
        body: "Library reserves, interlibrary loan, open-access editions and the three rental sites that consistently come out cheapest.",
        link: { href: "/resources#academics", label: "Read the guide" },
      },
    ],
  },
];

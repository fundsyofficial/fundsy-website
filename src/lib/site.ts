/** Site-wide navigation and section identity.
 *  Each section owns a colour and keeps it everywhere: the page-header band,
 *  the chip on the homepage tile, the marker beside a category heading, the
 *  dot in the on-page nav. Change it here and it changes in all of them. */

export type Tone = "sun" | "mint" | "pink" | "lilac" | "ink";

export const NAV = [
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/savings", label: "Savings" },
  { href: "/small-businesses", label: "Small businesses ♡" },
  { href: "/team", label: "Team" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/contact", label: "Contact" },
] as const;

/** The drawer spells names out; the desktop bar has to fit nine items. */
export const NAV_MOBILE = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Fundsy" },
  { href: "/resources", label: "Student resources" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/savings", label: "Savings + student discounts" },
  { href: "/small-businesses", label: "Small businesses ♡" },
  { href: "/team", label: "Our team" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/contact", label: "Contact us" },
] as const;

export const FOOTER = [
  {
    heading: "Explore",
    links: [
      { href: "/resources", label: "Student resources" },
      { href: "/opportunities", label: "Opportunities" },
      { href: "/savings", label: "Savings + discounts" },
      { href: "/small-businesses", label: "Small businesses" },
    ],
  },
  {
    heading: "Fundsy",
    links: [
      { href: "/about", label: "About us" },
      { href: "/team", label: "Our team" },
      { href: "/newsletter", label: "Newsletter" },
      { href: "/team#ambassadors", label: "Become an ambassador" },
    ],
  },
  {
    heading: "Get in touch",
    links: [
      { href: "/contact", label: "Contact us" },
      { href: "/contact#share", label: "Share a find" },
      { href: "/contact#resume", label: "Resume help" },
      { href: "/contact#partner", label: "Partner with us" },
    ],
  },
] as const;

export const SOCIALS = {
  instagram: "https://instagram.com/fundsy",
  linkedin: "https://linkedin.com/company/fundsy",
  email: "hello@fundsy.org",
} as const;

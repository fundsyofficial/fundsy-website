import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

/* One family, four weights. Hierarchy comes from size and colour, not from
   adding weight, so there is no display face to load separately. */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fundsy.org"),
  title: {
    default: "Fundsy — resources, money and cheap things for DFW college students",
    template: "%s — Fundsy",
  },
  description:
    "A student-run guide to the scholarships, discounts, free food and local spots that college students in Dallas–Fort Worth actually use.",
  openGraph: {
    siteName: "Fundsy",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

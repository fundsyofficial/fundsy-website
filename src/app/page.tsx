import Link from "next/link";
import BoardMosaic from "@/components/BoardMosaic";
import FeaturedRail from "@/components/FeaturedRail";
import PinnedNote from "@/components/PinnedNote";
import PinnedPhoto from "@/components/PinnedPhoto";
import Photo from "@/components/Photo";
import RuleHeading from "@/components/RuleHeading";
import SectionTile from "@/components/SectionTile";
import TearOffNav from "@/components/TearOffNav";
import {
  HERO,
  HOME_DEADLINES,
  HOME_FEATURED,
  INSTAGRAM,
  MOSAIC,
  SECTION_TILES,
  TEAM_INITIALS,
} from "@/lib/content";
import { SOCIALS } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* ---- Hero: a flyer, with a board of notes and photos beside it ---- */}
      <section className="hero pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="wrap grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-start">
          <div className="card relative p-7 md:p-10">
            <div className="tape" style={{ top: -12, left: 36, transform: "rotate(-6deg)" }} />
            <p className="meta mb-4">{HERO.eyebrow}</p>
            <h1 className="display mb-5">{HERO.title}</h1>
            <p className="prose text-[1.0625rem] mb-7" style={{ color: "var(--ink-soft)" }}>
              {HERO.body}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link className="btn btn-pink" href="/resources">Start with the resources</Link>
              <Link className="btn btn-plain" href="#week">See this week&rsquo;s picks</Link>
            </div>
            <TearOffNav items={HERO.tabs} />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="grid gap-8 content-start">
              <PinnedPhoto
                src="/assets/img/transit.jpg"
                alt="The inside of a DART rail car"
                caption="DART GoPass — $60 for the whole semester"
                tone="sun"
                className="rot-a"
                priority
              />
              <PinnedNote tone="pink" pill="Scholarships" title="Terry Foundation, closes Dec 15" className="rot-c">
                Full tuition plus a living stipend for Texas students. Two essays, one recommendation.
              </PinnedNote>
            </div>
            <div className="grid gap-8 content-start sm:mt-14">
              <PinnedNote tone="mint" pill="Food" title="Free groceries, Thursdays" className="rot-b">
                Campus pantries at four DFW schools, no income paperwork. Bring a tote and a student ID.
              </PinnedNote>
              <PinnedPhoto
                src="/assets/img/bakery.jpg"
                alt="A decorated cake on a bakery counter"
                caption="Bishop Arts bakery — 15% off before 11am"
                tone="lilac"
                className="rot-d"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- This week: bento mosaic beside the featured rail ---- */}
      <section id="week" className="band band-deep py-16 md:py-20">
        <div className="wrap-wide">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <RuleHeading style={{ flex: "1 1 460px" }}>On the board this week</RuleHeading>
            <Link className="lnk text-sm" href="/resources">Everything we added in September</Link>
          </div>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_290px] gap-10 lg:gap-12 items-start">
            <BoardMosaic data={MOSAIC} />
            <FeaturedRail
              featured={HOME_FEATURED}
              deadlines={HOME_DEADLINES}
              action={{ href: "/opportunities", label: "All 23 opportunities" }}
            />
          </div>
        </div>
      </section>

      {/* ---- Where to start ---- */}
      <section className="py-16 md:py-24">
        <div className="wrap">
          <h2 className="h2 mb-3">Where to start</h2>
          <p className="prose mb-10" style={{ color: "var(--ink-soft)" }}>
            Four sections, all free to read, none of them behind a form.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SECTION_TILES.map((t) => (
              <SectionTile key={t.href} {...t} />
            ))}
          </div>

          <div className="card mt-8 p-6 md:p-8 flex flex-wrap items-center gap-x-8 gap-y-5 justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-4" style={{ minWidth: 0 }}>
              <div className="flex" aria-hidden="true">
                {TEAM_INITIALS.map((m, i) => (
                  <span
                    key={m.initials}
                    className="avatar"
                    style={{ background: `var(--${m.tone})`, marginLeft: i === 0 ? 0 : -13 }}
                  >
                    {m.initials}
                  </span>
                ))}
                <span className="avatar" style={{ background: "var(--card)", marginLeft: -13, fontSize: ".75rem" }}>
                  +7
                </span>
              </div>
              <div style={{ minWidth: 220, flex: "1 1 260px" }}>
                <h3 className="h3 mb-1">Twelve students keep this board current</h3>
                <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                  Amy, Ryan and an ambassador on every DFW campus. One of them is probably in your building.
                </p>
              </div>
            </div>
            <Link className="btn btn-plain btn-sm" href="/team">Meet the team</Link>
          </div>
        </div>
      </section>

      {/* ---- Small business spotlight ---- */}
      <section className="band band-mint py-16 md:py-24">
        <div className="wrap grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="card" style={{ aspectRatio: "3 / 2", padding: 0, position: "relative", overflow: "hidden" }}>
            <Photo
              src="/assets/img/coffee.jpg"
              alt="Stools along the counter at Ceci’s Coffee"
              tone="sun"
              style={{ position: "absolute", inset: 0 }}
              sizes="(max-width: 1024px) 100vw, 46vw"
            />
          </div>
          <div>
            <span className="pill">September spotlight</span>
            <h2 className="h2 mt-4 mb-4">
              Ceci&rsquo;s Coffee has been quietly feeding UTA students for nine years
            </h2>
            <p className="prose mb-6">
              Ceci opened three blocks from campus in 2016 and still writes the specials on a
              chalkboard herself. Students get a dollar off any drink, and if you show up with a
              laptop after 8pm she&rsquo;ll usually top off your cup for free. We asked her what
              she wishes students knew.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link className="btn btn-plain" href="/small-businesses">Read the spotlight</Link>
              <Link className="btn btn-ink" href="/small-businesses">All 14 businesses</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Community submission ---- */}
      <section id="share" className="band band-pink py-16 md:py-20">
        <div className="wrap grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
          <div>
            <h2 className="h2 mb-4">Know something we should share?</h2>
            <p className="prose">
              A scholarship your department never advertises, a taco place that takes student IDs,
              a free clinic your friend swears by. Send it over &mdash; we check every submission
              and credit you on the listing if you want.
            </p>
          </div>
          <div className="card p-6 md:p-7">
            <p className="prose mb-5" style={{ color: "var(--ink-soft)" }}>
              The full form has room for links, deadlines and who qualifies, so it lands with
              everything we need to check it.
            </p>
            <Link className="btn btn-ink" href="/contact#share">Share a find</Link>
          </div>
        </div>
      </section>

      {/* ---- Newsletter + Instagram ---- */}
      <section className="py-16 md:py-24">
        <div className="wrap grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          <div>
            <h2 className="h2 mb-4">The Fundsy newsletter</h2>
            <p className="prose mb-6" style={{ color: "var(--ink-soft)" }}>
              Once a month on LinkedIn: what&rsquo;s closing soon, what&rsquo;s new on the board,
              and one DFW business worth your money. Roughly a three-minute read.
            </p>
            <a className="btn btn-pink" href={SOCIALS.linkedin}>Read it on LinkedIn</a>
          </div>
          <div>
            <div className="flex items-end justify-between gap-4 mb-4">
              <h3 className="h3">@fundsy on Instagram</h3>
              <a className="lnk text-sm" href={SOCIALS.instagram}>Follow along</a>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {INSTAGRAM.map((p) => (
                <a className="ig" key={p.src} href={SOCIALS.instagram} style={{ position: "relative", overflow: "hidden" }}>
                  <Photo src={p.src} alt="A Fundsy Instagram post" tone={p.tone} style={{ position: "absolute", inset: 0 }} sizes="(max-width: 640px) 30vw, 180px" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

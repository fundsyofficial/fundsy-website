import Photo from "./Photo";
import { INSTAGRAM } from "@/lib/content";
import { SOCIALS } from "@/lib/site";

/** Six tiles linking through to the profile.
 *
 *  These are pictures kept in the repo, not live posts. Pulling real posts
 *  would need an Instagram Graph API token, which means an access token to
 *  store, rotate every 60 days and keep out of the browser — deliberately not
 *  how this site works. Swap the images in src/lib/content.ts when the ones
 *  here go stale. */
export default function InstagramGrid() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {INSTAGRAM.map((p) => (
        <a
          className="ig"
          key={p.src}
          href={SOCIALS.instagram}
          target="_blank"
          rel="noreferrer"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <Photo
            src={p.src}
            alt=""
            tone={p.tone}
            style={{ position: "absolute", inset: 0 }}
            sizes="(max-width: 640px) 30vw, 180px"
          />
        </a>
      ))}
    </div>
  );
}

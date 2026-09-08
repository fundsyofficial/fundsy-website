import Image from "next/image";
import Photo from "./Photo";
import { getInstagramPosts } from "@/lib/instagram";
import { INSTAGRAM } from "@/lib/content";
import { SOCIALS } from "@/lib/site";

/** Six most recent posts when a token is configured; otherwise the placeholder
 *  tiles, which still link through to the profile. The page looks the same
 *  either way, so the grid is never a hole in the layout. */
export default async function InstagramGrid() {
  const posts = await getInstagramPosts(6);

  if (posts && posts.length > 0) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {posts.map((p) => (
          <a
            className="ig"
            key={p.id}
            href={p.permalink}
            target="_blank"
            rel="noreferrer"
            style={{ position: "relative", overflow: "hidden" }}
          >
            <Image
              src={p.imageUrl}
              alt={p.caption || `Post from ${SOCIALS.instagramHandle}`}
              fill
              sizes="(max-width: 640px) 30vw, 180px"
              style={{ objectFit: "cover" }}
            />
          </a>
        ))}
      </div>
    );
  }

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

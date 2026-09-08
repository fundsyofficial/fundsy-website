import "server-only";

/** Instagram posts for the homepage grid.
 *
 *  WHY THIS NEEDS A TOKEN
 *
 *  There is no way to read a public Instagram profile's posts without one.
 *  The profile page returns 200 and its <meta> tags carry the follower and
 *  post counts, but the posts themselves are rendered client-side behind an
 *  auth check — the HTML contains no media at all. The old public oEmbed
 *  endpoint now redirects, and Basic Display was shut down in 2024.
 *
 *  Scraping is not an option worth taking: it breaks Instagram's terms, the
 *  media URLs are short-lived signed CDN links that cannot be stored, and the
 *  markup changes without notice.
 *
 *  So: the supported route is the Instagram Graph API, which needs a
 *  Professional (Business or Creator) account, a Meta app, and a long-lived
 *  access token. See the README for the steps. Until those exist this returns
 *  null and the grid falls back to linking through to the profile.
 */

export type InstagramPost = {
  id: string;
  permalink: string;
  caption: string;
  imageUrl: string;
  timestamp: string;
};

const API_VERSION = "v23.0";

export async function getInstagramPosts(limit = 6): Promise<InstagramPost[] | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return null;

  const userId = process.env.INSTAGRAM_USER_ID || "me";
  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const url =
    `https://graph.instagram.com/${API_VERSION}/${userId}/media` +
    `?fields=${fields}&limit=${limit}&access_token=${token}`;

  try {
    /* Hourly. Long-lived tokens still expire, and the media URLs themselves are
       signed and short-lived, so caching these for a day would serve dead
       images. */
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error("[instagram] fetch failed", res.status, await res.text().catch(() => ""));
      return null;
    }

    const json = (await res.json()) as {
      data?: {
        id: string;
        caption?: string;
        media_type: string;
        media_url?: string;
        thumbnail_url?: string;
        permalink: string;
        timestamp: string;
      }[];
    };

    return (json.data ?? [])
      /* A video's media_url is the video file; thumbnail_url is the still. */
      .map((p) => ({
        id: p.id,
        permalink: p.permalink,
        caption: p.caption?.split("\n")[0]?.slice(0, 120) ?? "",
        imageUrl: (p.media_type === "VIDEO" ? p.thumbnail_url : p.media_url) ?? "",
        timestamp: p.timestamp,
      }))
      .filter((p) => p.imageUrl)
      .slice(0, limit);
  } catch (e) {
    console.error("[instagram] fetch threw", e);
    return null;
  }
}

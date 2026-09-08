import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Renders a post's markdown.
 *  react-markdown builds React elements rather than setting innerHTML, and raw
 *  HTML is not enabled, so a post cannot inject script into the page even if an
 *  editor account is compromised. */
export default function PostBody({ children }: { children: string }) {
  return (
    <div className="post-body prose">
      <Markdown remarkPlugins={[remarkGfm]}>{children}</Markdown>
    </div>
  );
}

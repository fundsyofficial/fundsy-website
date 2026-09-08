import type { Member } from "@/lib/pages";

/** Initials, not a photograph. A stock portrait standing in for a named
 *  ambassador is worse than an obvious placeholder — swap these for real
 *  pictures once the team has sent them. */
export default function MemberCard({ member, large = false }: { member: Member; large?: boolean }) {
  return (
    <article className={`card-hair ${large ? "p-7" : "p-6"}`}>
      <span
        className="avatar mb-4"
        style={{
          background: `var(--${member.tone})`,
          width: large ? 72 : 56,
          height: large ? 72 : 56,
          fontSize: large ? "1.1rem" : ".875rem",
        }}
        aria-hidden="true"
      >
        {member.initials}
      </span>
      <h3 className="h3 mb-1" style={large ? { fontSize: "1.5rem" } : undefined}>{member.name}</h3>
      <p className="meta mb-3">
        {member.role} &middot; {member.school} &middot; {member.major}
      </p>
      <p className="text-[.9375rem]" style={{ color: "var(--ink-soft)" }}>{member.bio}</p>
    </article>
  );
}

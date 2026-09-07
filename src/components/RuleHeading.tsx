/** A heading with a rule running out to the margin. */
export default function RuleHeading({
  children,
  as = "h2",
  className = "h2",
  style,
}: {
  children: React.ReactNode;
  as?: "h2" | "h3";
  className?: string;
  style?: React.CSSProperties;
}) {
  const Tag = as;
  return (
    <Tag className={`${className} rule-head`} style={style}>
      {children}
    </Tag>
  );
}

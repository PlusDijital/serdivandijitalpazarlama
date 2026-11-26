export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
}: {
  /** Başlığın kimliği; bölümün aria-labelledby değeriyle aynı olmalı. */
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const alignClass = align === "center" ? "mx-auto text-center items-center" : "";
  return (
    <div className={`flex max-w-3xl flex-col ${alignClass}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <Tag
        id={id}
        className={`mt-4 scroll-mt-28 font-extrabold leading-[1.1] text-ink ${
          Tag === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl"
        }`}
      >
        {title}
      </Tag>
      {description ? <p className="mt-5 text-lg leading-8 text-ink-soft">{description}</p> : null}
    </div>
  );
}

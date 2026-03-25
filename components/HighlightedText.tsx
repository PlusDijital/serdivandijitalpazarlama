import { Fragment } from "react";

type HighlightedTextProps = {
  text: string;
  highlight?: string;
  highlightClassName?: string;
};

function renderLine(
  line: string,
  highlight: string | undefined,
  highlightClassName: string,
) {
  if (!highlight || !line.includes(highlight)) {
    return line;
  }

  const parts = line.split(highlight);

  return parts.map((part, index) => (
    <Fragment key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 ? (
        <span className={highlightClassName}>{highlight}</span>
      ) : null}
    </Fragment>
  ));
}

export default function HighlightedText({
  text,
  highlight,
  highlightClassName = "text-gradient-gold",
}: HighlightedTextProps) {
  const lines = text.split("\n");

  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={`${line}-${index}`}>
          {renderLine(line, highlight, highlightClassName)}
          {index < lines.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </>
  );
}

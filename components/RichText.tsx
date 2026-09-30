/**
 * Paragrafları "\n\n" ile, madde listelerini "- " ile başlayan satırlarla ayırır.
 * Numaralı listeler "1. " ile başlayan satırlardan oluşur.
 */
export default function RichText({ text }: { text: string }) {
  const blocks = text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="prose-body space-y-5">
      {blocks.map((block, index) => {
        const lines = block
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
        const isList = lines.every((line) => /^[-•]\s+/.test(line));
        const isOrdered = lines.every((line) => /^\d+\.\s+/.test(line));

        if (isList) {
          return (
            <ul key={index} className="space-y-2">
              {lines.map((line) => (
                <li key={line}>{line.replace(/^[-•]\s+/, "")}</li>
              ))}
            </ul>
          );
        }

        if (isOrdered) {
          return (
            <ol key={index} className="list-decimal space-y-2 pl-6 marker:font-bold marker:text-accent">
              {lines.map((line) => (
                <li key={line}>{line.replace(/^\d+\.\s+/, "")}</li>
              ))}
            </ol>
          );
        }

        return <p key={index}>{lines.join(" ")}</p>;
      })}
    </div>
  );
}

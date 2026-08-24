import type { ReactNode } from "react";

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;

/**
 * Renderiza negritas (**texto**), cursivas (*texto*) y código (`texto`)
 * como nodos React sin pasar por HTML (seguro contra inyección).
 */
export const renderInlineMarkdown = (text: string): ReactNode[] =>
  text
    .split(INLINE_PATTERN)
    .filter((chunk) => chunk !== "")
    .map((chunk, index) => {
      const key = `inline-${index}`;
      if (chunk.startsWith("**") && chunk.endsWith("**")) {
        return <strong key={key}>{chunk.slice(2, -2)}</strong>;
      }
      if (chunk.startsWith("`") && chunk.endsWith("`")) {
        return (
          <code
            key={key}
            className="rounded bg-white/8 px-1 py-0.5 font-mono text-[0.85em] text-congress-300"
          >
            {chunk.slice(1, -1)}
          </code>
        );
      }
      if (chunk.startsWith("*") && chunk.endsWith("*")) {
        return <em key={key}>{chunk.slice(1, -1)}</em>;
      }
      return <span key={key}>{chunk}</span>;
    });

/**
 * Markdown simple: encabezados (#, ##), viñetas (- o *) y párrafos.
 */
export const renderSimpleMarkdown = (text: string): ReactNode[] => {
  const lines = text.split("\n");
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (bullets.length === 0) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="ml-4 list-disc space-y-1">
        {bullets.map((item, index) => (
          <li key={index}>{renderInlineMarkdown(item)}</li>
        ))}
      </ul>,
    );
    bullets = [];
  };

  lines.forEach((rawLine, lineIndex) => {
    const line = rawLine.trimEnd();

    if (/^\s*[-*]\s+/.test(line)) {
      bullets.push(line.replace(/^\s*[-*]\s+/, ""));
      return;
    }
    flushBullets();

    if (line.trim() === "") return;

    if (line.startsWith("## ")) {
      blocks.push(
        <h3 key={`h-${lineIndex}`} className="text-base font-semibold text-white">
          {renderInlineMarkdown(line.slice(3))}
        </h3>,
      );
      return;
    }
    if (line.startsWith("# ")) {
      blocks.push(
        <h2 key={`h-${lineIndex}`} className="text-lg font-bold text-white">
          {renderInlineMarkdown(line.slice(2))}
        </h2>,
      );
      return;
    }

    blocks.push(
      <p key={`p-${lineIndex}`} className="whitespace-pre-wrap leading-relaxed">
        {renderInlineMarkdown(line)}
      </p>,
    );
  });

  flushBullets();
  return blocks;
};

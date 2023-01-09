export type Metadata = Record<string, string | string[]>;

const formatMetadata = (metadata: Metadata) => {
  const entries = Object.entries(metadata);

  const maxWidth = entries.reduce((width, cur) => {
    return Math.max(width, cur[0].length);
  }, 0);

  const lines: string[] = [];
  entries.forEach((entry) => {
    const [key, value] = entry;
    const values = Array.isArray(value) ? value : [value];
    const newLines = values.map((v) => `// @${key.padEnd(maxWidth)}  ${v}`);
    lines.push(...newLines);
  }, []);

  return lines;
};

export const createHeader = (metadata: Metadata): string => {
  const header = [
    "// ==UserScript==",
    ...formatMetadata(metadata),
    "// ==/UserScript==",
  ].join("\n");

  return header;
};

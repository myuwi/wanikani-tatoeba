export type Metadata = {
  name: string;
  namespace?: string;
  version: string;
  description?: string;
  author?: string;
  license?: string;
  copyright?: string;
  icon?: string;
  iconURL?: string;
  defaulticon?: string;
  icon64?: string;
  icon64URL?: string;
  grant?: string[];
  homepage?: string;
  homepageURL?: string;
  website?: string;
  source?: string;
  antifeature?: string[];
  require?: string[];
  resource?: string[];
  include?: string[];
  match?: string[];
  exclude?: string[];
  connect?: string[];
  noframes?: boolean;
  "run-at"?:
    | "document-start"
    | "document-body"
    | "document-end"
    | "document-idle"
    | "context-menu";
  updateURL?: string;
  downloadURL?: string;
  supportURL?: string;
  unwrap?: boolean;
};

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

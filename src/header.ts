import packageJson from "../package.json";

type Metadata = Record<string, string | string[]>;

const metadata = {
  name: "WaniKani Tatoeba Integration",
  namespace: "https://github.com/myuwi/",
  version: packageJson.version,
  description: packageJson.description,
  author: packageJson.author,
  license: packageJson.license,
  homepage: packageJson.homepage,
  downloadURL:
    "https://github.com/myuwi/wanikani-tatoeba/releases/latest/download/wanikani-tatoeba.user.js",
  updateURL:
    "https://github.com/myuwi/wanikani-tatoeba/releases/latest/download/wanikani-tatoeba.user.js",
  supportURL: packageJson.bugs.url,
  match: [
    "https://www.wanikani.com/lesson/session*",
    "https://www.wanikani.com/extra_study/session*",
    "https://www.wanikani.com/review/session*",
    "https://www.wanikani.com/vocabulary/*",
  ],
  "run-at": "document-end",
  require:
    "https://greasyfork.org/scripts/430565-wanikani-item-info-injector/code/WaniKani%20Item%20Info%20Injector.user.js?version=1111117",
  connect: "tatoeba.org",
  grant: "GM_xmlhttpRequest",
};

const formatLines = (metadata: Metadata) => {
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

const createHeader = (metadata: Metadata) => {
  const header = [
    "// ==UserScript==",
    ...formatLines(metadata),
    "// ==/UserScript==",
  ].join("\n");

  return header;
};

console.log(createHeader(metadata));

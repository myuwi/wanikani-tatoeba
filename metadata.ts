import { Metadata } from "$lib/header";
import packageJson from "./package.json";

export const metadata: Metadata = {
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
    "https://github.com/myuwi/wanikani-tatoeba/releases/latest/download/wanikani-tatoeba.meta.js",
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

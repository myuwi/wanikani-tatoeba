import { Metadata } from "$lib/header";
import pkg from "./package.json";

export const metadata: Metadata = {
  name: "WaniKani Tatoeba Integration",
  namespace: "https://github.com/myuwi/",
  version: pkg.version,
  description: pkg.description,
  author: pkg.author,
  license: pkg.license,
  homepage: pkg.homepage,
  downloadURL:
    "https://github.com/myuwi/wanikani-tatoeba/releases/latest/download/wanikani-tatoeba.user.js",
  updateURL:
    "https://github.com/myuwi/wanikani-tatoeba/releases/latest/download/wanikani-tatoeba.meta.js",
  supportURL: pkg.bugs.url,
  match: ["https://www.wanikani.com/*"],
  "run-at": "document-end",
  require: [
    "https://greasyfork.org/scripts/430565-wanikani-item-info-injector/code/WaniKani%20Item%20Info%20Injector.user.js?version=1173815",
  ],
  connect: ["tatoeba.org"],
  grant: ["GM_xmlhttpRequest"],
};

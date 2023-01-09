import esbuild from "esbuild";
import { writeFile } from "fs/promises";
import { createHeader } from "$lib/header";
import { metadata } from "../metadata";

(async () => {
  const header = createHeader(metadata);

  await esbuild.build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outfile: "dist/wanikani-tatoeba.user.js",
    banner: {
      js: `${header}\n`,
    },
  });

  await writeFile("dist/wanikani-tatoeba.meta.js", header);
})();

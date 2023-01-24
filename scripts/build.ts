import * as esbuild from "esbuild";
import pkg from "../package.json";
import { writeAsync } from "fs-jetpack";
import { createHeader } from "$lib/header";
import { metadata } from "../metadata";
import { removeComments } from "./utils/removeComments";

(async () => {
  const header = createHeader(metadata);

  const result = await esbuild.build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    write: false,
    plugins: [removeComments],
  });

  if (!result.outputFiles[0]) {
    throw Error("Build didn't generate an output file.");
  }

  const code = result.outputFiles[0].text;
  const output = `${header}\n\n${code}`;

  await writeAsync(`dist/${pkg.name}.meta.js`, header);
  await writeAsync(`dist/${pkg.name}.user.js`, output);
})();

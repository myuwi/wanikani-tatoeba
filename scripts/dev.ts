import chalk from "chalk";
import * as esbuild from "esbuild";
import { writeAsync } from "fs-jetpack";
import { createHeader, Metadata } from "$lib/header";
import { metadata } from "../metadata";
import { removeComments } from "./utils/removeComments";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { name, version, downloadURL, updateURL, connect, grant, ...rest } =
  metadata;

const devMetadata: Metadata = {
  name: name + " Development",
  version: "0.0.1",
  ...rest,
  connect: [...new Set([...(connect ?? []), "localhost"])],
  grant: [
    ...new Set([
      ...(grant ?? []),
      "GM_xmlhttpRequest",
      "GM_getValue",
      "GM_setValue",
    ]),
  ],
};

(async () => {
  const header = createHeader(devMetadata);

  const result = await esbuild.build({
    entryPoints: ["scripts/utils/dev-userscript.ts"],
    bundle: true,
    write: false,
    logOverride: {
      "direct-eval": "silent",
    },
    plugins: [removeComments],
  });

  if (!result.outputFiles[0]) {
    throw Error("Build didn't generate an output file.");
  }

  const code = result.outputFiles[0].text;
  const output = `${header}\n\n${code}`;

  await writeAsync(".dev/dev.user.js", output);

  const ctx = await esbuild.context({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outfile: ".dev/index.js",
  });

  const { host, port } = await ctx.serve({
    port: 4106,
    servedir: ".dev",
  });

  console.log(`
  ${chalk.blue("Dev Server")} running on port ${chalk.blue(port)}
  Script: ${chalk.cyan(`http://${host}:${port}/dev.user.js`)}
`);
})();

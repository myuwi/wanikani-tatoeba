import type { Plugin } from "esbuild";

// Manually remove file path comments because they can't be disabled...
// https://github.com/evanw/esbuild/blob/31fb4527134d2fac55d97a48af8f7b0e8ffc3f00/internal/linker/linker.go#L4962
export const removeComments: Plugin = {
  name: "removeComments",
  setup(build) {
    build.onEnd(async (result) => {
      result.outputFiles?.forEach((file) => {
        const modified = file.text.replace(/^\s*\/\/.*[\r\n]/gm, "");
        file.contents = Buffer.from(modified);
      });
    });
  },
};

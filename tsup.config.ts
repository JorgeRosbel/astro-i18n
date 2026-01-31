import { defineConfig } from "tsup";
import { TsconfigPathsPlugin } from "@esbuild-plugins/tsconfig-paths";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    cli: "src/cli.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: false,
  minify: true,
  clean: true,
  outDir: "dist",
  outExtension() {
    return {
      js: ".mjs",
    };
  },
  esbuildPlugins: [TsconfigPathsPlugin({})],
  noExternal: [],
  publicDir: false,
});

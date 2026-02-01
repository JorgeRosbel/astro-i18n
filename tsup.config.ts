import { defineConfig } from 'tsup';
import { TsconfigPathsPlugin } from '@esbuild-plugins/tsconfig-paths';
import fs from 'node:fs';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    cli: 'src/cli.ts',
  },
  format: ['esm'],
  dts: true,
  sourcemap: false,
  minify: true,
  clean: true,
  outDir: 'dist',
  outExtension() {
    return {
      js: '.mjs',
    };
  },
  esbuildPlugins: [TsconfigPathsPlugin({})],
  noExternal: [],
  publicDir: false,
  onSuccess: async () => {
    await fs.promises.cp('src/I18NDebug.astro', 'dist/I18NDebug.astro');
  },
});

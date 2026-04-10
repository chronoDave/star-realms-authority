import type { BuildOptions } from 'esbuild';

import esbuild from 'esbuild';
import fsp from 'fs/promises';
import path from 'path';

const isWatch = process.argv.slice(2)[0] === '-w';
const outdir = 'docs';
const version = await fsp.readFile('package.json', 'utf-8')
  .then(raw => JSON.parse(raw).version);

const config: BuildOptions = {
  entryPoints: [
    'src/index.html',
    'src/index.ts'
  ],
  bundle: true,
  minify: !isWatch,
  sourcemap: isWatch,
  target: 'es6',
  external: ['./assets/bg.png'],
  loader: {
    '.html': 'text'
  },
  outdir,
  plugins: [{
    name: 'log',
    setup: build => {
      const label = 'esbuild';

      build.onStart(() => {
        console.time(label);
      });

      build.onEnd(() => {
        console.timeEnd(label);
      });
    }
  }, {
    name: 'html',
    setup: build => {
      build.onLoad({ filter: /\.html$/ }, async args => {
        const raw = await fsp.readFile(args.path, 'utf-8');

        return {
          contents: raw.replace(/\${version}/gi, version),
          loader: 'copy'
        };
      });
    }
  }]
};

await fsp.rm(outdir, { recursive: true, force: true });
await fsp.mkdir(outdir);
await fsp.cp('src/assets', path.join(outdir, 'assets'), { recursive: true });

if (isWatch) {
  const context = await esbuild.context(config);
  context.watch();
} else {
  esbuild.build(config);
}

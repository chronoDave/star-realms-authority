import esbuild from 'esbuild';

const config = {
  entryPoints: [
    'src/index.ts',
    'src/service.ts'
  ],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: 'es6',
  outdir: 'docs',
  plugins: [{
    name: 'report',
    setup: build => {
      build.onEnd(() => console.log('[esbuild] build'));
    }
  }]
};

if (process.argv.slice(2)[0] === '-w') {
  console.log('[esbuild] watching for changes');
  const context = await esbuild.context(config);
  context.watch();
} else {
  esbuild.build(config);
}

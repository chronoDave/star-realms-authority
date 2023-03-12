import chokidar from 'chokidar';
import path from 'path';
import url from 'url';
import fs from 'fs';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const build = () => {
  fs.copyFileSync(
    path.resolve(dirname, '../src/index.html'),
    path.resolve(dirname, '../dist/index.html')
  );
  console.log('[html] copied index.html');
};

if (process.argv.slice(2)[0] === '-w') {
  console.log('[html] watching for changes');
  chokidar.watch('src/index.html').on('change', build);
  build();
} else {
  build();
}

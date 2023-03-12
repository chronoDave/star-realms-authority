import chokidar from 'chokidar';
import path from 'path';
import url from 'url';
import fs from 'fs';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const build = () => {
  fs.copyFileSync(
    path.resolve(dirname, '../src/index.html'),
    path.resolve(dirname, '../docs/index.html')
  );
  fs.cpSync(
    path.resolve(dirname, '../src/assets'),
    path.resolve(dirname, '../docs/assets'),
    { recursive: true }
  );
  console.log('[assets] copied assets');
};

if (process.argv.slice(2)[0] === '-w') {
  console.log('[assets] watching for changes');
  chokidar.watch('src/index.html').on('change', build);
  build();
} else {
  build();
}

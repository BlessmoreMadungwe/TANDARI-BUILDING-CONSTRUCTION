const fs = require('fs');
const path = require('path');

const viteDir = path.join(__dirname, '..', 'node_modules', 'vite', 'dist', 'node', 'chunks');

if (!fs.existsSync(viteDir)) {
  process.exit(0);
}

for (const fileName of fs.readdirSync(viteDir)) {
  if (!fileName.endsWith('.js')) continue;

  const filePath = path.join(viteDir, fileName);
  const source = fs.readFileSync(filePath, 'utf8');
  const marker = 'function optimizeSafeRealPathSync() {';

  if (!source.includes(marker) || source.includes('Tandari local patch: avoid blocked Windows net use spawn')) {
    continue;
  }

  const patched = source.replace(
    marker,
    `${marker}
\t// Tandari local patch: avoid blocked Windows net use spawn in restricted dev environments.
\tsafeRealpathSync = fs.realpathSync;
\treturn;`
  );

  fs.writeFileSync(filePath, patched);
  console.log(`Patched Vite Windows realpath helper in ${fileName}`);
}

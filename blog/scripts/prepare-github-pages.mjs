import { copyFile, readFile, readdir, writeFile } from 'node:fs/promises';

const publicDirectory = new URL('../.output/public/', import.meta.url);
const assetsDirectory = new URL('assets/', publicDirectory);
const shell = new URL('_shell.html', publicDirectory);
const staticCachePath = '/__tsr/staticServerFnCache/';
const pagesStaticCachePath = '/tomsiwik/__tsr/staticServerFnCache/';

let patchedCacheReferences = 0;

for (const entry of await readdir(assetsDirectory)) {
  if (!entry.endsWith('.js')) continue;

  const asset = new URL(entry, assetsDirectory);
  const source = await readFile(asset, 'utf8');
  const matches = source.split(staticCachePath).length - 1;

  if (matches === 0) continue;

  patchedCacheReferences += matches;
  await writeFile(asset, source.replaceAll(staticCachePath, pagesStaticCachePath));
}

if (patchedCacheReferences !== 1) {
  throw new Error(
    `Expected one static server-function cache reference, found ${patchedCacheReferences}`,
  );
}

await Promise.all([
  copyFile(shell, new URL('index.html', publicDirectory)),
  copyFile(shell, new URL('404.html', publicDirectory)),
  writeFile(new URL('.nojekyll', publicDirectory), ''),
]);

import { spawn } from 'node:child_process';
import { mkdtemp, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const previewRoot = await mkdtemp(join(tmpdir(), 'tomsiwik-preview-'));

try {
  await symlink(resolve(projectRoot, '.output/public'), join(previewRoot, 'tomsiwik'), 'dir');

  const child = spawn(
    'serve',
    ['-l', '4173', '--no-port-switching', '--config', resolve(projectRoot, 'serve.json'), previewRoot],
    { cwd: projectRoot, stdio: 'inherit' },
  );

  const exitCode = await new Promise((resolveExit, reject) => {
    child.on('error', reject);
    child.on('exit', (code, signal) => resolveExit(signal ? 0 : (code ?? 1)));
  });

  process.exitCode = exitCode;
} finally {
  await rm(previewRoot, { recursive: true, force: true });
}

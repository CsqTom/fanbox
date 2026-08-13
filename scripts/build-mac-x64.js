'use strict';

const { spawnSync } = require('child_process');

if (process.platform !== 'darwin') {
  console.error('Mac 安装包只能在 macOS 上构建和签名。请在 Mac 上执行 npm run dist:x64。');
  process.exit(1);
}

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
function run(args, env = process.env) {
  const r = spawnSync(npm, args, { stdio: 'inherit', env });
  if (r.error || r.status !== 0) throw r.error || new Error(`npm ${args.join(' ')} failed`);
}

try {
  run(['run', 'rebuild:pty'], { ...process.env, PTY_ARCH: 'x64' });
  const build = spawnSync(process.execPath, [require.resolve('./build'), '--mac', '--x64'], { stdio: 'inherit', env: process.env });
  if (build.error || build.status !== 0) throw build.error || new Error('mac x64 package failed');
} finally {
  // 无论打包是否失败，都把开发环境恢复为 Apple Silicon 的 node-pty。
  try { run(['run', 'rebuild:pty'], { ...process.env, PTY_ARCH: 'arm64' }); } catch (err) { console.error(`恢复 arm64 node-pty 失败：${err.message}`); }
}

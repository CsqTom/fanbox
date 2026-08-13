'use strict';

// electron-builder 使用当前宿主系统作为默认目标。macOS 上再补齐公证所需的
// Keychain profile；Windows 不会尝试执行 macOS 专属的环境变量语法或打包流程。
const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const asksForMac = args.includes('--mac');
if (asksForMac && process.platform !== 'darwin') {
  console.error('Mac 安装包只能在 macOS 上构建和签名。请在 Mac 上执行 npm run dist:mac。');
  process.exit(1);
}

const env = { ...process.env };
if (process.platform === 'darwin' && (args.length === 0 || asksForMac) && !env.APPLE_KEYCHAIN_PROFILE) {
  env.APPLE_KEYCHAIN_PROFILE = 'fanbox-notary';
}

const result = spawnSync(process.execPath, [require.resolve('electron-builder/cli'), ...args], {
  env,
  stdio: 'inherit',
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}
process.exit(result.status == null ? 1 : result.status);

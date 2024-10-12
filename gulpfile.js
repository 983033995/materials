const { src, dest, series, parallel } = require('gulp');
const ts = require('gulp-typescript');
const bump = require('gulp-bump');
const { exec } = require('child_process');

function buildPackage(packageName) {
  return new Promise((resolve, reject) => {
    exec(`cd packages/${packageName} && pnpm build`, (err, stdout, stderr) => {
      console.log(stdout);
      console.error(stderr);
      err ? reject(err) : resolve();
    });
  });
}

function buildUI() {
  return buildPackage('ui');
}

function buildUtils() {
  return buildPackage('utils');
}

function buildVSCodePlugin() {
  return buildPackage('plugins/vscode');
}

function buildVitePlugin() {
  return buildPackage('plugins/vite');
}

function buildDocs() {
  return buildPackage('docs');
}

const buildAll = parallel(buildUI, buildUtils, buildVSCodePlugin, buildVitePlugin, buildDocs);

function versionBump(packagePath) {
  return src([`${packagePath}/package.json`])
    .pipe(bump({type: 'patch'}))
    .pipe(dest(packagePath));
}

function publishPackage(packageName) {
  return new Promise((resolve, reject) => {
    exec(`cd packages/${packageName} && npm publish`, (err, stdout, stderr) => {
      console.log(stdout);
      console.error(stderr);
      err ? reject(err) : resolve();
    });
  });
}

function createPublishTask(packageName) {
  const packagePath = `packages/${packageName}`;
  return series(
    () => versionBump(packagePath),
    () => buildPackage(packageName),
    () => publishPackage(packageName)
  );
}

exports.build = buildAll;
exports.buildUI = buildUI;
exports.buildUtils = buildUtils;
exports.buildVSCodePlugin = buildVSCodePlugin;
exports.buildVitePlugin = buildVitePlugin;
exports.buildDocs = buildDocs;

exports.publishUI = createPublishTask('ui');
exports.publishUtils = createPublishTask('utils');
exports.publishVSCodePlugin = createPublishTask('plugins/vscode');
exports.publishVitePlugin = createPublishTask('plugins/vite');

exports.publishAll = series(
  () => versionBump(''),
  buildAll,
  parallel(
    () => publishPackage('ui'),
    () => publishPackage('utils'),
    () => publishPackage('plugins/vscode'),
    () => publishPackage('plugins/vite')
  )
);
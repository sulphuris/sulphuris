#!/usr/bin/env node

const sass = require('sass');
const { exec } = require('child_process');
const livereload = require('livereload');
const connect = require('connect');
const nodemon = require('nodemon');
const { parse } = require('es-module-lexer');
const { build } = require('esbuild');
const resolve = require('resolve');
const { pathToFileURL } = require('url');
const http = require('http');
const static = require('serve-static');

const fs = require('node:fs');
const path = require('node:path');

function getPackageInfo(pkg) {
  const pkgPath = resolve.sync(`${pkg}/package.json`, {
    basedir: process.cwd(),
  });
  return JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
}

// Compile Sass to CSS
const compiledSass = sass.compile('src/scss/index.scss', {
  //style: 'compressed',
  sourceMap: true,
  sourceMapIncludeSources: true,
  importers: [{
    // An importer that redirects relative URLs starting with "~" to
    // `node_modules`.
    findFileUrl(url) {
      if (fs.existsSync(url)) return null;
      const urlPath = path.join(pathToFileURL('node_modules').pathname, url);
      console.log(fs.existsSync(path.relative(process.cwd(), urlPath)), path.relative(process.cwd(), urlPath));
      return new URL(path.relative(process.cwd(), urlPath), pathToFileURL('node_modules'));
    }
  }]
});

fs.writeFileSync('dist/styles.css.map', JSON.stringify(compiledSass.sourceMap));
fs.writeFileSync('dist/styles.css', compiledSass.css);

// Start local server with LiveReload
const app = connect();
app.use(static(__dirname));
const port = 4040;
http.createServer(app).listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

var lrserver = livereload.createServer();
lrserver.watch(__dirname);

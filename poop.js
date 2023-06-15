#!/usr/bin/node

const fs = require('fs');
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


// Compile Sass to CSS
const compiledSass = sass.compile('src/scss/index.scss', {
  //style: 'compressed',
  sourceMap: true,
  sourceMapIncludeSources: true,
  importers: [{
    // An importer that redirects relative URLs starting with "~" to
    // `node_modules`.
    findFileUrl(url) {
      if (!url.startsWith('~')) return null;
      return new URL(url.substring(1), pathToFileURL('node_modules'));
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

import scss from 'rollup-plugin-scss';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import fg from 'fast-glob';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import strip from 'strip-comments';
import eslint from '@rollup/plugin-eslint';
import { readFileSync } from 'fs';

const packagesJson = readFileSync('./package.json', 'utf-8');
const packages = JSON.parse(packagesJson);

export default function config(args) {
  const sass_opts = {
    output: 'dist/css/sulphuris.css',
    sourceMap: false,
    prefix: `/*! Sulphuris 🜍 ${packages.version} */`,
    processor: (css, map) => postcss([autoprefixer]).process(css, {
        from: undefined,
        to: sass_opts.output,
        map: map ? { prev: map, inline: false } : null
    }).then(result => strip(result.css, {
      line: true,
      block: true,
      keepProtected: true
    }))
  };

  if (args.production) {
    sass_opts.output = 'dist/css/sulphuris.min.css';
    sass_opts.outputStyle = 'compressed';
  }

  const opts = {
    input: 'src/index.ts',
    output: {
      file: 'dist/js/sulphuris.js'
    },
    format: 'iife',
    context: 'window',
    inlineDynamicImports: true,
    sourcemap: false,
    plugins: [
      nodeResolve({
        main: false,
        mainFields: ['browser', 'module'],
        extensions: ['.js', '.ts'],
        customResolveoptsions: {
          package: {},
          moduleDirectory: ['node_modules']
        }
      }),
      eslint(),
      typescript(),
      commonjs({
        include: 'node_modules/**'
      }),
      args.production && terser(),
      {
        name: 'strip-comments',
        transform(code, id) {
          return new Promise((resolve) => {
            try {
              resolve(strip(code, {
                line: true,
                block: true,
                keepProtected: true
              }))
            } catch (err) {
              this.error(err.message);
            }
          })
        }
      },
      scss(sass_opts),
      args.watch && {
        name: 'watch-external',
        async buildStart() {
          const files = await fg(['src/scss/**/*']);
          for(let file of files) {
            this.addWatchFile(file);
          }
        }
      },
      args.watch && serve({ port: 4040 }),
      args.watch && livereload('dist')
    ]
  };

  if (args.production) {
    opts.output.file = 'dist/js/sulphuris.min.js';
  }

  return opts;
}

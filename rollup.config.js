import scss from 'rollup-plugin-scss';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import fg from 'fast-glob';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default function config(args) {
  const sass_opts = {
    output: 'dist/css/sulphuris.css',
    processor: () => postcss({
      plugins: [autoprefixer()]
    })
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
    sourcemap: false,
    context: 'window',
    inlineDynamicImports: true,
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
      typescript(),
      commonjs({
        include: 'node_modules/**'
      }),
      cleanup(),
      args.production && terser(),
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

  if (args.sourcemap) {
    opts.sourcemap = true;
  }

  return opts;
}

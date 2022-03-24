import babel from 'rollup-plugin-babel';
import esbuild from 'rollup-plugin-esbuild';
import bundleSize from 'rollup-plugin-bundle-size';
import typescript from 'rollup-plugin-ts';
import pkg from './package.json';

const input = './src/index.ts';
const moduleName = 'VueSlicksort';

export default [
  {
    input,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
      {
        file: pkg.browser,
        format: 'umd',
        name: moduleName,
        globals: { vue: 'Vue' },
      },
    ],
    external: ['vue'],
    plugins: [typescript()],
  },
  {
    input,
    output: {
      file: pkg.unpkg,
      name: moduleName,
      format: 'umd',
      sourcemap: true,
      globals: { vue: 'Vue' },
    },
    external: ['vue'],
    plugins: [
      esbuild({
        minify: true,
        define: {
          'process.env.NODE_ENV': '"production"',
        },
      }),
      babel(),
      bundleSize(),
    ],
  },
];

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const NODE_ENV = process.env.NODE_ENV || 'development';
const outputFile = NODE_ENV === 'production' ? './dist/es/prod.js' : './dist/es/dev.js';

export default {
  input: './src/App.jsx',
  output: {
    file: outputFile,
    format: 'es',
  },
  plugins: [
    postcss({
      extensions: ['.css'],
      inject: {
        insertAt: 'top',
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      modulesOnly: true,
      extensions: ['.mjs', '.js', '.jsx', '.json'],
      dedupe: ['react', 'react-dom'],
    }),
    terser(),
    commonjs(),
  ],
  external: ['emotion', 'react-emotion', 'react', 'react-dom'],
};

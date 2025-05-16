import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { readFileSync } from 'fs';

// package.json 파일 읽기
const packageJson = JSON.parse(
  readFileSync('./package.json', { encoding: 'utf8' })
);

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    }),
    commonjs(),
    typescript({ 
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types',
      sourceMap: true,
      inlineSources: true
    }),
    postcss({
      modules: true,
      extract: 'styles.css',
      namedExports: true,
      minimize: true
    }),
  ],
  external: ['react', 'react-dom', 'lumir-design-tokens'],
}; 
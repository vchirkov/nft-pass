import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import dotenv from 'rollup-plugin-dotenv';
import { terser } from "rollup-plugin-terser";

export default [{
    input: './index.ts',
    output: {
        file: 'dist/index.js',
        format: 'umd',
        name: 'NFTPass'
    },
    plugins: [
        typescript(),
        resolve(),
        commonjs(),
        dotenv(),
        terser()
    ]
}];

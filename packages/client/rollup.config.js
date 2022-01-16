import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dotenv from 'rollup-plugin-dotenv';

export default [{
    input: './index.js',
    output: {
        file: 'dist/index.js',
        format: 'umd',
        name: 'NFTPass'
    },
    plugins: [
        resolve(),
        commonjs(),
        dotenv()
    ]
}];

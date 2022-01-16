import dotenv from 'rollup-plugin-dotenv';
import html from '@rollup/plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import serve from 'rollup-plugin-serve';

export default [{
    input: './index.js',
    output: {
        dir: 'dist',
        format: 'iife'
    },
    plugins: [
        dotenv(),
        html({title: 'NFTPass Test Page'}),
        resolve(),
        commonjs(),
        process.env.SERVE === 'true' && serve({
            contentBase: './dist',
            port: 5000
        })
    ].filter(Boolean)
}];

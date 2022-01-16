import html from '@rollup/plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dotenv from 'rollup-plugin-dotenv';

export default [{
    input: './index.js',
    output: {
        dir: 'dist',
        format: 'iife'
    },
    plugins: [
        dotenv(),
        html({title: 'NFTPass'}),
        resolve({mainFields: ['module', 'main']}),
        commonjs(),
    ]
}];

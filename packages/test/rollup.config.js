import dotenv from 'rollup-plugin-dotenv';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import serve from 'rollup-plugin-serve';

export default [{
    input: './index.js',
    context: 'window',
    output: {
        dir: 'dist',
        format: 'iife'
    },
    plugins: [
        dotenv(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        babel({
            presets: ['@babel/preset-react'],
            exclude: /node_modules|dist/
        }),
        resolve(),
        commonjs(),
        copy({targets: [{src: './index.html', dest: './dist'}]}),
        process.env.SERVE === 'true' && serve({
            contentBase: './dist',
            port: 5000
        })
    ].filter(Boolean)
}];

import nodePolyfills from 'rollup-plugin-polyfill-node';

export default [{
    input: './index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs'
    },
    plugins: [nodePolyfills()]
}];

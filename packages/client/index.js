import {Messenger} from '@nft-pass/messenger';

const IFRAME_URL = process.env.IFRAME_URL;
const DEFAULT_MESSAGE = process.env.DEFAULT_MESSAGE;

let iframe;
let messenger;

const NFTPass = Object.freeze({
    async verify({apiKey, message = DEFAULT_MESSAGE} = {}) {
        if (!apiKey) throw new Error('NFTPass: cannot perform verification, apiKey was not provided');

        iframe = iframe || addIFrame(IFRAME_URL);
        messenger = messenger || new Messenger(iframe.contentWindow);
        await messenger.wait('ready');
        messenger.send('verify', {apiKey, message});
        return await messenger.wait('verify-complete');
    }
});

function addIFrame(src) {
    let iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = src;
    document.body.appendChild(iframe);
    return iframe;
}

export default NFTPass;

import {Web3Provider} from '@ethersproject/providers';
import {Messenger} from '@nft-pass/messenger';

(() => {
    if (window.self === window.top) throw new Error('NFTPass Iframe was opened as a standalone page');
    const messenger = new Messenger(window.parent);
    messenger.on('verify', async data => {
        if (!window.ethereum) throw new Error('No crypto wallet found. Please install it.');
        if (!data.apiKey) throw new Error('No NFRPass apiKey was provided. Please provide one.');
        if (!data.message) throw new Error('No message to sign was provided. Please provide one.');

        const {message, apiKey} = data;

        await window.ethereum.send('eth_requestAccounts');
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signature = await signer.signMessage(message);
        const address = await signer.getAddress();

        try {
            const fetchData = await fetch('/api/client/verify', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-NFTPass-Token': apiKey
                },
                body: JSON.stringify({
                    signature,
                    address,
                    message: message
                })
            }).then(resp => resp.json());
            messenger.send('verify-complete', fetchData);
        } catch (e) {
            messenger.send('verify-complete', {
                error: {
                    message: e.message,
                    code: e.code
                }
            });
        }
    });
    messenger.send('ready');
})();


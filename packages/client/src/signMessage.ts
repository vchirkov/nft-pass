import { Web3Provider } from '@ethersproject/providers';

declare global {
    interface Window {
        ethereum: any;
    }
}

export async function signMessage(message: string) {
    await window.ethereum.request({ method: 'eth_accounts' });
    const provider = new Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return { signature, address, message };
}

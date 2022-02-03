import { Web3Provider } from '@ethersproject/providers';

const DEFAULT_MESSAGE = process.env.DEFAULT_MESSAGE;

declare global {
    interface Window {
        ethereum: any;
    }
}

export type SignResult = {
    message: string,
    address: string,
    signature: string,
}

export async function sign(message: string = DEFAULT_MESSAGE): Promise<SignResult> {
    await window.ethereum.request({ method: 'eth_accounts' });
    const provider = new Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return { signature, address, message };
}

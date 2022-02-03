declare global {
    interface Window {
        ethereum: any;
    }
}

export function checkApiKey(apiKey: string) {
    if (!apiKey) throw new Error('NFTPass: cannot perform verification, apiKey was not provided.');
}

export function checkMetamask() {
    if (!window.ethereum) throw new Error('No crypto wallet found. Please install it.');
}

import { ls } from './ls';
import { fetchNFTS } from './fetchNFTS';
import { signMessage } from './signMessage';

const DEFAULT_MESSAGE = process.env.DEFAULT_MESSAGE;
const LS_KEY = process.env.LS_KEY;
const DEFAULT_TTL = parseInt(process.env.DEFAULT_TTL);

export type NFTPassParams = {
    /**
     * Api Key for corresponding configuration from admin page
     */
    apiKey: string,
    /**
     *  message to be signed in wallet, uses generic message by default
     */
    message?: string,
    /**
     * request ttl, is used to reduce number of verification requests by caching latest call
     * by default equals 0
     */
    ttl?: number,
    /**
     * invalidates latest cached values and and makes full verification request ignoring stored value
     */
    force?: boolean
    /**
     * force wallet signature request
     */
    forceWallet?: boolean,
    /**
     * force NFT match list fetching
     */
    forceFetch?: boolean
};

interface NFTResult {
    amount: number;
    contract_type: 'ERC721' | 'ERC1155';
    name: string | null;
    symbol: string | null;
    token_address: string;
    token_id: string;
    token_uri: string | null;
}

type NFTPassVerifyData = {
    /**
     * if there are matching nfts for the selected wallet on configured network
     */
    match: boolean,
    /**
     * which network was used for nfts search
     */
    network: string,
    /**
     *  list of NFTS, owned by the wallet, that matched Application configuration
     */
    nfts: NFTResult[]
}

type NFTPass = {
    verify: (NFTPassParams) => Promise<NFTPassVerifyData>
}

const verify = async (
    {
        apiKey,
        message = DEFAULT_MESSAGE,
        ttl = DEFAULT_TTL,
        force = false,
        forceWallet = false,
        forceFetch = false
    }: NFTPassParams = { apiKey: null }) => {
    if (!apiKey) throw new Error('NFTPass: cannot perform verification, apiKey was not provided.');
    if (!window.ethereum) throw new Error('No crypto wallet found. Please install it.');
    // get data from prev request
    const storedData = ls.get(LS_KEY);
    // if we still have ttl
    const isTTL = !!storedData?.ts && storedData.ts > Date.now();
    // if stored data is not applicable
    const fullForce = force || !isTTL;

    const ts = fullForce ? Date.now() + ttl : storedData.ts;
    const body = fullForce || forceWallet ? await signMessage(message) : storedData.body;
    const result = fullForce || forceFetch ? await fetchNFTS(apiKey, body) : storedData.result;

    ls.set(LS_KEY, { ts, body, result });

    return result;
}

export default Object.freeze({
    verify,
    authorize: verify
}) as NFTPass;

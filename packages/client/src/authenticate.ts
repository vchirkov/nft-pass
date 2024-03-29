import { fetchWrapper } from './util/fetchWrapper';
import { checkApiKey, checkMetamask } from './util/checks';
import { sign } from './sign';

import { NFTResult } from './types';

export type NFTPassAuthParams = {
    /**
     * Api Key for corresponding configuration from admin page
     */
    apiKey: string,
    /**
     *  message to be signed in wallet, uses generic message by default
     */
    message?: string,
    /**
     * json web token, generated by authentication method.
     * If passed, will skip message signing by the wallet
     */
    jwt?: string,
};

export type NFTPassAuthData = {
    /**
     * if there are matching nfts for the selected wallet on configured network
     */
    match: boolean,
    /**
     * JSON Web Token associated with this user. Can be used later on server side to validate transactions on server
     */
    jwt: string,
    /**
     * which network was used for nfts search
     */
    network: string,
    /**
     *  list of NFTS, owned by the wallet, that matched Application configuration
     */
    nfts: NFTResult[]
}

export async function authenticate(
    {
        apiKey,
        message,
        jwt
    }: NFTPassAuthParams = { apiKey: null }): Promise<NFTPassAuthData> {
    checkApiKey(apiKey);
    return await fetchWrapper(apiKey, '/api/client/authenticate', jwt ? { jwt } : await sign(message));
}

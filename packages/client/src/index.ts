import { sign, SignResult } from './sign';
import { verify, NFTPassVerifyParams, NFTPassVerifyData } from './verify';
import { authenticate, NFTPassAuthParams, NFTPassAuthData } from './authenticate';

export type NFTPass = {
    sign: (message: string) => Promise<SignResult>,
    verify: (params: NFTPassVerifyParams) => Promise<NFTPassVerifyData>
    authenticate: (params: NFTPassAuthParams) => Promise<NFTPassAuthData>
}

export default Object.freeze({
    sign,
    verify,
    authenticate
}) as NFTPass;

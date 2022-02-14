import {useCallback} from 'react';
import {useRouter} from 'next/router';
import {setCookies} from 'cookies-next';
import {toast} from 'react-toastify';
import NFTPass from '@nft-pass/client';

const apiKey = process.env.NFT_PASS_API_KEY;

export function useNFTPassAuth() {
    const router = useRouter();
    return useCallback(async () => {
        try {
            const {jwt} = await NFTPass.authenticate({apiKey});
            setCookies('x-nftpass-demo-auth', jwt);
            await router.push('/');
            toast.success('successfully authenticated');
        } catch (e) {
            toast.error(e.message)
        }
    }, [router]);
}

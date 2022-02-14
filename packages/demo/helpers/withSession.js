import NFTPass from '@nft-pass/client';
import {getCookie, removeCookies} from 'cookies-next';

const apiKey = process.env.NFT_PASS_API_KEY;
const redirect = {
    permanent: false,
    destination: '/login'
};

export function withSession(getServerSideProps = () => ({props: {}})) {
    return async (...args) => {
        const [{req, res}] = args;
        const jwt = getCookie('x-nftpass-demo-auth', {req, res});
        if (!jwt) return {redirect, props: {}};
        try {
            req.nftpass = await NFTPass.verify({apiKey, jwt});
        } catch (e) {
            removeCookies('x-nftpass-demo-auth', {req, res});
            return {redirect, props: {error: e.message}};
        }
        return getServerSideProps(...args);
    };
}

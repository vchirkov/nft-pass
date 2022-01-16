const {Router} = require('express');
const Moralis = require('moralis/node');

const {App} = require('../../../db/models/App');

module.exports = () => {
    const router = new Router();

    router.post('/verify', async (req, res, next) => {
        const {_id, network} = req.nftpass.app;

        const {result: nfts} = await Moralis.Web3API.account.getNFTs({
            chain: network,
            address: req.nftpass.address
        });

        const nftsHash = nfts.reduce((memo, nft) => {
            const tokenAddress = nft.token_address.toLowerCase();
            return ({
                ...memo,
                [tokenAddress]: !!memo[tokenAddress] ? [...memo[tokenAddress], nft] : [nft]
            })
        }, {});

        const [{nfts: matchingAddresses}] = await App.aggregate([
            {$match: {_id}},
            {$project: {nfts: {$setIntersection: ['$nfts', Object.keys(nftsHash)]}}}
        ]).exec();

        res.json({
            network,
            match: !!matchingAddresses.length,
            nfts: matchingAddresses.reduce((memo, address) => [...memo, ...nftsHash[address]], [])
        }).send();
    });
    return router;
}

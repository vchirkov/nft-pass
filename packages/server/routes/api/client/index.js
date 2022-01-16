const {Router} = require('express');
const Moralis = require('moralis/node');

const {App} = require('../../../db/models/App');

const {CHAIN} = process.env;

module.exports = () => {
    const router = new Router();

    router.post('/verify', async (req, res, next) => {
        const {result: nfts} = await Moralis.Web3API.account.getNFTs({
            chain: CHAIN,
            address: req.nftpass.address
        });

        const nftAddresses = nfts.map(({token_address}) => token_address);
        const nftsHash = nfts.reduce((memo, nft) => ({
            ...memo,
            [nft.token_address]: nft
        }), {});

        const [{nfts: matchingAddresses}] = await App.aggregate([
            {$match: {_id: req.nftpass.appId}},
            {$project: {nfts: {$setIntersection: [nftAddresses]}}}
        ]).exec();

        res.json({
            data: {
                match: !!matchingAddresses.length,
                nfts: matchingAddresses.map(address => nftsHash[address])
            }
        }).send();
    });
    return router;
}

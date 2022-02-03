const Moralis = require('moralis/node');

const {App} = require('../../../../db/models/App');

module.exports = async (appId, network, address) => {
    const {result: nfts} = await Moralis.Web3API.account.getNFTs({
        chain: network,
        address
    });

    const nftsHash = nfts.reduce((memo, nft) => {
        const tokenAddress = nft.token_address.toLowerCase();
        return ({
            ...memo,
            [tokenAddress]: !!memo[tokenAddress] ? [...memo[tokenAddress], nft] : [nft]
        })
    }, {});

    const [{nfts: matchingAddresses}] = await App.aggregate([
        {$match: {_id: appId}},
        {$project: {nfts: {$setIntersection: ['$nfts', Object.keys(nftsHash)]}}}
    ]).exec();

    return matchingAddresses.reduce((memo, address) => [...memo, ...nftsHash[address]], []);
}

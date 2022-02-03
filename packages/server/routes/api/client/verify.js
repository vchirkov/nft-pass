const getAppNFTsForWallet = require('./util/getAppNFTsForWallet');

module.exports = async (req, res, next) => {
    const {_id, network} = req.nftpass.app;
    const {address} = req.nftpass.signature;
    const nfts = await getAppNFTsForWallet(_id, network, address);

    res.json({
        network,
        nfts,
        match: !!nfts.length,
    }).send();
}

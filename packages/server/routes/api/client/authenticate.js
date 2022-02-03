const JWT = require('jsonwebtoken');
const getAppNFTsForWallet = require('./util/getAppNFTsForWallet');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
    const {signature} = req.nftpass;
    const {address} = req.nftpass.signature;
    const {_id, network, jwtExpiresIn} = req.nftpass.app;
    const nfts = await getAppNFTsForWallet(_id, network, address);
    if (nfts.length) {
        const jwt = JWT.sign(signature, JWT_SECRET, {expiresIn: `${jwtExpiresIn}h`});
        res.json({
            network,
            nfts,
            jwt,
            match: !!nfts.length,
        }).send();
    } else {
        const err = new Error('No NFTs match authentication configuration');
        err.status = 401;
        return next(err);
    }
}

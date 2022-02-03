const JWT = require('jsonwebtoken');
const {ethers} = require('ethers');

const JWT_SECRET = process.env.JWT_SECRET;

function getSignature(body) {
    const {address, message, signature, jwt} = body;
    if (address && message && signature) {
        return {address, message, signature};
    }
    try {
        return JWT.verify(jwt, JWT_SECRET);
    } catch {
        const err = new Error('Something is wrong with jwt. Access forbidden.');
        err.status = 403;
        throw err;
    }
}

module.exports = () => {
    return async (req, res, next) => {
        try {
            const {address, message, signature} = getSignature(req.body);

            const signerAddr = await ethers.utils.verifyMessage(message, signature);
            if (signerAddr !== address) {
                const err = new Error('Address does not match signature address or the message is corrupted');
                err.status = 401;
                return next(err);
            }
            req.nftpass = {
                ...req.nftpass,
                signature: {address, message, signature}
            };
            next();
        } catch (err) {
            return next(err);
        }
    }
}

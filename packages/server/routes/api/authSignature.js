const {ethers} =require('ethers');

module.exports = () => {
    return async (req, res, next) => {
        try {
            const {address, message, signature} = req.body;
            const signerAddr = await ethers.utils.verifyMessage(message, signature);
            if (signerAddr !== address) {
                const err = new Error('Address does not match signature address or the message is corrupted');
                err.status = 400;
                return next(err);
            }
            req.nftpass = {
                ...req.nftpass,
                address
            };
            next();
        } catch (err) {
            return next(err);
        }
    }
}

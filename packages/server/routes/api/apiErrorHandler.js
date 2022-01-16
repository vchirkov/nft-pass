module.exports = () => {
    return function errorHandler(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            error: {
                message: err.message,
                code: err.code || err.status || 500
            }
        });
    }
}

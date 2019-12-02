const jwt = require('jsonwebtoken');

//authenticate token
module.exports = function authToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401);
        }
        const decoded = jwt.verify(authHeader, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401);
    }
};
const jwt = require('jsonwebtoken');

//authenticate token
module.exports = function authToken(req, res, next) {
    try {
        if (req.cookies && req.cookies.roomer_token) {
            const token = req.cookies.roomer_token;
            jwt.verify(token, process.env.SECRET);
            next();
        } else {
            res.clearCookie('roomer_token');
            return res.status(401).json({"msg": "Not logged in"});
        }
    } catch (e) {
        res.clearCookie('roomer_token');
        return res.status(401).json({"msg": "Not logged in"});
    }
};
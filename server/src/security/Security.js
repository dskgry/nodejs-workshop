/**
 * @author Sven Koelpin
 */

const jwt = require('jsonwebtoken');
const config = require('../config/config');

// eslint-disable-next-line
const authenticateJWT = (req, authKey) => {
    try {
        req.currentUser = jwt.verify(authKey, config.jwtSecret);
        return true;
    } catch (e) {
        return false;
    }
};


module.exports = (req, res, next) => {
    if (req.method.toUpperCase() === 'OPTIONS') {
        return next();
    }
    const authToken = req.header('Authorization') ? req.header('Authorization') : req.params.authorization;
    if (authToken && authToken === 'donald-dump' /*authenticateJWT(req, authToken)*/) {
        return next();
    }
    return res.send(401);
};
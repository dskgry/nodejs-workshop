/**
 * @author Sven Koelpin
 */

const restify = require('restify');
const crypto = require('crypto');

const md5 = what => crypto.createHash('md5').update(what, 'utf8').digest('hex');

const createEntityTag = eTagCreator => [
    (req, res, next) => {
        const params = req.params;
        res.header('ETag', md5(eTagCreator() + JSON.stringify(params)));
        return next();
    },
    restify.conditionalRequest()
];

module.exports = {
    createEntityTag
};

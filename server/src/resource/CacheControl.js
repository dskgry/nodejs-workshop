/**
 * @author Sven Koelpin
 */

const restify = require('restify');
const crypto = require('crypto');

const md5 = what => crypto.createHash('md5').update(what, 'utf8').digest('hex');

const createEntityTag = eTagCreator => [
    async (req, res, next) => {
        const params = req.params;
        const etag = await eTagCreator();
        res.header('ETag', md5(etag + JSON.stringify(params)));
        return next();
    },
    restify.conditionalRequest()
];

module.exports = {
    createEntityTag
};

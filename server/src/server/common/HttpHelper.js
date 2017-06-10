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


const createLink = (rel, link) => `<${link}>; rel="${rel}"`;

const addPagination = ({req, res, page, size, max}) => {
    const nextPage = page + 1;
    if ((nextPage * size) <= max) {
        const nextLink = createLink('next', `http://${req.header('host')}${req.path()}?page=${nextPage}&size=${size}`);
        res.header('Link', nextLink);
    }
};

const addLocationHeader = ({req, res, id}) => res.header('Location', `http://${req.header('host')}${req.path()}/${id}`);

module.exports = {
    addPagination,
    addLocationHeader,
    createEntityTag
};


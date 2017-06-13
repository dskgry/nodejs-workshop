/**
 * @author Sven Koelpin
 */
const crypto = require('crypto');

const md5 = what => crypto.createHash('md5').update(what, 'utf8').digest('hex');

const createLink = (rel, link) => `<${link}>; rel="${rel}"`;

/**
 * Creates a string that can be used as a link header. Returns null if no more pages are present
 * @param req   The HTTP-request
 * @param page  The current page
 * @param size  The current size
 * @param max   The overall data count
 * @returns The link or null if no more data is present
 */
const createLinkHeaderString = ({req, page, size, max}) => {
    const nextPage = page + 1;
    if ((nextPage * size) <= max) {
        return createLink('next', `http://${req.header('host')}${req.path()}?page=${nextPage}&size=${size}`);
    }
    return null;
};

/**
 * Creates a string that can be used as a location header.
 * @param req  The HTTP-request
 * @param id   The id of an entity
 * @returns the location-string
 */
const createLocationHeaderString = ({req, id}) => `http://${req.header('host')}${req.path()}/${id}`;

module.exports = {
    createLinkHeaderString,
    createLocationHeaderString,
    md5
};


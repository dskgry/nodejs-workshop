/**
 * @author Sven Koelpin
 */


const createLink = (rel, link) => {
    return '<' + link + '>; rel="' + rel + '"';
};

module.exports = ({req, res, page, size, max}) => {
    //TODO prev etc
    const nextPage = page + 1;
    if ((nextPage * size) <= max) {
        const nextLink = createLink('next', `http://${req.header('host')}${req.path()}?page=${nextPage}&size=${size}`);
        res.header('Link', nextLink);
    }
};

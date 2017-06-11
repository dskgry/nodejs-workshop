/**
 * @author Sven Koelpin
 */
const fakeDatabase = require('../db/FakeDatabase');

module.exports = server => {
    server.get('tweets', (req, res, next) => {
        res.send(fakeDatabase.getTweetsTable());
        next();
    });
};

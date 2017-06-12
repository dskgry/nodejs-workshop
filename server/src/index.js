/**
 * @author Sven Koelpin
 */
const dataBase = require('./db/Database');
const tweetResource = require('./tweets/TweetsResource');
const server = require('./server/Server');


server.register(tweetResource);


dataBase.init().then(() => server.start()).catch(e => {
    console.log('DB not running');
    process.exit();
});







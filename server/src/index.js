/**
 * @author Sven Koelpin
 */
const dataBase = require('./db/Database');
const tweetResource = require('./tweets/TweetsResource');
const server = require('./server/Server');


server.register(tweetResource);


//TODO:
// - start the server AFTER database.init was successful (Hint: database.init is a promise)
// - kill the process if no database is present (use process.exit())

server.start();





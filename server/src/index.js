require('dotenv').load();
const server = require('./server/Server');

//TODO
// - require TweetsResource
// - register the TweetsResource (server.register)

server.start();

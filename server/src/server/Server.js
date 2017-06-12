/**
 * @author Sven Koelpin
 */

const restify = require('restify');
const webSocket = require('ws');
const logger = require('./Logger');
const security = require('../security/Security');
const eventEmitter = require('./Events');
restify.CORS.ALLOW_HEADERS.push('authorization');


const server = restify.createServer();

server.pre(logger);

server.use(restify.CORS());
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(security);


//socket
const wss = new webSocket.Server({server});
//TODO
// - listen to 'connection' - event
// - listen to eventEmitters 'newData' event (eventEmitters.addListener('event',handler)) and push the data to the client
// - remove the listener (eventEmitter.removeListener('event', handler)) when a client disconnects ('close'-event)


module.exports = {
    start() {
        server.listen(3001, () => {
            console.log('server up');
        })
    },
    register(resource){
        resource(server);
    },
    getServer(){
        return server;
    }
};

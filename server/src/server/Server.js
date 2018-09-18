/**
 * @author Sven Koelpin
 */
const restify = require('restify');
const webSocket = require('ws');
const logger = require('./Logger');
const security = require('../security/Security');
const corsMiddleware = require('restify-cors-middleware');
const eventEmitter = require('./Events');

const {
    ALLOWED_ORIGINS,
    API_PORT
} = process.env;


const cors = corsMiddleware({
    origins: ALLOWED_ORIGINS ? [ALLOWED_ORIGINS] : ['*'],
    allowHeaders: ['authorization']
});


const server = restify.createServer();

//middlewares pre
server.pre(logger);
server.pre(cors.preflight);
//middlewares use plugins
server.use(cors.actual);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.use(security);

//socket
const wss = new webSocket.Server({server});
//TODO
// - listen to 'connection' - event of wss
// - listen to eventEmitters 'newData' event (eventEmitters.addListener('event',handler))
// - push the data to the client when the newData-Event is fired (ws.send(JSON.stringify(data))) <-- JSON.stringify is important here ;)
// - remove the listener (eventEmitter.removeListener('event', handler)) when a client disconnects ('close'-event)

module.exports = {
    register(resource) {
        resource(server);
    },
    getServer() {
        return server;
    },
    start() {
        server.listen(API_PORT, () => {
            console.log(`Server started: http://localhost:${API_PORT}`);
        });
    }
};

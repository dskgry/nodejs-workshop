/**
 * @author Sven Koelpin
 */
const restify = require('restify');
const webSocket = require('ws');
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


//TODO give our api a name and a version
const server = restify.createServer();


//middlewares pre
server.pre(cors.preflight);
//TODO use throttle-plugin (burst:2, rate:2, ip:true)
//middlewares use plugins
server.use(cors.actual);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
//TODO use gzip plugin

server.use(security);


//socket
const wss = new webSocket.Server({server});

wss.on('connection', ws => {
    const onEventListener = newData => ws.send(JSON.stringify(newData));
    eventEmitter.addListener('newData', onEventListener);
    ws.on('close', () => eventEmitter.removeListener('newData', onEventListener));
});


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

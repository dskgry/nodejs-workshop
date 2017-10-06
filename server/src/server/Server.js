/**
 * @author Sven Koelpin
 */

const restify = require('restify');
const webSocket = require('ws');
const logger = require('./Logger');
const security = require('../security/Security');
const corsMiddleware = require('restify-cors-middleware');
const eventEmitter = require('./Events');


const cors = corsMiddleware({
    origins: ['http://localhost:3000'],
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

wss.on('connection', ws => {
    const onEventListener = newData => ws.send(JSON.stringify(newData));
    eventEmitter.addListener('newData', onEventListener);
    ws.on('close', () => eventEmitter.removeListener('newData', onEventListener));
});


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

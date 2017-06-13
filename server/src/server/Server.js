/**
 * @author Sven Koelpin
 */

const restify = require('restify');
const webSocket = require('ws');
const logger = require('./Logger');
const security = require('../security/Security');
const eventEmitter = require('./Events');
restify.CORS.ALLOW_HEADERS.push('authorization');


//TODO give our api a name and a version
const server = restify.createServer();

server.pre(logger);
server.pre(restify.pre.sanitizePath());
//TODO use throttle-plugin (burst:2, rate:2, ip:true)

server.use(restify.CORS());
server.use(restify.queryParser());
server.use(restify.bodyParser());

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

/**
 * @author Sven Koelpin
 */
const restify = require('restify');
const webSocket = require('ws');
const eventEmitter = require('../server/Events');
const logger = require('./Logger');
const security = require('../security/Security');
const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
    origins: ['http://localhost:3000'],
    allowHeaders: ['authorization']
});

module.exports = {
    create(){
        const server = restify.createServer({
            name: 'Twttr',
            version: '1.0.0'
        });

        //middlewares pre
        server.pre(logger);
        server.pre(restify.pre.sanitizePath());
        server.pre(cors.preflight);
        server.pre(restify.plugins.throttle({burst: 10, rate: 10, ip: true}));

        //middlewares use plugins
        server.use(cors.actual);
        server.use(restify.plugins.queryParser());
        server.use(restify.plugins.bodyParser());
        server.use(restify.plugins.gzipResponse());

        server.use(security);

        const wss = new webSocket.Server({server});

        wss.on('connection', ws => {
            const onEventListener = newData => ws.send(JSON.stringify(newData));
            eventEmitter.addListener('newData', onEventListener);
            ws.on('close', () => eventEmitter.removeListener('newData', onEventListener));
        });

        return {
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
        }
    }
};

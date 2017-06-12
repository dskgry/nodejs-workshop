/**
 * @author Sven Koelpin
 */

const logger = require('./Logger');
const security = require('../security/Security');
const restify = require('restify');
restify.CORS.ALLOW_HEADERS.push('authorization');


const server = restify.createServer();

server.pre(logger);

server.use(restify.CORS());
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(security);

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

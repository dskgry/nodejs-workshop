/**
 * @author Sven Koelpin
 */

const restify = require('restify');
restify.CORS.ALLOW_HEADERS.push('authorization');


const server = restify.createServer();

//TODO add logger middleware

server.use(restify.CORS());
server.use(restify.queryParser());
server.use(restify.bodyParser());

//TODO add security middleware


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

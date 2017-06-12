/**
 * @author Sven Koelpin
 */

const restify = require('restify');
restify.CORS.ALLOW_HEADERS.push('authorization');


const server = restify.createServer();

server.use(restify.CORS());
server.use(restify.queryParser());


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

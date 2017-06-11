/**
 * @author Sven Koelpin
 */

const restify = require('restify');
restify.CORS.ALLOW_HEADERS.push('authorization');



const server = restify.createServer();

//TODO
//- use the cors-middleware to enable cors

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

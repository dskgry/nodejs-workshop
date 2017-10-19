/**
 * @author Sven Koelpin
 */

const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
    origins: ['http://localhost:3000'],
    allowHeaders: ['authorization']
});


const server = restify.createServer();

//TODO
//- use the cors-middleware to enable cors
//- check the slides or (https://www.npmjs.com/package/restify-cors-middleware) for usage info :)

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

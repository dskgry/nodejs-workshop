/**
 * @author Sven Koelpin
 */
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

const {
    ALLOWED_ORIGINS,
    API_PORT
} = process.env;


const cors = corsMiddleware({
    origins: ALLOWED_ORIGINS ? [ALLOWED_ORIGINS] : ['*'],
    allowHeaders: ['authorization']
});


const server = restify.createServer();

//TODO
//- use the cors-middleware to enable cors
//- check the slides or (https://www.npmjs.com/package/restify-cors-middleware) for usage info :)

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

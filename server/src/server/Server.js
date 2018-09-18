/**
 * @author Sven Koelpin
 */
//TODO require logger + security
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

//middlewares pre
//TODO add logger middleware
server.pre(cors.preflight);
//middlewares use plugins
server.use(cors.actual);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

//TODO add security middleware

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

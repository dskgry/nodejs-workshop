/**
 * @author Sven Koelpin
 */
const restify = require('restify');
const config = require('./config');
const logger = require('./log/Logger');

const tweetsResource = require('./tweets/TweetsResource');


const server = restify.createServer({
    name: 'Twttr',
    log: logger,
    version: '1.0.0'
});
server.use(restify.throttle({burst: 2, rate: 2, ip: true}));
server.use(restify.acceptParser(['application/json', 'text/event-stream']));
server.use(restify.CORS({origins: config.origins}));
server.use(restify.requestLogger());
server.use(restify.gzipResponse());
server.use(restify.queryParser());
server.use(restify.bodyParser({mapParams: false}));
server.on('uncaughtException', (req, res, route, err) => {
    logger.error(err);
    res.send(500);
});

tweetsResource(server);


server.listen(3001, () => {
    logger.info('server up');
});


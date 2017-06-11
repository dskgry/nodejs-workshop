/**
 * @author Sven Koelpin
 */

const restify = require('restify');

const server = restify.createServer();

server.get('/', (req, res, next) => {
    res.send({message: 'Hello summit'});
    next();
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

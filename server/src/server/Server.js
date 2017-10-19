/**
 * @author Sven Koelpin
 */

//TODO
//- require restify
//- create server
//- add get method to the server which uses the path "/" and returns the json : {message: "hello IJS"}

const server = null;

module.exports = {
    start() {
        //TODO
        //start the server here (server.listen(port,callback))
        //port should be 3001
        //server will be listening at http://localhost:3001 when started.
    },
    register(resource) {
        resource(server);
    },
    getServer() {
        return server;
    }
};

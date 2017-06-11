/**
 * @author Sven Koelpin
 */

//TODO
//- require restify
//- create server
//- add get method which returns the json : {message: "hello summit"}

const server = null;

module.exports = {
    start() {
        //TODO start the server here (server.listen(port,callback)
    },
    register(resource){
        resource(server);
    },
    getServer(){
        return server;
    }
};

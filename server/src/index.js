/**
 * @author Sven Koelpin
 */
const cluster = require('cluster');
const os = require('os');
const http = require('http');

const tweetResource = require('./tweets/TweetsResource');
const analyzeResource = require('./analyze/AnalyzeResource');
const server = require('./server/Server');


cluster.schedulingPolicy = cluster.SCHED_RR; //this is important for this "show-case" on window

const args = process.argv;

if (args.length === 3 && args[2] === '--clustered') {
    startClustered();
} else {
    startSingleProcess();
}

function startClustered() {

    if (cluster.isMaster) {
        const numWorkers = os.cpus().length;

        console.log(`Starting ${numWorkers} workers`);

        for (let i = 0; i < numWorkers; i += 1) {
            cluster.fork();
        }

        cluster.on('online', worker => console.log(`Worker ${worker.process.pid} started`));

        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker died. {code:${code},signal:${signal}`);
            cluster.fork();
        });
    } else {
        startSingleProcess();
    }
}


function startSingleProcess() {
    const dataBase = require('./db/Database');
    const serverInstance = server.create();
    serverInstance.register(tweetResource);
    serverInstance.register(analyzeResource);
    dataBase.init().then(() => serverInstance.start()).catch(e => {
        console.log('DB not running', e.message);
        process.exit();
    });
}









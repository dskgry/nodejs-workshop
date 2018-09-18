require('dotenv').load();

const cluster = require('cluster');
const os = require('os');
const logger = require('./server/Logger');


const startClustered = () => {
    if (cluster.isMaster) {
        const numWorkers = os.cpus().length;

        logger.info(`Starting ${numWorkers} workers`);

        for (let i = 0; i < numWorkers; i += 1) {
            cluster.fork();
        }

        cluster.on('online', worker => logger.info(`Worker ${worker.process.pid} started`));

        cluster.on('exit', (worker, code, signal) => {
            logger.info(`Worker died. {code:${code},signal:${signal}`);
            cluster.fork();
        });
    } else {
        startSingleProcess();  //eslint-disable-line
    }
};


const startSingleProcess = () => {
    const server = require('./server/Server'); //eslint-disable-line
    const dataBase = require('./db/Database');      //eslint-disable-line
    const tweetResource = require('./tweets/TweetsResource');    //eslint-disable-line
    const analyzeResource = require('./analyze/AnalyzeResource');  //eslint-disable-line
    server.register(tweetResource);
    server.register(analyzeResource);
    dataBase.init().then(() => server.start()).catch(e => {
        logger.info('DB not running', e.message);
        process.exit();
    });
};


const args = process.argv;
if (args.length === 3 && args[2] === '--clustered') {
    startClustered();
} else {
    startSingleProcess();
}

/**
 * @author Sven Koelpin
 */

const {Worker} = require('worker_threads');
const path = require('path');


/*eslint-disable */

const veryBigNumber = 10000000000;

module.exports = server => {
    server.get(
        '/analyses',
        (req, res, next) => {
            const random = Math.random();
            if (random < 0.5) {
                process.exit();
            }
            res.send(200);
            next();
        }
    );

    server.post(
        '/analyses',
        (req, res, next) => {
            calcInOwnThread(res, next);

            //useTheEventLoop(res, next);

            //calcInOtherThread(res, next);
        }
    );

    const calcInOtherThread = async (res, next) => {
        const result = await createWorkerPromise(veryBigNumber);
        console.log(result);
        res.send({timesDonaldTweetedToday: result});
        next();

    };

    const calcInOwnThread = (res, next) => {
        let i = 0;

        while (i < veryBigNumber) {
            i += 1;
        }
        res.send({timesDonaldTweetedToday: i});
        next();

    };

    const useTheEventLoop = (res, next) => {
        let i = 0;
        const increase = () => {
            //do some calc
            let chunk = 0;
            while (chunk < 1000000) {
                i++;
                chunk++;
            }
            if (i === veryBigNumber) {
                res.send({timesDonaldTweetedToday: i});
                return next();
            }
            console.log(i);
            setImmediate(increase);
        };
        increase();
    };


    const createWorkerPromise = (number) => new Promise((resolve, reject) => {
        const worker = new Worker(path.resolve(__dirname, 'AnalyzeWorker.js'), {
            workerData: number
        });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', code => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
};

/*eslint-enable */

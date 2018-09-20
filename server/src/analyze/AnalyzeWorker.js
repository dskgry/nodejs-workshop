const {
    parentPort,
    workerData
} = require('worker_threads');


const analyze = () => {
    let i = 0;

    while (i < workerData) {
        i += 1;
    }
    parentPort.postMessage(i);
};

analyze();
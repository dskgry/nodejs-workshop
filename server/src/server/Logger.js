/**
 * @author Sven Koelpin
 */

const bunyan = require('bunyan');
const config = require('../config/config');


const streams = [{
    stream: process.stdout
}];

if (config.logPath) {
    streams.push({
        type: 'rotating-file',
        path: config.logPath,
        period: '1d',
        count: 356
    });
}

module.exports = bunyan.createLogger({
    name: 'twttr',
    streams
});

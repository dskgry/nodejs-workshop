/**
 * @author Sven Koelpin
 */
const bunyan = require('bunyan');

const {
    LOG_PATH
} = process.env;

const streams = [{
    stream: process.stdout
}];

if (LOG_PATH) {
    streams.push({
        type: 'rotating-file',
        path: LOG_PATH,
        period: '1d',
        count: 356
    });
}

module.exports = bunyan.createLogger({
    name: 'twttr',
    streams
});

/**
 * @author Sven Koelpin
 */

import axios from 'axios';

// eslint-disable-next-line
export const SERVER_URI = __DEVELOPMENT__ ? 'http://localhost:3001/' : '/api/';
const AUTH_TOKEN = 'donald-dump';

export const URLS = {
    TWEETS: 'tweets',
    TWEETS_STREAM: 'tweets/stream'
};

let eventStream = null;

const axiosClient = axios.create({
    baseURL: SERVER_URI,
    timeout: 7000
});
axiosClient.defaults.headers.common.Authorization = AUTH_TOKEN;

const disableCache = path => {
    if (path.indexOf('?') === -1) {
        return `${path}?t=${new Date().getTime()}`;
    }
    return `${path}&t=${new Date().getTime()}`;
};


export default {
    async get(path) {
        const response = await axiosClient.get(disableCache(path));
        return response.data;
    },
    async post(path, data) {
        const response = await axiosClient.post(disableCache(path), data);
        return response.data;
    },
    subscribeStream(onNewTweet) {
        this.unSubscribeStream();
        if (window.EventSource) {
            eventStream = new EventSource(`${SERVER_URI}${URLS.TWEETS_STREAM}?authorization=${AUTH_TOKEN}`);
            eventStream.addEventListener('message', event => onNewTweet(JSON.parse(event.data)));
        }
    },
    unSubscribeStream() {
        if (eventStream) {
            eventStream.close();
            eventStream = null;
        }
    }
};

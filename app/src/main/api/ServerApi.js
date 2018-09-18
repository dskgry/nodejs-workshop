/**
 * @author Sven Koelpin
 */

import { cancelable } from './CancelablePromise';

// eslint-disable-next-line
const SERVER_NAME = 'localhost:3001';
const SERVER_URI = `http://${SERVER_NAME}/`;
const WS_URI = `ws://${SERVER_NAME}/`;
const AUTH_TOKEN = 'donald-dump';

export const URLS = {
    TWEETS: 'tweets'
};

const sanitize = (path) => path.indexOf('/') === 0 ? path.substr(1) : path;

const getJSON = async (response) => {
    try {
        return await response.json();
    } catch (e) {
        return null;
    }
};

const request = async (path, options) => {
    let result;
    try {
        result = await fetch(`${SERVER_URI}/${sanitize(path)}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: AUTH_TOKEN,
            },
            ...options,
        });
    } catch (e) {
        throw e;
    }
    checkStatus(result);
    return getJSON(result);
};

const checkStatus = response => {
    if (response.status >= 200 && response.status < 400) {
        return response;
    }
    throw new Error(response.statusText);
};


export const requestGet = path => cancelable(request(path));

export const requestPost = (path, payload) => cancelable(request(path, {
    method: 'POST',
    body: payload ? JSON.stringify(payload) : null,
}));

export const createSocket = (listener) => {
    const socket = new WebSocket(WS_URI);
    socket.addEventListener('message', event => listener(JSON.parse(event.data)));
    return socket;
};

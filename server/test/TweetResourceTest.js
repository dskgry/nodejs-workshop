/**
 * @author Sven Koelpin
 */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
jest.mock('../src/tweets/TweetService');

const supertest = require('supertest');

const server = require('../src/server/Server');
const tweetService = require('../src/tweets/TweetService');
const tweetResource = require('../src/tweets/TweetsResource');


describe('TweetResource', () => {
    beforeAll(() => {
        server.register(tweetResource);
    });

    beforeEach(() => {
        tweetService.createTweet.mockImplementation(() => ({
            id: 1, tweet: 'test', user: '@user'
        }));
    });


    it('a GET-request to path /tweets returns status 401 when not Authorization-Header is present', async done => {
        //Hint: Access the status via response.status
        const response = await null;
        expect(response).not.toBeNull();
        done();
    });

    it('a GET-request to path /tweets returns status 200 when Authorization-Header is present', async done => {
        //Hint: headers can be set with get('..').set({HEADERKEY:'value'})
        const response = await null;
        expect(response).not.toBeNull();
        done();
    });

    it('a GET-request to path /tweets?page=100&size=100000 returns status 400 and an error-payload in request body', async done => {
        //Hint: Access the body via response.body. Don't forget to set the Auth-Header!
        const response = await null;
        const responseBody = null;
        expect(responseBody).toEqual({
            page: 'page must be less than or equal to 10',
            size: 'size must be less than or equal to 100'
        });
        done();
    });

    it('a POST-request to path /tweets with a valid tweet as payload returns status 201', async done => {
        //Hint: use  post('').send(PAYLOAD).set(HEADER)...
        const response = await null;
        expect(response).not.toBeNull();
        done();
    });


    it('a POST-request to path /tweets with an invalid tweet as payload returns status 400 and an error-payload in request body', async done => {
        const response = await null;
        const responseBody = null;

        expect(responseBody).toEqual({
            user: 'user is a required field',
            tweet: 'tweet is a required field'
        });
        done();
    });

});
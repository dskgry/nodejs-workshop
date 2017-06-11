/**
 * @author Sven Koelpin
 */

jest.mock('../src/tweets/TweetService');

const supertest = require('supertest');

const server = require('../src/server/Server');
const tweetService = require('../src/tweets/TweetService');
const tweetResource = require('../src/tweets/TweetsResource');


describe('Tweetservice', () => {
    beforeAll(() => {
        server.register(tweetResource);
    });

    beforeEach(() => {
        tweetService.createTweet.mockImplementation(() => ({
            id: 1, tweet: 'test', user: '@user'
        }));
    });


    it('is secured', async done => {
        const response = await supertest(server.getServer()).get('/tweets');
        expect(response.status).toBe(401);
        done();
    });

    it('can receive tweets with valid parameters', async done => {
        const responseAll = await supertest(server.getServer())
            .get('/tweets')
            .set({Authorization: 'donald-dump'});
        expect(responseAll.status).toBe(200);
        done();
    });

    it('will not send tweet with invalid parameters', async done => {
        const response = await supertest(server.getServer())
            .get('/tweets?page=100&size=100000')
            .set({Authorization: 'donald-dump'});
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            page: 'page must be less than or equal to 10',
            size: 'size must be less than or equal to 100'
        });
        done();
    });

    it('can create a valid tweet', async done => {
        const response = await supertest(server.getServer())
            .post('/tweets')
            .send({tweet: 'test', user: '@test'})
            .set({Authorization: 'donald-dump'});
        expect(response.status).toBe(201);
        expect(response.header.location).toBeDefined();
        done();
    });


    it('will not create an invalid tweet', async done => {
        const response = await supertest(server.getServer())
            .post('/tweets')
            .send({})
            .set({Authorization: 'donald-dump'});
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            user: 'user is a required field',
            tweet: 'tweet is a required field'
        });
        done();
    });

});
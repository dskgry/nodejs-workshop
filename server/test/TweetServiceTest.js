/**
 * @author Sven Koelpin
 */

jest.mock('../src/db/Database');
jest.mock('../src/db/FakeDatabase');

const fakeDatabase = require('../src/db/FakeDatabase');

const tweetService = require('../src/tweets/TweetService');


describe('Tweetservice', () => {
    beforeEach(() => {
        fakeDatabase.getTweetsTable.mockImplementation(() => [
            {id: 1, user: '@test', tweet: 'test'},
            {id: 2, user: '@test_1', tweet: 'test_1'}
        ]);
    });

    it('can count tweets', async () => {
        const count = await tweetService.countTweets();
        expect(count).toBe(2);
    });

    it('can receive tweets', async () => {
        const allTweets = await tweetService.getTweets(0, 100);
        expect(allTweets.length).toBe(2);

        const subTweet = await tweetService.getTweets(0, 1);
        expect(subTweet.length).toBe(1);

        const noTweet = await tweetService.getTweets(100, 1);
        expect(noTweet.length).toBe(0);

    });

    it('can create a tweet', async () => {
        const tweet = await tweetService.createTweet({tweet: 'Hello test', user: '@test'});
        expect(tweet).toEqual({
            tweet: 'Hello test',
            user: '@test',
            id: 3
        });
    });

});
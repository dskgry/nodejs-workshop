/**
 * @author Sven Koelpin
 */

jest.mock('../src/db/FakeDatabase');

const fakeDatabase = require('../src/db/FakeDatabase');

const tweetService = require('../src/tweets/TweetService');


describe('Tweetservice', () => {
    beforeEach(() => {
        const tweets = [
            {id: 1, user: '@test', tweet: 'test'},
            {id: 2, user: '@test_1', tweet: 'test_1'}
        ];
        fakeDatabase.getTweetsTable.mockImplementation(() => tweets);
    });

    it('can count tweets', () => {
        const count = tweetService.countTweets();
        expect(count).toBe(2);
    });

    it('can receive tweets', () => {
        const allTweets = tweetService.getTweets(0, 100);
        expect(allTweets.length).toBe(2);

        const subTweet = tweetService.getTweets(0, 1);
        expect(subTweet.length).toBe(1);

        const noTweet = tweetService.getTweets(100, 1);
        expect(noTweet.length).toBe(0);

    });

    it('can create a tweet', () => {
        const tweet = tweetService.createTweet({tweet: 'Hello test', user: '@test'});
        expect(tweet).toEqual({
            tweet: 'Hello test',
            user: '@test',
            id: 3
        });
        const count = tweetService.countTweets();
        expect(count).toBe(3);
    });

    //TODO: Create a test that checks if the tweetService.getTweet works correctly

});
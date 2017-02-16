/**
 * @author Sven Koelpin
 */

const DATA = {
    tweets: [
        {
            id: 1,
            user: '@realDonaldTrump',
            tweet: 'Windmills are the greatest threat in the US to both bald and golden eagles. ' +
            'Media claims fictional ‘global warming’ is worse'
        },
        {
            id: 2,
            user: '@realDonaldTrump',
            tweet: 'Sorry losers and haters, but my I.Q. is one of the highest -and you all know it! Please don’t' +
            ' feel so stupid or insecure,it’s not your fault'
        },
        {
            id: 3,
            user: '@realDonaldTrump',
            tweet: 'We should have gotten more of the oil in Syria, and we should have gotten more of the oil in ' +
            'Iraq. Dumb leaders'
        }
    ]
};


export const get = url => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            switch (url) {
                case 'tweets':
                    resolve(DATA.tweets);
                    break;
                default:
                    reject('fuck u');
            }
        }, parseInt(Math.random() * 1000, 10))
    });
};


export const post = (url, tweet) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            switch (url) {
                case 'tweets':
                    DATA.tweets = [{id: DATA.tweets.length + 1, tweet, user: '@realSven'}, ...DATA.tweets];
                    resolve(DATA.tweets);
                    break;
                default:
                    reject('fuck u');
            }
        }, parseInt(Math.random() * 1000, 10))
    });
};


export const subscribe = cb => {
    window.svensFakeSocket = setInterval(() => {
        const nextTweets = [{
            id: DATA.tweets.length + 1,
            tweet: 'Lorem bla in real time ' + new Date(),
            user: '@realTimeSven'
        }];
        DATA.tweets = [...nextTweets, ...DATA.tweets];
        cb(nextTweets);
    }, parseInt(Math.random() * 5000, 10));
};

export const unSubscribe = () => {
    window.clearInterval(window.svensFakeSocket);
};
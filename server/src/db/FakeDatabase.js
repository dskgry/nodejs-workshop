const IN_MEMORY_DATA = [
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
];


module.exports = {
    getTweetsTable() {
        return IN_MEMORY_DATA;
    }
};

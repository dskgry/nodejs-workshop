/**
 * @author Sven Koelpin
 */
/*eslint-disable */

const veryBigNumber = 10000000000;

module.exports = server => {
    server.get(
        '/analyses',
        (req, res, next) => {
            const random = Math.random();
            if (random < 0.5) {
                process.exit();
            }
            res.send(200);
            next();
        }
    );

    server.post(
        '/analyses',
        (req, res, next) => {
            calcInThread(res, next);

            //useTheEventLoop(res, next);
        }
    );

    const calcInThread = (res, next) => {
        let i = 0;

        while (i < veryBigNumber) {
            i += 1;
        }
        res.send({timesDonaldTweetedToday: 5000});
        next();

    };

    const useTheEventLoop = (res, next) => {
        let i = 0;
        const increase = () => {
            //do some calc
            let chunk = 0;
            while (chunk < 1000000) {
                i++;
                chunk++;
            }
            if (i === veryBigNumber) {
                res.send({timesDonaldTweetedToday: i});
                return next();
            }
            console.log(i);
            setImmediate(increase);
        };
        increase();
    }
};

/*eslint-enable */

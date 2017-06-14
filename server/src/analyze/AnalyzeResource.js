/**
 * @author Sven Koelpin
 */

const veryBigNumber = 10000000000;

module.exports = server => {

    server.get('analyses',
        (req, res, next) => {
            const random = Math.random();
            if (random < 0.5) {
                process.exit();
            }
            res.send(200);
            next();
        }
    );

    server.post('analyses',
        (req, res, next) => {
            let i = 0;

            while (i < veryBigNumber) {
                i++;
            }
            res.send({timesDonaldTweetedToday: 5000});
            next();

            /* const increase = () => {
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
             increase();*/

        }
    );
};
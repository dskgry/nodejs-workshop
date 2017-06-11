/**
 * @author Sven Koelpin
 */
const Database = {
    find(id){
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({data: id});
            }, 500);
        })
    }
};

//1. call Database.find with the ids 1, 2 and 3. Log each result. The next call can only be done when the previous call returned a value
Database.find(1)
    .then(result => {
        console.log(result);
        return Database.find(2);
    })
    .then(result => {
        console.log(result);
        return Database.find(3);
    })
    .then(console.log);


//2. Do the same again, but let the calls run concurrently. Log the result
Promise.all([Database.find(1), Database.find(2), Database.find(3)]).then(console.log);
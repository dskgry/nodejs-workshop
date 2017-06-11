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
const receiveDataInSequence = async () => {
    //ur code here
};

receiveDataInSequence();


//2. Do the same again, but let the calls run concurrently. Log the result
const receiveDataConcurrently = async () => {
    //ur code here
};
receiveDataConcurrently();


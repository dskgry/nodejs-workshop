export class CancelledPromiseError extends Error {
}

export const cancelable = promise => {
    let isCancelled = false;
    const cancelError = new CancelledPromiseError();
    const promiseWrapper = new Promise((resolve, reject) => {
        promise
            .then(result => isCancelled ? reject(cancelError) : resolve(result))
            .catch(e => isCancelled ? reject(cancelError) : reject(e));
    });

    promiseWrapper.cancel = () => {
        isCancelled = true;
    };

    return promiseWrapper;
};

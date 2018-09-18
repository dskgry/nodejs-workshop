//@flow

/**
 * @author Sven Koelpin
 */

const TOKEN = 'token';
let jwt = null;

export const getToken = () => {
    if (!jwt) {
        if (localStorage.getItem(TOKEN) !== null) {
            const storageItem = localStorage.getItem(TOKEN);
            jwt = storageItem ? JSON.parse(storageItem) : null;
        }
    }
    return jwt;
};

export const isSignedIn = () => getToken() !== null;

export const signIn = ({userName, pass}: { userName: string, pass: string }): Promise<*> => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (pass === 'summit') {
            jwt = {name: userName};
            localStorage.setItem(TOKEN, JSON.stringify(jwt));
            return resolve();
        }
        return reject();
    }, 250);
});

export const signOut = () => {
    jwt = null;
    localStorage.removeItem(TOKEN);
};

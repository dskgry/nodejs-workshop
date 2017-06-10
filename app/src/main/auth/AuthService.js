/**
 * @author Sven Koelpin
 */

const TOKEN = 'token';
let jwt = null;

export const getToken = () => {
    if (!jwt) {
        if (localStorage.getItem(TOKEN) !== null) {
            jwt = JSON.parse(localStorage.getItem(TOKEN));
        }
    }
    return jwt;
};

export const isSignedIn = () => getToken() !== null;

export const signIn = ({userName, pass}) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (pass === 'asdasd') {
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

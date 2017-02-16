/**
 * @author Sven Koelpin
 */
import { browserHistory } from 'react-router';
import { ROUTES } from '../Twttr';

const AUTH_KEY = 'authenticated';

export const checkAuthentication = () => {
    const isAuthenticated = localStorage.getItem(AUTH_KEY) === 'true';
    if (!isAuthenticated) {
        browserHistory.push(ROUTES.AUTH);
    }
};

export const signIn = () => {
    localStorage.setItem(AUTH_KEY, true);
    browserHistory.push(ROUTES.HOME);
};

export const signOut = () => {
    localStorage.removeItem(AUTH_KEY);
    browserHistory.push(ROUTES.AUTH);
};
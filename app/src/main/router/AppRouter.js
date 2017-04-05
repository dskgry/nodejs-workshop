/**
 * @author Sven Koelpin
 */


import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import AsyncComponent from './AsyncComponent';
import Route from './Route';


export const ROUTES = {
    AUTH: '/auth',
    HOME: '/'
};


const AuthView = AsyncComponent(() => System.import('../auth/AuthView').then(module => module.default));
const TweetView = AsyncComponent(() => System.import('../tweet/TweetView').then(module => module.default));


export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={ROUTES.AUTH} component={AuthView}/>
                <Route path={ROUTES.HOME} component={TweetView} isPrivate/>
            </Switch>
        </BrowserRouter>
    );
}

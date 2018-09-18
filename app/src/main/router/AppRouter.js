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


const AuthView = AsyncComponent(() => import('../auth/AuthView').then(module => module.default));
const TweetView = AsyncComponent(() => import('../tweet/TweetView').then(module => module.default));


export default () => (
    <BrowserRouter>
        <Switch>
            <Route path={ROUTES.AUTH} component={AuthView}/>
            <Route path={ROUTES.HOME} component={TweetView} isPrivate exact/>
        </Switch>
    </BrowserRouter>
);

/**
 * @author Sven Koelpin
 */
import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import style from './twttr.less';
import { checkAuthentication } from './api/AuthService';

export const ROUTES = {
    AUTH: '/auth',
    HOME: '/'
};

class Twttr extends Component {

    componentWillMount() {
        checkAuthentication();
    }

    asyncRoute(cb) {
        return module => cb(null, module.default);
    }

    render() {
        return (
            <main className={style.app}>
                <Router history={browserHistory}>
                    <Route path={ROUTES.HOME}
                           getComponent={(l, cb) => System.import('./tweet/TweetView').then(this.asyncRoute(cb))}/>
                    <Route path={ROUTES.AUTH}
                           getComponent={(l, cb) => System.import('./auth/AuthView').then(this.asyncRoute(cb))}/>
                </Router>
            </main>

        )
    }
}


window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<Twttr/>, document.getElementById('page'));
});
/**
 * @author Sven Koelpin
 */
import React from 'react';
import * as ReactDOM from 'react-dom';

import AppRouter from './router/AppRouter';
import 'bootstrap/dist/css/bootstrap.css';
import style from './twttr.less';


const Twttr = () => {
    return (
        <main className={style.app}>
            <AppRouter/>
        </main>

    )
};


window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<Twttr/>, document.getElementById('page'));
});

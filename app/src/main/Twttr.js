/**
 * @author Sven Koelpin
 */
import React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import AppRouter from './router/AppRouter';
import style from './twttr.less';


const Twttr = () => (
    <main className={style.app}>
        <AppRouter/>
    </main>

);


window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<Twttr/>, window.document.getElementById('page'));
});

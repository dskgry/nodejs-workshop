//@flow
/**
 * @author Sven Koelpin
 */
import React from 'react';
import styled from 'styled-components';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import AppRouter from './router/AppRouter';

const Twttr = () => (
    <App>
        <AppRouter/>
    </App>

);

const App = styled.main`
  padding: 10px; 
`;

window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<Twttr/>, window.document.getElementById('page'));
});

/**
 * @author Sven Koelpin
 */
import React from 'react';
import { Redirect, Route as ReactRoute } from 'react-router-dom';
import { isSignedIn } from '../auth/Auth';
import { ROUTES } from './AppRouter';


const Route = ({component, isPrivate}, ...props) => {
    if (isPrivate) {
        return isSignedIn() ? <ReactRoute {...props} component={component}/> : <Redirect to={ROUTES.AUTH}/>;
    }
    return isSignedIn() ? <Redirect to={ROUTES.HOME}/> : <ReactRoute {...props} component={component}/>;
};

Route.defaultProps = {
    isPrivate: false
};

export default Route;

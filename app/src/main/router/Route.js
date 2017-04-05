/**
 * @author Sven Koelpin
 */
import React from 'react';
import { Redirect, Route as ReactRoute } from 'react-router-dom';
import { isSignedIn } from '../auth/AuthService';
import { ROUTES } from './AppRouter';


const Route = ({component, isPrivate}, ...props) => {
    if (isPrivate) {
        return isSignedIn() ? <ReactRoute {...props} component={component}/> : <Redirect to={ROUTES.AUTH}/>;
    }
    return isSignedIn() ? <Redirect to={ROUTES.HOME}/> : <ReactRoute {...props} component={component}/>;
};

Route.propTypes = {
    component: React.PropTypes.func.isRequired,
    isPrivate: React.PropTypes.bool
};

export default Route;


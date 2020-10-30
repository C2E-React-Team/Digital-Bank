import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../components/Auth';

 const PublicPath = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicPath;
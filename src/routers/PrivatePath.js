import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin,isAdmin } from '../components/Auth';
import Header from '../components/Header.jsx';

const PrivatePath = ({component: Component, ...rest}) => {
    
    return (
        <Route {...rest} render={props => (
            
            isAdmin()?<Redirect to="/admin" />:
            (isLogin() ?
            <div>
                <Header />
                <Component {...props} />
                </div>
            : <Redirect to="/login" />
    ))} />
    );
};

export default PrivatePath;
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdmin } from '../components/Auth';
import AdminHome from '../components/AdminHome.jsx';
import Header from '../components/Header.jsx';

const AdminPath = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isAdmin() ?
            <div>
                <Header />
                <Component {...props} />
                </div>
            : <Redirect to="/" />
        )} />
    );
};

export default AdminPath;
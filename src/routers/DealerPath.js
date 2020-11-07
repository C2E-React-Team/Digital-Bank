import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isDealer } from '../components/Auth';
import AdminHome from '../components/AdminHome.jsx';
import Header from '../components/Header.jsx';

const DealerPath = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isDealer() ?
            <div>
                <Header />
                <Component {...props} />
                </div>
            : <Redirect to="/" />
        )} />
    );
};

export default DealerPath;
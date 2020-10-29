import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import LoginPage from '../components/login.jsx';
import HomePage from '../components/HomePage.js'
import DealDetails from '../components/cars/DealDetails.jsx';
import PrivatePath from './PrivatePath.js';
import PublicPath  from './PublicPath.js';
import NotFoundPage from '../components/NotFoundPage';
import HandleLoan from '../components/cars/HandleLoan.jsx'
import Profile from '../components/profile.jsx';
import HeroPage from '../components/heroPage.jsx'
import DealerHome from '../components/dealerHome.jsx'
import AdminHome from '../components/adminHome.jsx'
export const history = createBrowserHistory();
import AppliedLoan from '../components/cars/AppliedLoans.jsx'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";

const AppRouter = () => (
        
            <BrowserRouter  history={history}>
            <div>
                {/*<Link to="/">Login</Link>*/}
                {/* <Link to="/cars/12">Login</Link> */}
            <Switch>
                {/*<Route path='/' component={LoginPage} exact={true}/>
                <PrivatePath path="/homepage" component={HomePage} exact={true}/> */}
                <PrivatePath path="/cars/:id" component={DealDetails} />
                <PrivatePath path="/profile" component={Profile} exact />
                <PublicPath path="/login" component={LoginPage} exact /> 
                <PublicPath path="/dealer" component={DealerHome} exact />
                <PublicPath path="/admin" component={AdminHome} exact />
                <PrivatePath component={HandleLoan} path="/loanpage/:id" />
                <PrivatePath component={AppliedLoan} path="/appliedloan" />
                
                <PrivatePath path="/profile" component={Profile} exact /> 
                <PublicPath restricted={false} component={HomePage} path="/" exact />
                <PublicPath component={HeroPage} path="/" exact />
                <Route component={NotFoundPage} />
            </Switch>
           
        </div>
        </BrowserRouter>
    )
export default AppRouter;




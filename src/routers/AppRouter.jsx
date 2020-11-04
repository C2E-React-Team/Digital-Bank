import React, { Component } from 'react';
import {BrowserRouter, Router, Route, Switch, Link} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import LoginPage from '../components/login.jsx';
import HomePage from '../components/HomePage.js';
import DealDetails from '../components/cars/DealDetails.jsx';
import PrivatePath from './PrivatePath.js';
import CarsPage from '../components/cars/CarsPage.jsx';
import PublicPath  from './PublicPath.js';
import NotFoundPage from '../components/NotFoundPage';
import HandleLoan from '../components/cars/HandleLoan.jsx'
import Profile from '../components/profile.jsx';
import HeroPage from '../components/heroPage.jsx'
import DealerHome from '../components/dealerHome.jsx'
import AdminHome from '../components/AdminHome.jsx'
import AppliedLoan from '../components/cars/AppliedLoans.jsx'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import AdminPath  from './AdminPath.js';
import AdminProfileView from '../components/AdminProfileView.jsx';
import AddCar from '../components/AddCar.jsx';

export const history = createBrowserHistory();


const AppRouter = () => (
        
            <BrowserRouter  history={history}>
            <div>
                {/*<Link to="/">Login</Link>*/}
                {/* <Link to="/cars/12">Login</Link> */}
            <Switch>
                {/*<Route path='/' component={LoginPage} exact={true}/>
                <PrivatePath path="/homepage" component={HomePage} exact={true}/> 
                <PublicPath path="/dealer" component={DealerHome} exact />*/}
                <PrivatePath path="/cardetails/:id" component={DealDetails} />
                <PrivatePath path="/cars" component={CarsPage} exact/>
                <PrivatePath path="/profile" component={Profile} exact />
                <PrivatePath component={HandleLoan} path="/loanpage/:id" />
                <PrivatePath component={AppliedLoan} path="/appliedloan" />
                <PrivatePath path="/profile" component={Profile} exact />
                
                <PrivatePath component={DealerHome} path="/dealerpage" />
                <PrivatePath component={AddCar} path="/addCar" />
                <PublicPath path="/login" component={LoginPage} exact /> 
                
                <AdminPath path="/admin" component={AdminHome} exact />
                <AdminPath path="/profile/:id" component={AdminProfileView} exact />
                 
                <Route component={HomePage} path="/" exact />
                {/* <PublicPath component={HeroPage} path="/" exact /> */}
                <Route component={NotFoundPage} />
            </Switch>
           
        </div>
        </BrowserRouter>
    )
export default AppRouter;




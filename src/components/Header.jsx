import React from 'react';
import {Link} from 'react-router-dom';
import {logout} from './Auth.js';
import {history} from '../routers/AppRouter.jsx';
import '../style/header.css'
import { NavLink } from "react-router-dom";
//import gal1 from "../images/gal1.jpg";
import logo from "../images/logo.jpg";
import '../css/HomePageStyle.css';
import { isLogin } from '../components/Auth';

import { Button, Container, Row, Col, Carousel } from "reactstrap";
export default (props) =>{ 
    
    const handleLogout = () => {
        logout();
        localStorage.clear();
    }
    return (
    <header>
            {/*<div id="headerMainBackground" style ={{display:"flex", flexDirection:"row", gap:"10px"}}>
                <Link style={{textDecoration:"none",color:"red"}} className="header__title" to="/">
                    <div style={{padding:"5%"}}><img src={require(`./dbsLogo.png`).default} style={{width:"40%",height:"20%"}} alt="DBS logo"/><h3>Digital Bank</h3></div>
                </Link>
                <Link to="/profile">
                    <h5 style={{position:"fixed",right:"20px",top:"60px",color:"#909090"}}>Profile</h5>
                </Link>
                <button className="logoutLblPos" style={{height:"40px",width: "60px"}} onClick={() => handleLogout()}>Logout</button>
    </div>*/}
    <div className="container-fluid nav_bg">
    <div className="row">
      <div className="col-10 mx-auto">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <img className="logoresize" src={logo} />
            <NavLink className="navbar-brand" to="/">
              Digital Bank
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    
                    exact
                    className="nav-link"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                  <span />
                </li>
                <li className="nav-item">
                  <NavLink
                    
                    className="nav-link"
                    to="/cars"
                  >
                    Cars
                  </NavLink><span />
                </li>

                {/*<li className="nav-item">
                  <NavLink
                    
                    className="nav-link"
                    to="/gallary"
                  >
                    Gallary
                  </NavLink><span /><span />
                </li>*/}
                <li>
                <NavLink
                    
                    className="nav-link"
                    to="/profile"
                  >
                    Profile
                  </NavLink><span /><span />
                </li>

            {isLogin()?
            (<li className="nav-item">
                <NavLink 
                  className="nav-link "
                  onClick={()=>handleLogout()}
                  to="/"
                >
                  Logout
                </NavLink>
              
              </li>):
                (<li className="nav-item">
                  <NavLink 
                    className="nav-link "
                    
                    to="/login"
                  >
                    Login
                  </NavLink>
                
                </li>)}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
       
    </header>
);
}
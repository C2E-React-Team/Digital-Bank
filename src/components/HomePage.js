import React from 'react';

//import web from "../images/carill1.svg";
import { NavLink } from "react-router-dom";
//import gal1 from "../images/gal1.jpg";
import logo from "../images/logo.jpg";
import '../css/HomePageStyle.css';

import { Button, Container, Row, Col, Carousel } from "reactstrap";

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.onClickCustomerButton=this.onClickCustomerButton.bind(this);
        this.onClickDealerButton=this.onClickDealerButton.bind(this);
        this.onClickAdminButton=this.onClickAdminButton.bind(this);
    }

    onClickCustomerButton(){
        localStorage.setItem("roleName","Customer");
        this.props.history.push("/login");
    }

    onClickDealerButton(){
        localStorage.setItem("roleName","Dealer");
        this.props.history.push("/login");
    }
   
    onClickAdminButton(){
        localStorage.setItem("roleName","Admin");
        this.props.history.push("/login");
    }
    render(){
        return(
            <div>
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
    
                        <li className="nav-item">
                          <NavLink
                            
                            className="nav-link"
                            to="/properties"
                          >
                            Properties
                          </NavLink><span /><span />
                        </li>
                        <li className="nav-item">
                          <NavLink
                            
                            className="nav-link"
                            to="/gallary"
                          >
                            Gallary
                          </NavLink><span /><span />
                        </li>
                        <li>
                        <NavLink
                            
                            className="nav-link"
                            to="/profile"
                          >
                            Profile
                          </NavLink><span /><span />
                        </li>
    
    
                        <li className="nav-item">
                          <NavLink 
                            onClick={this.onClickCustomerButton}
                            className="nav-link "
                            to="/login"
                          >
                            Login
                          </NavLink>
                        
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        
    
    
    
    
    
    
          <section id="header" className="d-flex align-items-center">
            <div className="container-fluid ">
              <div className="row">
                <div className="col-10 mx-auto">
                  <div className="row">
                    
    
                    <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 header-img">
                      <img
                        src={logo}
                        className="img-fluid animated"
                        alt="Commom img"
                      />
                    </div>
    
    
                    <div className="align-items-center col-lg-6 order-1 order-lg-2 d-flex justify-content-center flex-column">
                      <h1>
                        <span/> <span/><span/>Deal of the month
                        </h1>
                        <h1>
                       
                        <strong className="brand-name"> DIGITAL BANK </strong>
                      </h1>
                      <h2 className="page-section__paragraph">
                      <text>{`   `}</text>Get 130% of the car value as loan, and repay in upto 6 years! 
      
                      </h2>
                      
                    </div> 
    
    
    
                  </div>
                </div>
              </div>
            </div>
          </section>
    
    
    
    
    
       
    
    
    
    
    
          <section className="slant hideme">
    
                            <button className= "btnpos1 btn-grad">
    Show cars</button>
    <button className= "btnpos2 btn-grad">
    Show Properties</button>
    </section>
    
    
    
    
    
    
    
    
        <section className="section section-shaped">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-md">
                <Row className="justify-content-between align-items-center">
                  <Col className="mb-5 mb-lg-0" lg="5">
                    <h1 activeStyle={{color:'red'}}>
                      Most Viewed
                    </h1>
                    <p className="lead text-black mt-4 page-section__paragraph">
                    The Koenigsegg Regera is a car that 
                    is luxurious as well as insanely fast. 
                    There's little compromise in creature comfort. 
                    </p>
                    
                  </Col>
                  <Col className="mb-lg-auto" lg="6">
                    <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
                      
    
    
        <img
          className="d-block w-100"
          src={logo}
          alt="Third slide"
        />
    
       
    
    
    
                    </div>
                  </Col>
                </Row>
              </Container>
             
          
            </section>
    
    
    
    
    
    
    <div className="cont">
            <section className="slider">
              <div className="page-section text-center">
                <h2 className="page-section__title">WHAT OUR CLIENTS SAY?</h2>
                <p className="page-section__paragraph"> All comments/reviews are moderated and will be approved at the sole discretion of DBS Bank. magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
                      </p>
                </div>
                </section>
                </div>
    
    
    
                <footer className="w-100 bg-light text-center">
            <p></p>
            <p>© 2020 Digital Bank DBS. All Rights Reserved | Terms and Conditions</p>
    
          </footer> 
            </div>
        );
    }
}








export default HomePage;
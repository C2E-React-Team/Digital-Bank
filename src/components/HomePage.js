import React from 'react';

import web from "../images/carill2.jpg";
import { NavLink, Link } from "react-router-dom";
//import gal1 from "../images/gal1.jpg";
import logo from "../images/logo.jpg";
import slide1 from "../images/sl1.jpg";
import slide2 from "../images/sl2.jpg";
import slide3 from "../images/sl3.jpg";
import card1 from "../images/card1.jpg";
import card2 from "../images/card2.png";
import card3 from "../images/card3.png";
import '../css/HomePageStyle.css';
import { isLogin } from '../components/Auth';
import {logout} from './Auth.js';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/styles';
import {Button} from '@material-ui/core'
import { Container, Row, Col, UncontrolledCarousel } from "reactstrap";

const theme = createMuiTheme({
 
palette: {
  primary: {
    main: 'rgb(255, 51, 51)'
  }
},

shape: {
  borderRadius: 30
}

});






const items = [
  {
    src: slide1,
    
    altText: 'Slide 1'
    
    
  },
  {
    src:
      slide2,
    altText: 'Slide 1'
    
  },
  {
    src:
      slide3,
    altText: 'Slide 1'
    
  }
];


const handleLogout = () => {
  logout();
  localStorage.clear();
}



class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.onClickCustomerButton=this.onClickCustomerButton.bind(this);
        this.onClickDealerButton=this.onClickDealerButton.bind(this);
        this.onClickAdminButton=this.onClickAdminButton.bind(this);
    }
    // componentDidMount(){
    //   localStorage.clear(); Done once Logged out
    // }

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
            <div className="homeSize">
            <div className="container-fluid nav_bg">
            <div className="row">
              <div className="col-10 mx-auto">
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
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
                            className="nav-link mr-3"
                            aria-current="page"
                            to="/"
                          >
                            HOME
                          </NavLink>
                          <span />
                        </li>
                        <li className="nav-item">
                          <NavLink
                            
                            className="nav-link mr-3"
                            to="/cars"
                          >
                            CARS
                          </NavLink><span />
                        </li>
    

                       {/* <li className="nav-item">
                          <NavLink
                            
                            className="nav-link"
                            to="/gallary"
                          >
                            Gallary
                          </NavLink><span /><span />
        </li>*/}
                        <li>
                        <NavLink
                            
                            className="nav-link mr-3"
                            to="/profile"
                          >
                            PROFILE
                          </NavLink><span /><span />
                        </li>
    
    
                        {isLogin()?
                          (<li className="nav-item">
                              <NavLink 
                                className=" nav-link"
                                onClick={()=>handleLogout()}
                                to="/"
                              >
                                <div className="logcolor">LOGOUT</div>
                                
                              </NavLink>
                            
                            </li>):
                              (<li className="nav-item">
                                <NavLink 
                                  className="nav-link"
                                  
                                  to="/login"
                                >
                                  <div className="logcolor">LOGIN</div>
                                  
                                </NavLink>
                              
                              </li>)}
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
                        src={web}
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
                      <text>{`   `}</text>Get 80% of the car value as loan, and repay in upto 6 years! 
      
                      </h2>
                      
                    </div> 
    
    
    
                  </div>
                </div>
              </div>
            </div>
          </section>
    
    </div>
    
    
    
          
    
          
    
            
    <section className="slant1 hideme">   {/*<div className="red-line"></div>*/} </section>
    
          {/*<section className="slant1 hideme">
    
                            <button className= "btnpos1 btn-grad">
    Show cars</button>
    <button className= "btnpos2 btn-grad">
    Show Properties</button>
                        </section>*/}
    
    
    
    
    
    
    
              <section>
              
              <div className=" carousel-bg ">
              
                <Row className="justify-content-between align-items-center">
                  <Col >
                    <p className=" text-black  page-section__title text-center">
                      Most Viewed
                    </p>
                    <p className=" text-black  page-section__paragraph">
                    The Koenigsegg Regera is a car that 
                    is luxurious as well as insanely fast. 
                    There's little compromise in creature comfort. 
                    </p>
                    <div className=" text-center" >
                      <NavLink  className="text-center" to="/cars">
                        
                        <button className="btn-grad">Show more</button>
                        
                        </NavLink>
                      
                    </div>
                  
                  </Col>
                  <Col>
                    
                    <UncontrolledCarousel className="slidesize overflow-hidden" items={items} />
       {/* <img className="slidesize"
          
          src={logo}
          alt="Third slide"
                        />    */}
                    
                  </Col>
                </Row>
              </div>
              <section className="slant2 hideme">
    
  
</section>
          
            </section>
    
    
    
    
    
            

<section className="mt-5 ml-5 mr-5">
            <div className="card-deck">
              <Row>
                <Col>
  <div className="card">
  <div className="align-items-center">
  <img className="cardresize mb-3 mt-2" src={card1}/> </div>
    <div className="card-body">
      <h5 className="font-weight-bold">Less interest rates</h5>
      <p className="card-paragraph">Get attractive interest rates as low as 9% onwards on your next car loan.</p>
      
    </div>
  </div>
  </Col><Col>
  <div className="card">
    <div className="align-items-center">
  <img className="cardresize mb-3 mt-2" src={card2}/> </div>
    <div className="card-body">
      <h5 className="font-weight-bold">Paperless loan</h5>
      <p className="card-paragraph">It's easy, instant and paperless. No collateral and it's <strong>secure</strong>.</p>
      
    </div>
  </div>
  </Col><Col>
  <div className="card">
  <div className="align-items-center">
  <img className="cardresize mb-3 mt-2" src={card3}/> </div>
    <div className="card-body">
      <h5 className="font-weight-bold">Super Flexible</h5>
      <p className="card-paragraph">Repay the car loan with our flexible EMI options conveniently.</p>
      
    </div>
  </div>
  </Col>
  </Row>
</div>
</section>





    <div className="cont bg-white">
            <section className="slider">
              <div className="page-section text-center">
                <h2 className="page-section__title">WHAT OUR CUSTOMERS SAY?</h2>
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
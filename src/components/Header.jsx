import React from 'react';
import {Link} from 'react-router-dom';
import {logout} from './Auth.js';
import {history} from '../routers/AppRouter.jsx';
import '../style/header.css'
export default (props) =>{ 
    
    const handleLogout = () => {
        logout();
        window.location.reload(false);
    }
    return (
    <header>
            <div id="headerMainBackground" style ={{display:"flex", flexDirection:"row", gap:"10px"}}>
                <Link style={{textDecoration:"none",color:"red"}} className="header__title" to="/">
                    <div style={{padding:"5%"}}><img src={require(`./dbsLogo.png`).default} style={{width:"40%",height:"20%"}} alt="DBS logo"/><h3>Digital Bank</h3></div>
                </Link>
                <Link to="/profile">
                    <h3 style={{position:"fixed",right:"20px",top:"40px",color:"#909090"}}>Profile</h3>
                </Link>
                <button className="logoutLblPos" style={{height:"40px",width: "60px"}} onClick={() => handleLogout()}>Logout</button>
            </div>
       
    </header>
);
}
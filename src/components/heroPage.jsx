import React from 'react'
import HomePage from '../components/HomePage.js'
class HeroPage extends React.Component{
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
                
                <div style={{backgroundColor:"red",color:"white", border:"solid",width:"30%", textAlign:"center",borderBlock:"black",transform:"translateX(160%)",marginTop:"6%"}}>
                <p>Please choose your role</p><br/>
                <button onClick={this.onClickCustomerButton}>Customer Login</button>
                <button onClick={this.onClickDealerButton}>Dealer Login</button>
                <button onClick={this.onClickAdminButton}>Admin Login</button>
                </div>
            </div>
        );
    }
}
export default HeroPage;
import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import '../css/index_style.css';

const localName = "customerDetails";

class Profile extends React.Component{
    constructor(props){
        super(props);
        // this.state={
        //     clientId:'',
        // };
        // this.onClickLoginButton=this.onClickLoginButton.bind(this);
        // this.updateClientId=this.updateClientId.bind(this);
     }
    
    // updateClientId(e){
    //     this.setState({clientId:e.target.value});
    //     console.log(`user:${this.state.clientId}`);
    // }
    // updatePassword(e){
    //     this.setState({password:e.target.value});
    //     console.log(`passw: ${this.state.password}`);
    // }

    // onClickLoginButton(){
    //     if(this.state.clientId){
    //         console.log(this.state.clientId);
    //         // console.log(this.state.password);
    //         let clientVar=this.state.clientId;
    //         // let passwordVar=this.state.password;

    //         let flag=true;
    //         for(let i=0;i<this.props.userData.length;i++){
    //             if(this.props.userData[i].clientId == clientVar){
    //                 console.log("Success"); 
    //                 localStorage.setItem("clientId",clientVar);
    //                 let a=localStorage.getItem("clientId");
    //                 console.log(`local item: ${a}`);
    //                 alert(`Welcome ${clientVar}`);
    //                 //Send the login data to the local storage
    //                 flag=!flag;
    //                 break;
    //            }
    //         }
    //         if(flag){
    //             alert("Enter correct");
    //             console.log("NOT");
    //         }
    //         // this.props.userData.forEach((user)=>{
    //         //     console.log(`user.clid:${user.clientId}`);
    //         //     console.log(`user.pwd:${user.password}`);
    //         //     if(user.clientId == clientVar && user.password == passwordVar){
    //         //         console.log("Sucess");
    //         //         flag=!flag;
    //         //         break;
    //         //     }
    //         // });
    //         // if(flag){
    //         //     console.log("Not Success");
    //         //     this.props.history.push("/");
    //         // }


            
    //         // if(props.userData){
    //         //     alert("Login Successful");
    //         // }
    //         // else{
    //         //     alert("Login Not Successful");
    //         // }

    //     }
    //     else{
    //         console.log("input field is empty");
    //         this.props.history.push("/");
    //     }
    // }

    // onClickSetPasswordButton(){
        
    //     //redirect to set password page
    //     this.props.history.push('./setpassword');
    // }
    // onClickForgotPasswordButton(){
    //     //redirect to forgot password page
    //     this.props.history.push('./forgotpassword');

    // }

    render(){
        return(
            
                <div className="div3">       
            <center><br/><br/>
            <div className="card">
                <div>
                    <h2>My Profile</h2>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRerBR3bfynBVdF2gjoii3i_8yI4KOdK5_cxw&usqp=CAU"></img>
           <br/>  
        <h3>Customer ID: {JSON.parse(localStorage.getItem(localName)).customerId}</h3>
        <div className="title">Sex : {JSON.parse(localStorage.getItem(localName)).sex}<br />
        Marital Status : {JSON.parse(localStorage.getItem(localName)).maritalStatus}<br />
        Income : {JSON.parse(localStorage.getItem(localName)).income} SGD <br />
        Eligible EMI : {JSON.parse(localStorage.getItem(localName)).eMICapacity} SGD</div><br />

        <Link className="button_profile" to="/appliedloan">
                    <h3> View Applied Loans</h3>
                </Link><br/><br /><br />
                </div></div>
        </center></div>
            
        );
    }
}

const  mapStateToProps = (state) =>{
    return{
      userData:state.loginData
    };
  }
  
  export default connect(mapStateToProps)(Profile);


{/* <input style={{ marginTop:"20%",marginBottom:"5%"}} type="text" onChange={this.updateClientId} /><br/>   */}
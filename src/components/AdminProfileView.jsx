import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import '../css/index_style.css';
import axios from 'axios';

const USERS_REST_API_PREFIX = 'http://localhost:8080/customers/';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            userData:{}
        }
    }

    componentWillMount(){
        axios.get(USERS_REST_API_PREFIX+this.props.match.params.id).then((response)=>{
            console.log(response.data);
           // this.props.dispatch(loginUser(response.data));
            this.setState({userData:response.data});
            this.setState(()=>({loading:false}));
            })
    .catch(error => {
        console.log(error);
    })
    
    }

    render(){
        return(
            
                <div className="div3">       
            <center><br/><br/>
            <div className="card">
                <div>
                    <h2>My Profile</h2>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRerBR3bfynBVdF2gjoii3i_8yI4KOdK5_cxw&usqp=CAU"></img>
           <br/>  
        <h3>Customer ID: {this.state.userData.customerId}</h3>
        <div className="title">Sex : {this.state.userData.sex}<br />
        
        Employment : {this.state.userData.selfEmployed}<br />
        Dependents : {this.state.userData.dependents}<br />
        Income : {this.state.userData.income} SGD <br />
        Eligible EMI : {this.state.userData.eMICapacity} SGD</div><br />

        <br/><br /><br />
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
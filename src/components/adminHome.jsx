import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../css/index_style.css';
import axios from 'axios';
import {appliedLoans} from '../actions/Loan';
import { red } from '@material-ui/core/colors';
//import Demo from './Demo.js';
import { Spinner } from 'react-bootstrap';
import {Link} from 'react-router-dom';




class AdminHome extends Component{
constructor(props)
{
    super(props);

this.state = { 
    loading:true,
    status:"Applied"
   // value:''
    }; 
 
}
/*status(){
if(this.state.status =="Applied"){
    this.setState({value:'active'});
}*/
    


componentWillMount(){
    const CUSTOMER_LOANS_REST_API_URL = "http://localhost:8080/loans";
    axios.get(CUSTOMER_LOANS_REST_API_URL).then((response)=>{
        console.log("in get res",response);
        this.props.dispatch(appliedLoans(response.data));
        this.setState(()=>({loading:false}));
        });
}

onApproveLoan(refId){
    this.setState(()=>({loading:true}));
    axios.delete('http://localhost:8080/loans/approve/'+refId)
      .then((response)=> {
        console.log(response);
        const CUSTOMER_LOANS_REST_API_URL = "http://localhost:8080/loans";
     axios.get(CUSTOMER_LOANS_REST_API_URL).then((response)=>{
         console.log("in get after del",response);
         this.props.dispatch(appliedLoans(response.data));
         this.setState(()=>({loading:false}));
         });
    
    
    });
     
}

onRejectLoan(refId){
    this.setState(()=>({loading:true}));
    axios.delete('http://localhost:8080/loans/reject/'+refId)
      .then((response)=> {
        console.log(response);
        const CUSTOMER_LOANS_REST_API_URL = "http://localhost:8080/loans";
     axios.get(CUSTOMER_LOANS_REST_API_URL).then((response)=>{
         console.log("in get after del",response);
         this.props.dispatch(appliedLoans(response.data));
         this.setState(()=>({loading:false}));
         });
    
    
    });
     
}

render(){
    return(
        <center><br /><br />
            <div className="card5">{
            (this.state.loading===true)? (
                <div>
          <Spinner variant="danger" animation="border" />
          </div>
              ) :
        (<div >    
    <h3>Loan Details</h3>
    <h3>Status</h3>
    <center>
    <div className="select-style">
    <select id="statusOption" style={{padding:"5%",color:'black'}}
                    className="select"
                    value={this.state.status} 
                    onChange={(e)=>{
                        this.setState({status:e.target.value});
                    }}
                    >
                        
                        <option style={{padding:"5%", color:'blue'}} value="Applied">Applied</option>
                        <option style={{padding:"5%", color:'green'}} value="Approved">Approved</option>
                        <option style={{padding:"5%", color:'red'}} value="Rejected">Rejected</option>
                    </select>
</div></center>

    <h5><br/>
   
    <center>
        <table className="customers" >
            <tr>
            <th>Customer Id</th><th>Car Name</th><th>Car Cost</th><th>Loan Amount Requested</th><th>Tenure</th>
                <th>EMI</th><th>Submitted Document</th><th>Reference Id</th><th>Status</th>
            </tr>
       {  
        this.props.data.filter((loan)=>loan.status==this.state.status).length === 0 ? (
      <div className="list-item list-item--message">
        <span>No {this.state.status} Loans</span>
      </div>
    ):
    
       
               
            
            
            (this.props.data.filter((loan1)=>loan1.status==this.state.status).map((loan)=>( 
    
                <tr>
                <td><Link to={"/profile/"+loan.customerId}>{loan.customerId}</Link></td>
                <td>{loan.carName} </td><td>INR {loan.carCost}</td><td>INR {loan.loanAmount} </td><td>{loan.tenure} Months</td>
                <td>INR {loan.emi}</td><td>{loan.selectedFile}</td> <td>{loan.refId}</td>
                <td>{console.log("refID",loan)}
      {(loan.status!="Approved")?(<button  onClick={()=>this.onApproveLoan(loan.refId)} className="button-accept">Approve</button>):(<p></p>)}
      {(loan.status!="Rejected")?(<button  onClick={()=>this.onRejectLoan(loan.refId)} className="button-reject">Reject</button>):(<p></p>)}
    </td>
                </tr>)))
            
                
            
       
} </table></center>
        {/*<button className="button-appliedloan"  onClick={()=>this.status()} >status</button>
         <div className="container">
          <ul className="progressbar">
            <li className={this.state.value}>Applied</li>
            <li>Processing</li>
            <li>Accepted/Rejected</li>
             </ul>
    </div>*/}
    <br/><br/><br/>
    
    
       </h5>
    </div>)}</div>
    </center>
 )};
}

const mapStateToProps = (state) => {
    return {
    data :  state.loanData,
    
    }
}

export default connect(mapStateToProps)(AdminHome);
import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../css/index_style.css';
import axios from 'axios';
import {appliedLoans} from '../actions/Loan';
import { red } from '@material-ui/core/colors';
//import Demo from './Demo.js';

const localName = "customerDetails";



class AdminHome extends Component{
constructor(props)
{
    super(props);

this.state = { 
    loading:true,
    status:'Applied'
   // value:''
    }; 
 
}
/*status(){
if(this.state.status =="Applied"){
    this.setState({value:'active'});
}*/
    


componentWillMount(){
    const CUSTOMER_LOANS_REST_API_URL = "http://localhost:8080/loans/";
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
        const CUSTOMER_LOANS_REST_API_URL = "http://localhost:8080/loans/get/"+JSON.parse(localStorage.getItem(localName)).customerId;
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
        const CUSTOMER_LOANS_REST_API_URL = "http://localhost:8080/loans/get/"+JSON.parse(localStorage.getItem(localName)).customerId;
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
            <div className="card">{
            (this.state.loading===true)? (
                <div className="list-item list-item--message">
                  <span>Loading</span>
                </div>
              ) :
        (<div >    
    <h2>Applied Loan Details</h2>
    <h2>Status</h2>
    <center>
    <div className="select-style">
    <select id="statusOption" style={{padding:"3%",color:"#909090"}}
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
    <h3><br/>
    
       {  
        this.props.data.filter((loan)=>loan.status==this.state.status).length === 0 ? (
      <div className="list-item list-item--message">
        <span>No {this.state.status} Loans</span>
      </div>
    ): (this.props.data.filter((loan)=>loan.status==this.state.status).map((loan)=>(<div key={loan.refId}>
        Reference ID:{console.log("refID",loan),loan.refId} <br />
        
        <table className="customers">
        <tr>
                <td>Customer Id</td>
                <td>INR {loan.customerId}</td>
            </tr>
            <tr>
                <td>Car Name</td>
                <td>{loan.carName} </td>
                </tr>
        <tr>
                <td>Car Cost</td>
                <td>INR {loan.carCost}</td>
            </tr>
            <tr>
                <td>Loan Amount Requested</td>
                <td>INR {loan.loanAmount} </td>
                </tr>
                <tr>
                <td>Loan Tenure Period</td>
                <td>{loan.tenure} Months</td>
                </tr>
                <tr>
                <td>EMI</td>
                <td>INR {loan.emi}</td>
                </tr>
                <tr>
                <td>Submitted Document</td>
                <td>{loan.selectedFile}</td>
                </tr>  
        </table>
        {/*<button className="button-appliedloan"  onClick={()=>this.status()} >status</button>
         <div className="container">
          <ul className="progressbar">
            <li className={this.state.value}>Applied</li>
            <li>Processing</li>
            <li>Accepted/Rejected</li>
             </ul>
    </div>*/}
      <button  onClick={()=>this.onApproveLoan(loan.refId)} className="button-accept">Approve</button>
      <button  onClick={()=>this.onRejectLoan(loan.refId)} className="button-reject">Reject</button>
    <br/><br/><br/>
    
    </div>)))
       }</h3>
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
import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../css/index_style.css';
import axios from 'axios';
import {appliedLoans} from '../../actions/Loan';
import { red } from '@material-ui/core/colors';

const localName = "customerDetails";



class AppliedLoan extends Component{
constructor(props)
{
    super(props);

this.state = { 
    loading:true,
    status:'Applied',
    value:''
    }; 
 
}
status(){
if(this.state.status =="Applied"){
    this.setState({value:'active'});
}
    
}

componentWillMount(){
    const CUSTOMER_LOANS_REST_API_URL = "http://localhost:8080/loans/get/"+JSON.parse(localStorage.getItem(localName)).customerId;
    axios.get(CUSTOMER_LOANS_REST_API_URL).then((response)=>{
        console.log("in get res",response);
        this.props.dispatch(appliedLoans(response.data));
        this.setState(()=>({loading:false}));
        });
}

onLoanWithdraw(refID){
    this.setState(()=>({loading:true}));
    axios.delete("http://localhost:8080/loans/delete/"+refID)
     .then(res => {
         
        console.log("in delete res",res);
        
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
        <center>
            <div className="div4">{
            (this.state.loading===true)? (
                <div className="list-item list-item--message">
                  <span>Loading</span>
                </div>
              ) :
        (<div >    
    <h2>Applied Loan Details</h2>
       <h3> Client ID: <p>{JSON.parse(localStorage.getItem(localName)).customerId}</p><br/>
    
       {  
        this.props.data.length === 0 ? (
      <div className="list-item list-item--message">
        <span>No Applied Loans</span>
      </div>
    ): (this.props.data.map((loan)=>(<div key={loan.refId}>
        Reference ID:{console.log("refID",loan),loan.refId} <br />
        
        <table className="customers">
        <tr>
                <td>Car Cost</td>
                <td>INR {loan.carCost}</td>
            </tr>
            <tr>
                <td>Loan Amount Requested</td>
                <td>INR {loan.loanAmount} </td>
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
        <button className="button-appliedloan"  onClick={()=>this.status()} >status</button>
         <div className="container">
          <ul className="progressbar">
            <li className={this.state.value}>Applied</li>
            <li>Processing</li>
            <li>Accepted/Rejected</li>
             </ul>
      </div>
      <button  onClick={()=>this.onLoanWithdraw(loan.refId)} className="button">Withdraw</button>
         
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

export default connect(mapStateToProps)(AppliedLoan);


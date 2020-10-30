import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../css/index_style.css';
import axios from 'axios';
import {appliedLoans} from '../../actions/Loan';

const localName = "customerDetails";



class AppliedLoan extends Component{
constructor(props)
{
    super(props);

this.state = { 
    loading:true
    }; 
 
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
        <center>{
            (this.state.loading===true)? (
                <div className="list-item list-item--message">
                  <span>Loading</span>
                </div>
              ) :
        (<div className="div1">        
    <h2 className="h2_heading">Applied Loan Details</h2>
       <h3> Client ID: <p>{JSON.parse(localStorage.getItem(localName)).customerId}</p><br/>
    
       {  
        this.props.data.length === 0 ? (
      <div className="list-item list-item--message">
        <span>No Applied Loans</span>
      </div>
    ): (this.props.data.map((loan)=>(<div key={loan.refId}>
        Reference ID:{console.log("refID",loan),loan.refId} <br />
        Car Cost :INR{loan.carCost} <br />
        Car Name :{loan.carName} <br />
        Loan Tenure Period :{loan.tenure} Months
    <br />Loan Amount you have requested for : INR {loan.loanAmount}<br/>
    You need to pay EMI INR {loan.emi}<br />
    submitted document is {loan.selectedFile}<br/>
    <button onClick={()=>this.onLoanWithdraw(loan.refId)}>Withdraw</button>
    <br/><br/><br/>
    
    </div>)))
       }</h3>
    </div>)}
    </center>
 )};
}
const mapStateToProps = (state) => {
    return {
    data :  state.loanData,
    
    }
}

export default connect(mapStateToProps)(AppliedLoan);
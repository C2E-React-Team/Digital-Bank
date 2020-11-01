import React, {Component,useEffect} from 'react';
import {connect} from 'react-redux';
import '../../css/index_style.css';
import axios from 'axios';
import {appliedLoans} from '../../actions/Loan';
import { red } from '@material-ui/core/colors';

const localName = "customerDetails";

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Spinner } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Applied', 'Processing', 'Approved'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Applied';
    case 1:
      return 'Processisng';
    case 2:
        return 'Approved';
    case 3:
        return 'Rejected'
    default:
      return 'Rejected';
  }
}

export function HorizontalLinearStepper(e) {

  useEffect(() => {
    handleNext();
  }, []);


    console.log(e);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();


  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
      var st=e;
      if(st.e==="Applied" && activeStep === steps.length - 3){
        
  let newSkipped = skipped;
  if (isStepSkipped(activeStep)) {
    newSkipped = new Set(newSkipped.values());
    newSkipped.delete(activeStep);
  }

  setActiveStep((prevActiveStep) => prevActiveStep + 1);
  setSkipped(newSkipped);

}
      if(st.e==="Approved"){
          console.log("yess");
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 3);
    setSkipped(newSkipped);

}
if(st.e=="Rejected"){
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
}

  };


  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - Loan Approved.
            </Typography>
            
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
             {/* <Button
                variant="contained"
                color="primary"
                
                onClick={handleNext}
                className={classes.button}
              >{'Get Status'}
             </Button>*/}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


class AppliedLoan extends Component{
constructor(props)
{
    super(props);

this.state = { 
    loading:true,
    //status:"Rejected",
    //status:'Applied',
   // value:''
    }; 
 
}
/*status(){
if(this.state.status =="Applied"){
    this.setState({value:'active'});
}*/
    


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
              <div>
              <Spinner variant="danger" animation="border" />
              </div>
              ) :
        (<div >    
    <h2>Applied Loan Details</h2>
       <h3> Customer ID: {JSON.parse(localStorage.getItem(localName)).customerId}<br/>
    
       {  
        this.props.data.length === 0 ? (
      <div className="list-item list-item--message">
        <span>No Applied Loans</span>
      </div>
    ): (this.props.data.map((loan)=>(<div key={loan.refId}>
        
        
        <table className="customers">
        <tr>
                <td>Car Name</td>
                <td>{loan.carName}</td>
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
                <td>EMI</td>
                <td>INR {loan.emi}</td>
                </tr>
                <tr>
                <td>Submitted Document</td>
                <td>{loan.selectedFile}</td>
                </tr>  
                <tr><td>Reference Id</td>
                <td>
                {console.log("refID",loan),loan.refId}
                </td>
                </tr>
        </table>
        {/*<button className="button-appliedloan"  onClick={()=>this.status()} >status</button         <div className="container">
          <ul className="progressbar">
            <li className={this.state.value}>Applied</li>
            <li>Processing</li>
            <li>Accepted/Rejected</li>
             </ul>
    </div>*/}
      <button  onClick={()=>this.onLoanWithdraw(loan.refId)} className="button">Withdraw</button>
     
         <HorizontalLinearStepper e={loan.status}/>
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


import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDealById} from '../../selectors/cars.js'
import {getCarDeals} from '../../services/carService';
import {setDeals} from '../../actions/cars/deals';
import {appliedLoans} from '../../actions/Loan';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import '../../style/handleloan.css'
import { Spinner } from 'react-bootstrap';

const localName = "customerDetails";

class HandleLoan extends Component{
constructor(props)
{
    super(props);

this.state = { 
    selectedFile: null,
    loading:true,
    time:24,
    loanAmountdisplay:0,
    loanAmount_request:0,
    emi:0,
    showstore:false,
    uploadError:undefined,
    loanAmountError:undefined
    }; 
 
    this.onApply = this.onApply.bind(this);

}
componentWillMount(){
      
    getCarDeals().then((response) => {
      console.log("in response",response.data)
      this.props.dispatch(setDeals(response.data));
      this.setState(()=>({loading:false}));
      
    });
  }

	onFileChange = event => { 
    const file = event.target.files[0];
    if(file){
      if(file.name.split('.').pop() == "pdf" && file.size <= 10000000){
          this.setState({ selectedFile: event.target.files[0] }); 
        this.setState({uploadError:undefined})
      }    
      else
        this.setState({uploadError:"File extension should be pdf and size should be less than 10MB"})
    }
	}; 
	onFileUpload = () => { 
	const formData = new FormData(); 
	formData.append( 
		"myFile", 
		this.state.selectedFile, 
		this.state.selectedFile.name 
	); 
    console.log(this.state.selectedFile.name);
    console.log(JSON.parse(localStorage.getItem(localName)));

     
};

eligible(time){
    var p1,rate;
    if(time==24){
        rate=8/1200;
    }else if(time==36){
        rate=8.5/1200;
    }else if(time==48){
        rate=9/1200;
    }else{
        rate=9.5/1200;
    }
var emi = (parseFloat(JSON.parse(localStorage.getItem(localName)).eMICapacity)*54.27);
var t1=Math.pow((1+rate),time);
var t2=(t1-1)/t1;

p1=(emi*t2)/rate;
return p1;

}
loan(e){
var val = e.target.value;
this.setState({loanAmount_request:val});
if(val>this.state.loanAmountdisplay){
  this.setState({loanAmountError:"You cannot enter more than eligibility"});
}
else if(val<100000){
  this.setState({loanAmountError:"Amount cannot be less than 1 lakh"});
}
else{
  this.setState({loanAmountError:undefined})
} 
this.emiCal(e.target.value);
}
emiCal(principal){
  console.log("emifinalprin ",principal);
    this.setState({loanAmount_request:principal})
    var time=this.state.time;
    var rate;
    if(time==24){
        rate=8/1200;
    }else if(time==36){
        rate=8.5/1200;
    }else if(time==48){
        rate=9/1200;
    }else{
        rate=9.5/1200;
    }
    var emi;
    var t1=Math.pow((1+rate),time);
    var t2=t1/(t1-1);
    emi=(principal*rate*t2).toFixed(2);
    {this.setState({emi:emi})};
    console.log("emifinal ",emi);
   
}

/*loanCal(e){
    var time=e.target.value;
    var loanAmount=0;
    var emi = this.props.data[0].eligibleemi;
    if(time==24){
        loanAmount=emi*24;
    }else if(time==36){
        loanAmount=emi*36;
    }else if (time==48){
        loanAmount=emi*48;
    }else{
        loanAmount=emi*60;
    }
    {this.setState({loanAmount:loanAmount})};
    console.log(loanAmount);
    console.log(this.props.CarData);
    this.emiCal(e);
}*/
updatetime(e){
    this.setState({showstore:true});
    
    var time=e.target.value;
    {this.setState({time:time})};
    console.log(time);

    var principal = 0.8*this.props.CarData.price;

    var eligibleamount = this.eligible(time);
    console.log("principal" ,principal);
    console.log("eligible",eligibleamount);
    if(principal<eligibleamount){
        this.setState({loanAmountdisplay:principal});

    }else{
         this.setState({loanAmountdisplay:eligibleamount});
    }
    this.setState((state) => ({loanAmount_request:state.loanAmountdisplay.toFixed(0)}),()=>{
      this.emiCal(this.state.loanAmount_request);
    });
}

onApply(){
    
    const customerId=JSON.parse(localStorage.getItem(localName)).customerId;
    const emi=this.state.emi;
    const time = this.state.time;
    //this.setState({emi:emi});
    //console.log("my emi is ",emi);
    const loanAmount=this.state.loanAmount_request;
    //this.setState({loanAmount:loanAmount});
    const carCost=this.props.CarData.price;
    const carName=this.props.CarData.car_name;
    //this.setState({carCost:carCost});
    const selectedFile=this.state.selectedFile;
    //this.setState({selectedFile:selectedFile});

    const formData = new FormData(); 
	formData.append( 
		"uploadedFile", 
		this.state.selectedFile, 
  );
  formData.append(
    "model",
    JSON.stringify({
      customerId:customerId,
      loanAmount:loanAmount,
      emi,
      carCost:carCost,
      selectedFile:selectedFile.name,
      tenure:time,
      carName:carName
    })
  )
  
    if(selectedFile!= null &&
        loanAmount>0 &&
        emi>0){
            let ref_id="";
    axios.post('http://localhost:8080/loans/add',formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }})
      .then((response)=> {
        console.log(response);
        this.props.history.push(`/appliedloan`);
      })

      
    }
    else
    alert("Enter All Details");

 
}

fileData = () => { 
     
    if (this.state.selectedFile) { 
        
      return ( 
        <div> 
          <h6 style={{marginTop:"20px"}}>File Details:</h6> 
          <p>File Name: {this.state.selectedFile.name}</p> 
          <p>File Type: {this.state.selectedFile.type}</p> 
          <p> 
            Last Modified:{" "} 
            {this.state.selectedFile.lastModifiedDate.toDateString()} 
          </p> 
        </div> 
      );
    } 
     else { 
      return ( 
        <div> 
          <p className="para" style={{marginTop:"8px"}}>choose before pressing submit</p>
          </div> 
      ); 
    } 

  }; 

render(){
    return(
        
        <div className="bgdiv">
                <br></br>
                <br></br>
        <div className="handlediv">
        {
            (this.state.loading===true)? (
              <div>
              <Spinner variant="danger" animation="border" />
              </div>
              ) :
               

        (<form className="handle_form" onSubmit={e=>e.preventDefault()}>          
    <div className="heading">My Details</div>
    <br></br>
    <Grid container spacing={3}>
        <Grid item xs={8} sm={5}>
          <TextField
            readonly
            id="clientid"
            name="Client Id"
            label="Client Id"
            value={JSON.parse(localStorage.getItem(localName)).customerId}
            color="secondary"
            size="medium"
          />
        </Grid>
        <Grid item xs={8} sm={5}>
          <TextField
            readonly
            id="gender"
            name="gender"
            label="Gender"
            value={JSON.parse(localStorage.getItem(localName)).sex}
            color="secondary"
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={8} sm={5}>
          <TextField
            readonly
            id="credithistory"
            name="credithistory"
            label="Credit History"
            value={JSON.parse(localStorage.getItem(localName)).creditHistory}
            color="secondary"
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={8} sm={5}>
          <TextField
            readonly
            id="emicapacity"
            name="emicapacity"
            label="Eligible EMI"
            value={(parseFloat(JSON.parse(localStorage.getItem(localName)).eMICapacity)*54.27)}
            color="secondary"
            autoComplete="given-name"
          />
        </Grid>
        </Grid>
        <br></br>
                <p className="para">You have selected <div className="heading2">{  this.props.CarData.car_name  }</div>
                   INR <p className="heading2" >{  this.props.CarData.price  }
                </p>from <p className="heading2" >{  this.props.CarData.dealer_name  }</p>
               </p>
                {/* <h6 className="heading3">Select Tenure</h6> */}
                <select className="dropdown" onChange={(e)=>this.updatetime(e)} required defaultValue="select time">
                    <option value="select time"  disabled>Select Tenure</option>
                    <option value="24">24 months</option>
                    <option value="36">36 months</option>
                    <option value="48">48 months</option>
                    <option value="60">60 months</option>
                </select>
                <br /><br />
                <div style={{display:this.state.showstore ? 'block': 'none'}}>
       
                <p className="para">Your Eligible loan amount is INR <div className="heading2">{this.state.loanAmountdisplay.toFixed(2)}</div></p>
                <Grid item xs={8} sm={5} style={{marginLeft:"55px"}}>
                <TextField
                    readonly
                    id="loanamount"
                    name="quantity"
                    label="Loan Amount"
                    value={this.state.loanAmount_request}
                    color="secondary"
                    onChange={(e)=>this.loan(e)}
                    autoComplete="given-name"
                    type="number"
                    fullWidth
                  //  helperText = {this.state.loanAmount_request<100000 ? "" : ''}
                  //   error={this.state.loanAmount_request<100000}
                />
        </Grid>
        {this.state.loanAmountError && (<div className="error1"><br></br>{this.state.loanAmountError}</div>)}
              {/* <h4><label>Enter your Loan Amount :</label></h4>
                <input type="number" name="quantity" onChange={(e)=>this.loan(e)} value={this.state.loanAmount_request} required/> */}
                <br></br>
                
                <p className="para">You need to pay EMI INR <div className="heading2">{this.state.emi}</div></p>
                <p className="para">Downpayment INR <div className="heading2">{this.props.CarData.price-this.state.loanAmount_request}</div></p>
            {/* <h4>For your car to buy, bank will provide loan of INR {this.state.loanAmount_request} and you ned to pay INR {this.props.CarData.price-this.state.loanAmount_request}</h4> */}
            <p className="para1"> 
			Upload proof of deposit :
			</p>
			<div style = {{display:"flex", flexDirection:"row", gap:"0px", marginLeft:"55px"}} > 
            <input type="file" accept = "application/pdf" onChange={this.onFileChange} required/> <br />
				{/* <input style={{border:"2px solid grey"}} type="button" value="Upload!" onClick={this.onFileUpload}/> */}
			</div> 
		{this.fileData()}
    <div className="heading2">{this.state.uploadError}</div>{}
    <button className="button" disabled={this.state.uploadError || this.state.loanAmountError} type="submit" onClick={()=>this.onApply()} >Submit my request to bank</button></div>
    </form>
        )  }
    </div>
    <br></br>
                <br></br>
    </div>
   
 )};
}
const mapStateToProps = (state,props) => {
    return {
    CarData: getDealById(state.carDeals,props.match.params.id)
    }
}

export default connect(mapStateToProps)(HandleLoan);
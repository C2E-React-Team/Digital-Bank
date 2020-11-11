import React from 'react'
import {addCarDeal} from '../services/carService.js';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import axios from 'axios';
import '../style/handleloan.css';
import '../css/addcar-css.css';
class AddCar extends React.Component{
    constructor(props){
        super(props);

        this.state = { 
           carName:'',
           carPrice:0,
           brandName:'',
           mileage:'',
           seatingCapacity:0,
           type:'',
           engineDisplacement:'',
           selectedFile: null,
           uploadError:undefined
        }       
    }
onAdd(){
  const dealerName = JSON.parse(localStorage.getItem('customerDetails')).dealerid;

  const formData = new FormData(); 
	formData.append( 
		"uploadedImage", 
		this.state.selectedFile, 
  );
  formData.append(
    "model",
    JSON.stringify({
      brand_name: this.state.brandName,
      car_name: this.state.carName,
      mileage: this.state.mileage,
      engine_displacement: this.state.engineDisplacement,
      seating_capacity: this.state.seatingCapacity,
      type: this.state.type,
      image: this.state.selectedFile.name,
      price: this.state.carPrice,
      dealer_name: dealerName
    })
  )
  
    addCarDeal(formData).then((response)=> {
        console.log(response);
        alert('car added');
        this.props.history.push('/dealerpage');
      })
      .catch((error)=>{
        console.log(error);
        alert('Could not perform operation!!! Try Again')
      })
   
}

updateCarName(e){
  var carName=e.target.value;
    {this.setState({carName:carName})};
}
updateCarPrice(e){
  var carPrice=e.target.value;
    {this.setState({carPrice:carPrice})};
}

updateBrandName(e){
  var brandName=e.target.value;
    {this.setState({brandName:brandName})};
}

updateMilege(e){
  var mileage=e.target.value;
    {this.setState({mileage:mileage})};
}

updateSeatingCapacity(e){
  var seatingCapacity=e.target.value;
    {this.setState({seatingCapacity:seatingCapacity})};
}

updateEngineDisplacement(e){
  var engineDisplacement=e.target.value;
    {this.setState({engineDisplacement:engineDisplacement})};
}
updateType(e){
  var type=e.target.value;
    {this.setState({type})};
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
         {/* <p className="para" style={{marginTop:"8px",marginLeft:"250px"}}>choose before pressing post deal</p> */}
          </div> 
      ); 
    } 

  }; 

onFileChange = event => { 
    const file = event.target.files[0];
    console.log(file.type.split('/').pop());
    console.log(file.size);
    if(file){
      if(file.type.split('/')[0] == "image" && file.size <= 5000000){
        this.setState({ selectedFile: event.target.files[0] }); 
      this.setState({uploadError:undefined})
    }    
    else
      this.setState({uploadError:"Please choose an image of size less than 5MB"});
    }
	}; 
    render(){
        return(
          <div className="bgdiv">
          <br></br>
          <br></br>
          <div className="handlediv" >
            <div>
              <br></br>
                <div className="heading" style={{marginLeft:"90px"}}>Post New Deal</div>
               <form className="handle_form"onSubmit={e=>e.preventDefault()}>
              <Grid container spacing={3}>
        <Grid item xs={8} sm={5}>
          <TextField
            
            id="carName"
            name="text"
            label="Car Name"
           // value={JSON.parse(localStorage.getItem(localName)).customerId} 
           color="secondary"
            size="medium"
            ref={el => this.element =el}
            onChange={(e)=>this.updateCarName(e)}
          />
        </Grid>
        <Grid item xs={8} sm={5}>
          <TextField
            
            id="carPrice"
            name="quantity"
            label="Price"
           // value={JSON.parse(localStorage.getItem(localName)).customerId}
            color="secondary"
            size="medium"
            ref={el => this.element1 =el}
            
            onChange={(e)=>this.updateCarPrice(e)}
            InputProps={{
              
              endAdornment:<InputAdornment position="end">&#x20b9;</InputAdornment>
              
            }}
          />
        </Grid>

        <Grid item xs={8} sm={5}>
          <TextField
            
            id="brand name"
            name="text1"
            label="Brand Name"
            color="secondary"
            size="medium"
            ref={el => this.element2 =el} 
            onChange={(e)=>this.updateBrandName(e)}
            
          />
        </Grid>
        <Grid item xs={8} sm={5} style={{marginLeft:"15px"}}>
          <TextField
            
            id="mileage"
            name="text2"
            label="Mileage"
            color="secondary"
            size="medium"
            ref={el => this.element3 =el}
           onChange={(e)=>this.updateMilege(e)}
           InputProps={{
              
            endAdornment:<InputAdornment position="end">Kmpl</InputAdornment>
            
          }}
          />
        </Grid>

        <Grid item xs={8} sm={5}>
          <TextField
            
            id="type"
            name="text3"
            label="Type"
            color="secondary"
            size="medium"
            ref={el => this.element6 =el}
           onChange={(e)=>this.updateType(e)}
            
          />
        </Grid>

        <Grid item xs={8} sm={5}>
          <TextField
            
            id="seatingcapacity"
            name="quantity"
            label="Seating Capacity"
            color="secondary"
            size="medium"
            ref={el => this.element4 =el} 
            onChange={(e)=>this.updateSeatingCapacity(e)}
            
          />
        </Grid>
        <Grid item xs={8} sm={5} style={{marginLeft:"17px"}}>
          <TextField
            
           id="engineDisplacement"
            name="text"
            label="Engine Displacement"
            color="secondary"
            size="medium"
            ref={el => this.element5 =el} 
            onChange={(e)=>this.updateEngineDisplacement(e)}
            InputProps={{
              
              endAdornment:<InputAdornment position="end">cc</InputAdornment>
              
            }}
            
          />
        </Grid>
    </Grid>
             
              {/*<center><table style={{width:"50%"}}>
               <tr>
                 <td>Enter Car Name</td>
                  <td><input type="text" id="css" name="text" ref={el => this.element =el} onChange={(e)=>this.updateCarName(e)} required/></td>
               </tr>
               <tr><td>Enter Car Price(&#x20b9;)</td>
                <td> <input type="number" id="css" name="quantity" ref={el => this.element1 =el} onChange={(e)=>this.updateCarPrice(e)} required/> </td>
               </tr>
               <tr>
                   <td>Enter Brand Name </td>
                   <td><input type="text"id="css" name="text1" ref={el => this.element2 =el} onChange={(e)=>this.updateBrandName(e)} required/></td>
              </tr>
              <tr>
                <td>Enter Mileage (kmpl) </td>
                <td><input type="text" id="css" name="text2" ref={el => this.element3 =el} onChange={(e)=>this.updateMilege(e)} required/></td>
              </tr>
              <tr>
                <td>Enter type </td>
                <td><input type="text" id="css" name="text3" ref={el => this.element6 =el} onChange={(e)=>this.updateType(e)} required/></td>
              </tr> 
              <tr>
                   <td>Enter seating capacity </td><td><input type="number" id="css" name="quantity" ref={el => this.element4 =el} onChange={(e)=>this.updateSeatingCapacity(e)} required/><br /></td>
                   </tr> <tr> <td>Enter engine displacement (cc)</td><td><input type="text" id="css" name="text" ref={el => this.element5 =el} onChange={(e)=>this.updateEngineDisplacement(e)} required/><br /></td>
                   {this.state.carName}{this.state.carPrice}
                   {this.state.brandName}{this.state.engineDisplacement}
                   {this.state.seatingCapacity}{this.state.milege}
                   </tr>
        </table></center>*/}
                   
                   <br /><br />
                   Upload Car Image 
                   <div style = {{display:"flex", flexDirection:"row", gap:"0px", marginLeft:"280px"}} > 
                   <div class="image-upload">
  <label for="file-input">
    <img src="https://icon-library.net/images/upload-photo-icon/upload-photo-icon-21.jpg" style={{marginLeft:"30px"}} height="100px" width="100px"/></label>
 
            <input type="file" id="file-input" accept = "application/jpg" onChange={this.onFileChange} required/> <br />
            </div>
		</div>
        {this.fileData()}
    <div className="heading2">{this.state.uploadError}</div>
   <button className="button" style={{width:"150px",marginLeft:"285px",marginBottom:"20px"}} disabled={this.state.uploadError} type="submit" onClick={()=>this.onAdd()} >Post Deal</button>
                
               </form>
            </div>
            </div></div>
        );
    }
}



export default AddCar;

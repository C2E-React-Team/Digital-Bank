import React from 'react'
import {getCarDealsById,updateCarDeal} from '../services/carService.js'
import {getDealBycarid, getDealById} from '../selectors/cars.js';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import '../style/handleloan.css';
import InputAdornment from '@material-ui/core/InputAdornment';

class DealerEditPage extends React.Component{
    constructor(props){
        super(props);

        this.state = { 
          carDealData:{},
          selectedFile:null,
          uploadError:undefined        
        }       
    }

componentWillMount(){    
getCarDealsById(this.props.match.params.id).then((response) => {
    console.log("in mount response",response.data); 
    this.setState({carDealData:response.data});
    this.setState(()=>({loading:false}));      
});
}
    updateCarName(e){
        var carName=e.target.value;
         this.setState((state)=> ({
            carDealData:{
              ...state.carDealData,
              car_name:carName
            }
         }));
      }
      updateCarPrice(e){
        var carPrice=e.target.value;
        this.setState((state)=> ({
          carDealData:{
            ...state.carDealData,
          price:carPrice}}));
      }
      
      updateBrandName(e){
        var brandName=e.target.value;
        this.setState((state)=> ({
          carDealData:{
            ...state.carDealData,
          brand_name:brandName}}));
      }
      
      updateMilege(e){
        var mileage=e.target.value;
        this.setState((state)=> ({
          carDealData:{
            ...state.carDealData,
          mileage}}));
      }
      
      updateSeatingCapacity(e){
        var seating_capacity=e.target.value;
        this.setState((state)=> ({
          carDealData:{
            ...state.carDealData,
          seating_capacity}}));
      }
      
      updateEngineDisplacement(e){
        var engine_displacement=e.target.value;
        this.setState((state)=> ({
          carDealData:{
            ...state.carDealData,
          engine_displacement}}));
      }

      updateType(e){
        var type=e.target.value;
        this.setState((state)=> ({
          carDealData:{
            ...state.carDealData,
          type}}));
      }
      updateCar(){
      const dealerName = JSON.parse(localStorage.getItem('customerDetails')).dealerid;
      let imageName="";
      if(this.state.selectedFile!=null)
        imageName=this.state.selectedFile.name;
      else
        imageName=this.state.carDealData.image;
      const formData = new FormData(); 
      formData.append( 
        "uploadedImage", 
        this.state.selectedFile, 
      );
      formData.append(
        "carDealData",
        JSON.stringify({
          brand_name: this.state.carDealData.brand_name,
          car_name: this.state.carDealData.car_name,
          mileage: this.state.carDealData.mileage,
          engine_displacement: this.state.carDealData.engine_displacement,
          seating_capacity: this.state.carDealData.seating_capacity,
          type: this.state.carDealData.type,
          image:imageName,
          price: this.state.carDealData.price,
          dealer_name: dealerName
        })
      )
      console.log(this.state.carDealData);
      console.log(formData);
        updateCarDeal(this.props.match.params.id,formData)
        .then((response)=>{
          console.log("in edit response",response.data); 
          alert("car details updated");
        })
        .catch((error)=>
        console.log(error));
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
             <p className="para" style={{marginTop:"8px",marginLeft:"250px"}}>choose before pressing submit</p>
              </div> 
          ); 
        } 
    
      }; 
      onFileChange = event => { 
        const file = event.target.files[0];
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
            <div className="card3">
              <br></br>
                <br></br>
        <div style={{float:"right"}}>
               <img src={"data:image/jpeg;base64," +this.state.carDealData.carImage} style={{ width:"300px", height:"300px"}}alt="Deal_Image"/><br></br>
              Change Car Image 
                   <div> 
            <input type="file" accept = "application/jpg" onChange={this.onFileChange} required/> <br />
		</div>
        {this.fileData()}
    <div className="heading2">{this.state.uploadError}</div></div>
    
    <form className="handle_form" onSubmit={e=>e.preventDefault()}>          
    <div className="heading">Edit Car Details</div>
    <br></br>
    <Grid container spacing={3}>
   
        <Grid item xs={8} sm={5}>
          <TextField 
            id="carName"
            name="text1"
            label="Car Name"
            value={this.state.carDealData.car_name || ''}
            //value="veena"
            color="secondary"
            onChange={(e)=>this.updateCarName(e)}
            type="text"
            autoComplete="given-name"
            size="medium"
            
          />
        </Grid>

        <Grid item xs={8} sm={5}>
          <TextField
          
            id="carPrice"
            name="quantity"
            type="number"
            label="Car Price"
            color="secondary"
            value={this.state.carDealData.price || ''} 
            onChange={(e)=>this.updateCarPrice(e)}
            autoComplete="given-name"
            size="medium"
            InputProps={{
              
              endAdornment:<InputAdornment position="end">&#x20b9;</InputAdornment>
              
            }}
          />
        </Grid>
        <Grid item xs={8} sm={5}>
          <TextField
          
            id="brandName"
            name="text2"
            type="text"
            label="Brand Name"
            color="secondary"
            size="medium"
            value={this.state.carDealData.brand_name || ''} 
            onChange={(e)=>this.updateBrandName(e)}
            autoComplete="given-name"
            size="medium"
          />
        </Grid>
        <Grid item xs={8} sm={5}>
          <TextField
          
            id="mileage"
            name="text3"
            type="text"
            label="Mileage"
            color="secondary"
            size="medium"
            value={this.state.carDealData.mileage || ''} 
            onChange={(e)=>this.updateMilege(e)}
            autoComplete="given-name"
            size="medium"
            InputProps={{
              
              endAdornment:<InputAdornment position="end">Kmpl</InputAdornment>
              
            }}
          />
        </Grid>
        <Grid item xs={8} sm={5}>
          <TextField
          
            id="seatingCapacity"
            name="quantity2"
            type="number"
            label="Seating Capacity"
            color="secondary"
            size="medium"
            value={this.state.carDealData.seating_capacity || ''} 
            onChange={(e)=>this.updateSeatingCapacity(e)}
            autoComplete="given-name"
            size="medium"
          />
        </Grid>
        <Grid item xs={8} sm={5}>
          <TextField
          
            id="type"
            name="text4"
            type="text"
            label="Type"
            color="secondary"
            size="medium"
            value={this.state.carDealData.type || ''} 
            onChange={(e)=>this.updateType(e)}
            autoComplete="given-name"
            size="medium"
          />
        </Grid>
        <Grid item xs={8} sm={5}>
          <TextField
          
            id="engineDisplacement"
            name="text"
            type="text"
            label="Engine Displacement"
            color="secondary"
            size="medium"
            value={this.state.carDealData.engine_displacement || ''} 
            onChange={(e)=>this.updateEngineDisplacement(e)}
            autoComplete="given-name"
            size="medium"
            InputProps={{
              
              endAdornment:<InputAdornment position="end">cc</InputAdornment>
              
            }}
          />
        </Grid>
        </Grid>
        
                {/*Enter Car Name :<input type="text" name="text1" value={this.state.carDealData.car_name} onChange={(e)=>this.updateCarName(e)} required/><br />
                Enter Car Price :<input type="number" name="quantity" value={this.state.carDealData.price} onChange={(e)=>this.updateCarPrice(e)} required/><br />
                   Enter Brand Name :<input type="text" name="text2" value={this.state.carDealData.brand_name} onChange={(e)=>this.updateBrandName(e)} required/><br />
                   Enter Mileage :<input type="text" name="text3"  value={this.state.carDealData.mileage} onChange={(e)=>this.updateMilege(e)} required/><br />
                   Enter seating capacity :<input type="number" name="quantity2" value={this.state.carDealData.seating_capacity} onChange={(e)=>this.updateSeatingCapacity(e)} required/><br />
                   Enter type :<input type="text" name="text4"  value={this.state.carDealData.type} onChange={(e)=>this.updateType(e)} required/><br />
                   Enter engine displacement :<input type="text" name="text5" value={this.state.carDealData.engine_displacement} onChange={(e)=>this.updateEngineDisplacement(e)} required/><br />
                   <button className="button" type="submit" onClick={()=>this.updateCar()} >Update</button>
        */}
        </form> 
        
       <center> <button className="button" type="submit" onClick={()=>this.updateCar()} >Update</button></center>
       </div>

                
        )}
}

export default DealerEditPage;


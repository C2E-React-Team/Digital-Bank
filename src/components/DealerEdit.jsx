import React from 'react'
import {getCarDealsById,updateCarDeal} from '../services/carService.js'
import {getDealBycarid, getDealById} from '../selectors/cars.js';
import {connect} from 'react-redux';
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
            <div>
              Car Image: <img src={"data:image/jpeg;base64," +this.state.carDealData.carImage} alt="Deal_Image"/><br></br>
              Change Car Image 
                   <div style = {{display:"flex", flexDirection:"row", gap:"0px", marginLeft:"280px"}} > 
            <input type="file" accept = "application/jpg" onChange={this.onFileChange} required/> <br />
		</div>
        {this.fileData()}
    <div className="heading2">{this.state.uploadError}</div>
                Enter Car Name :<input type="text" name="text1" value={this.state.carDealData.car_name} onChange={(e)=>this.updateCarName(e)} required/><br />
                Enter Car Price :<input type="number" name="quantity" value={this.state.carDealData.price} onChange={(e)=>this.updateCarPrice(e)} required/><br />
                   Enter Brand Name :<input type="text" name="text2" value={this.state.carDealData.brand_name} onChange={(e)=>this.updateBrandName(e)} required/><br />
                   Enter Mileage :<input type="text" name="text3"  value={this.state.carDealData.mileage} onChange={(e)=>this.updateMilege(e)} required/><br />
                   Enter seating capacity :<input type="number" name="quantity2" value={this.state.carDealData.seating_capacity} onChange={(e)=>this.updateSeatingCapacity(e)} required/><br />
                   Enter type :<input type="text" name="text4"  value={this.state.carDealData.type} onChange={(e)=>this.updateType(e)} required/><br />
                   Enter engine displacement :<input type="text" name="text5" value={this.state.carDealData.engine_displacement} onChange={(e)=>this.updateEngineDisplacement(e)} required/><br />
                   <button className="button" type="submit" onClick={()=>this.updateCar()} >Update</button>
                    
                </div>
        )}
}

export default DealerEditPage;


import React from 'react'
import {addCarDeal} from '../services/carService.js';

class AddCar extends React.Component{
    constructor(props){
        super(props);

        this.state = { 
           carName:'',
           carPrice:0,
           brandName:'',
           mileage:'',
           seatingCapacity:0,
           engineDisplacement:'',
           selectedFile: null,
           uploadError:undefined
        }       
    }
onAdd(){
    this.setState({ carName: this.element.value });
    this.setState({ carPrice: this.element1.value });
    this.setState({ brandName: this.element2.value });
    this.setState({ mileage: this.element3.value });
    this.setState({ seatingCapacity: this.element4.value });
    this.setState({ engineDisplacement: this.element5.value });
    const deal = {
      id: 157.0,
      brand_name: this.state.brandName,
      car_name: this.state.carName,
      mileage: this.state.mileage,
      engine_displacement: this.state.engineDisplacement,
      seating_capacity: this.state.seatingCapacity,
      type: "SUV",
      image: "Kia-Sonet.webp",
      price: this.state.carPrice,
      dealer_name: "dealer1"
  };
  console.log(deal);
    // addCarDeal(deal).then((response)=> {
    //     console.log(response);
    //     alert('car added');
    //   })
   
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

onFileChange = event => { 
    const file = event.target.files[0];
    if(file){
      if(file.name.split('.').pop() == "jpg" && file.size <= 10000000){
          this.setState({ selectedFile: event.target.files[0] }); 
        this.setState({uploadError:undefined})
      }    
      else
        this.setState({uploadError:"Image should be in jpg"})
    }
	}; 
    render(){
        return(
            <div>
                <h3>Add a new car</h3>
               <form onSubmit={e=>e.preventDefault()}>
                   Enter Car Name :<input type="text" name="text" ref={el => this.element =el}/><br />
                   Enter Car Price :<input type="number" name="quantity" ref={el => this.element1 =el}/><br />
                   Enter Brand Name :<input type="text" name="text" ref={el => this.element2 =el}/><br />
                   Enter Mileage :<input type="text" name="text" ref={el => this.element3 =el}/><br />
                   Enter seating capacity :<input type="number" name="quantity" ref={el => this.element4 =el}/><br />
                   Enter engine displacement :<input type="text" name="text" ref={el => this.element5 =el}/><br />
                   Submit Car Image 
                   <div style = {{display:"flex", flexDirection:"row", gap:"0px", marginLeft:"55px"}} > 
            <input type="file" accept = "application/jpg" onChange={this.onFileChange} required/> <br />
		</div>
        {this.fileData()}
    <div className="heading2">{this.state.uploadError}</div>
                   <button className="button" type="submit" onClick={()=>this.onAdd()} >Submit my request to bank</button>
                
               </form>
            </div>
        );
    }
}



export default AddCar;

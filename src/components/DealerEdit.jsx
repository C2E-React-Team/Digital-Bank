import React from 'react'
import {getCarDealsById} from '../services/carService.js'
import {getDealBycarid, getDealById} from '../selectors/cars.js';
import {connect} from 'react-redux';
class DealerEditPage extends React.Component{
    constructor(props){
        super(props);

        this.state = { 
           carName:'',
           carDealData:{},               
           carid:this.props.match.params.id,
           brandName:'',
           Milege:'',
           seatingCapacity:0,
           engineDisplacement:'',
           selectedFile: null,
        }       
    }

componentWillMount(){    
getCarDealsById(this.props.match.params.id).then((response) => {
    console.log("in response",response.data); 
    this.setState({carDealData:response.data});
    this.setState(()=>({loading:false}));      
});
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
        var Milege=e.target.value;
          {this.setState({Milege:Milege})};
      }
      
      updateSeatingCapacity(e){
        var seatingCapacity=e.target.value;
          {this.setState({seatingCapacity:seatingCapacity})};
      }
      
      updateEngineDisplacement(e){
        var engineDisplacement=e.target.value;
          {this.setState({engineDisplacement:engineDisplacement})};
      }
      updateCar(){
          alert("car details updated");
      }
    render(){
        return(
            <div>
                Enter Car Name :<input type="text" name="text" value={this.props.data.carName} onChange={(e)=>this.updateCarName(e)} required/><br />
                Enter Car Price :<input type="number" name="quantity" value={this.props.data.carPrice} onChange={(e)=>this.updateCarPrice(e)} required/><br />
                   Enter Brand Name :<input type="text" name="text" value={this.props.data.brandName} onChange={(e)=>this.updateBrandName(e)} required/><br />
                   Enter Milege :<input type="text" name="text"  value={this.props.data.mileage}onChange={(e)=>this.updateMilege(e)} required/><br />
                   Enter seating capacity :<input type="number" name="quantity" value={this.props.data.seatingCapacity} onChange={(e)=>this.updateSeatingCapacity(e)} required/><br />
                   Enter engine displacement :<input type="text" name="text" value={this.props.data.engineDisplacement} onChange={(e)=>this.updateEngineDisplacement(e)} required/><br />
                   <button className="button" type="submit" onClick={()=>this.updateCar()} >Update</button>
                    
                </div>
        )}
}
const mapStateToProps = (state,props) => {
    return {
    CarData: state.DealerData,
    data :  getDealBycarid(state.DealerData,props.match.params.id)
    }
}
export default connect(mapStateToProps)(DealerEditPage);


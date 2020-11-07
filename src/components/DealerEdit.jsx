import React from 'react'
import {getDealById} from '../selectors/cars.js';
import {getCarDealsById} from '../services/carService.js'
import {connect} from 'react-redux';
class DealerEditPage extends React.Component{
    constructor(props){
        super(props);

        this.state = { 
           carName:'',
           carDealData:{}
        }       
    }

componentWillMount(){    
    getCarDealsById(this.props.match.params.id).then((response) => {
        console.log("in response",response.data); 
        this.setState({carDealData:response.data});
        this.setState(()=>({loading:false}));      
    });
    }
setName(e){
    carName=e.target.value;
    this.setState({carName:carName});
}
    render(){
        return(
            <div>
                <h2>this is </h2>
                enter car name : <input type="text" name="" value={this.state.carDealData.car_name} onChange={(e)=>{this.setName(e)}}/>
                
                
                </div>
        )}
}
const mapStateToProps = (state,props) => {
    return {
    CarData: state.DealerData,
    data :  getDealById(state.carDeals,props.match.params.id)
    }
}
export default connect(mapStateToProps)(DealerEditPage);

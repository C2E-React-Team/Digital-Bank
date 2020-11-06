import React from 'react'
import {getDealById} from '../selectors/cars.js';
import {connect} from 'react-redux';
class DealerEditPage extends React.Component{
    constructor(props){
        super(props);

        this.state = { 
           carName:'',
        }       
    }
setName(e){
    carName=e.target.value;
    this.setState({carName:carName});
}
    render(){
        return(
            <div>
                <h2>this is </h2>
                enter car name : <input type="text" name="" value={this.props.data.car_name} onChange={(e)=>{this.setName(e)}}/>
                
                
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

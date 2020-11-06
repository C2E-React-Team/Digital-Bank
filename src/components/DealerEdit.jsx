import React from 'react'
import {getDealBycarid, getDealById} from '../selectors/cars.js';
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
                enter car name : <input type="text" name="" value={this.props.data.carName} onChange={(e)=>{this.setName(e)}}/>
                
                
                </div>
        )}
}
const mapStateToProps = (state,props) => {
    return {
    CarData: state.DealerData,
    data :  getDealBycarid(state.DealerData,props.match.params.carid)
    }
}
export default connect(mapStateToProps)(DealerEditPage);

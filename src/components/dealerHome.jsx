import { Edit } from '@material-ui/icons';
import React from 'react'
import {connect} from 'react-redux';
import DealListItem from './cars/DealListItem.jsx'
import {Link} from 'react-router-dom';
import {getDealById} from '../selectors/cars.js';
import {getCarDealsByDealerName} from '../services/carService';
import {getCarDeals} from '../services/carService';
import selectCarDeals from '../selectors/cars.js';
import DealerEdit from './DealerEdit.jsx';
class DealerHome extends React.Component{
    constructor(props)
{
    super(props);

this.state = { 
    carDeals:[]
    };  
}
componentWillMount(){
      const dealerName = JSON.parse(localStorage.getItem('customerDetails')).dealerid;
    getCarDealsByDealerName(dealerName).then((response) => {
      console.log("in response",response.data); 
      this.setState({carDeals:response.data});
      this.setState(()=>({loading:false}));      
    });
  }
    render(){
        
        return(
         <div>
            {
            (this.state.loading===true)? (
              <div>
              <Spinner variant="danger" animation="border" />
              </div>
              ) :(
                <div>
                    <Link to="/addCar">
                    <h3> Add Car</h3>
                </Link>

            Available Cars :  
               {this.state.carDeals.map((deal,key) => (
                   <DealListItem key={key} {...deal} history={this.props.history} pushTo={"/dealereditpage/"}/>
          ))}
            
            </div>
        )
    }</div>)
};
}

export default DealerHome;

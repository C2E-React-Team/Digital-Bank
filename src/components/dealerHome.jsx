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
import { Spinner } from 'react-bootstrap';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {Pagination} from '@material-ui/lab';


const muiTheme = createMuiTheme({
palette: {
  primary: {
    main: 'rgb(255, 51, 51)'
  }

}

});

class DealerHome extends React.Component{
    constructor(props)
{
    super(props);

this.state = { 
    carDeals:[],
    currentPage:1,
    dealsPerPage:6
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

  UNSAFE_componentWillReceiveProps(){
    this.setState({currentPage:this.props.filters.page});
  }

  onPageChange(e,page){
    this.setState({currentPage:page});
    window.scrollTo(0,0);
  }
    render(){
      const indexOfLastDeal = this.state.currentPage * this.state.dealsPerPage;
      const indexOfFirstDeal = indexOfLastDeal - this.state.dealsPerPage;
      const currentDeals = this.state.carDeals.slice(indexOfFirstDeal,indexOfLastDeal);
    
        return(
         <div>
            {
            (this.state.loading===true)? (
              <div>
              <Spinner variant="danger" animation="border" />
              </div>
              ) :(
                <div>
                  <div style={{marginLeft:"1200px"}}>
                    <Link className="button" to="/addCar">
                    <h4> Add Car</h4>
                </Link></div>
                <br />
          { /* Available Cars :  
               {this.state.carDeals.map((deal,key) => (
                   <DealListItem key={key} {...deal} history={this.props.history} pushTo={"/dealereditpage/"}/>
               ))}*/}
               <div style={{marginLeft:"205px"}}>
                <ThemeProvider theme={muiTheme} >
          <Pagination count={parseInt((this.state.carDeals.length%this.state.dealsPerPage==0)?
                                      this.state.carDeals.length/this.state.dealsPerPage:
                                      this.state.carDeals.length/this.state.dealsPerPage+1
            )}  
           onChange = {(e,page)=>this.onPageChange(e,page)}
           page={this.state.currentPage}
           color="primary"
           />
           </ThemeProvider></div>
           {currentDeals.map((deal,index,deals) => {

              
return (
  ((index)%2==0)?
  (<div style={{display:"flex", flexDirection:"row", gap:"50px", marginLeft:"205px"}}>
  <DealListItem key={deal.id} {...deal} history={this.props.history} pushTo={"/dealereditpage/"} />
  {console.log(deals[index].id)}
  {((index+2)<=(deals.length))?
  <DealListItem key={deals[index+1].id} {...deals[index+1]} history={this.props.history} pushTo={"/dealereditpage/"}/>:""}
  
  </div>):""
)

})}
            
            </div>
        )
    }
    <div style={{marginLeft:"205px"}}><ThemeProvider theme={muiTheme}>
        <Pagination count={parseInt((this.state.carDeals.length%this.state.dealsPerPage==0)?
                                    this.state.carDeals.length/this.state.dealsPerPage:
                                    this.state.carDeals.length/this.state.dealsPerPage+1
          )}  
          onChange = {(e,page)=>this.onPageChange(e,page)}
          page={this.state.currentPage}
          color="primary"
          />
          </ThemeProvider></div>
        
    
    </div>
    )
};
}

export default DealerHome;

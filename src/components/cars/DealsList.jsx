import React from 'react';
import {connect} from 'react-redux';
import DealListItem from './DealListItem.jsx';
import selectCarDeals from '../../selectors/cars.js';
import {getCarDeals} from '../../services/carService';
import {setDeals} from '../../actions/cars/deals';
import {Pagination} from '@material-ui/lab';
import '../../style/dealsList.css'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Spinner } from 'reactstrap';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


const muiTheme = createMuiTheme({
palette: {
  primary: {
    main: 'rgb(255, 51, 51)'
  }
}

});



class CarDealsList extends React.Component{

  constructor(props){
    super(props);

    this.state = {
        loading:true,
        currentPage:1,
        dealsPerPage:6
      }
    }
  
  componentWillMount(){
      
    getCarDeals().then((response) => {
      console.log("in response",response.data)
      this.props.dispatch(setDeals(response.data));
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
  const currentDeals = this.props.deals.slice(indexOfFirstDeal,indexOfLastDeal);

  

  return (
    <div id="mainBackground1">
      {/* <Card> */}
        {
        (this.state.loading===true)? (
          <div className="list-item list-item--message">
            {/* <span>Loading</span> */}
            <Spinner color="primary" />
          </div>
        ) :
          ( 
            this.props.deals.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No Deals</span>
          </div>
        ) : (
          <div>
          <ThemeProvider theme={muiTheme}>
          <Pagination count={parseInt((this.props.deals.length%this.state.dealsPerPage==0)?
                                      this.props.deals.length/this.state.dealsPerPage:
                                      this.props.deals.length/this.state.dealsPerPage+1
            )}  
           onChange = {(e,page)=>this.onPageChange(e,page)}
           page={this.state.currentPage}
           color="primary"
           />
           </ThemeProvider>
            {currentDeals.map((deal,index,deals) => {

              
              return (
                ((index)%2==0)?
                (<div style={{display:"flex", flexDirection:"row", gap:"50px"}}>
                <DealListItem key={deal.id} {...deal} history={this.props.history} />
                {console.log(deals[index].id)}
                {((index+2)<=(deals.length))?
                <DealListItem key={deals[index+1].id} {...deals[index+1]} history={this.props.history} />:""}
                
                </div>):""
            )
             
            })}
          </div>
          ))
        }
        <ThemeProvider theme={muiTheme}>
        <Pagination count={parseInt((this.props.deals.length%this.state.dealsPerPage==0)?
                                    this.props.deals.length/this.state.dealsPerPage:
                                    this.props.deals.length/this.state.dealsPerPage+1
          )}  
          onChange = {(e,page)=>this.onPageChange(e,page)}
          page={this.state.currentPage}
          color="primary"
          />
          </ThemeProvider>
        {/* </Card> */}
    </div>
);}
      }

const mapStateToProps = (state) => {
    return {
        deals : selectCarDeals(state.carDeals,state.carFilters),
        filters:state.carFilters
    };
};

export default connect(mapStateToProps)(CarDealsList);

import React from 'react';
import CarsDealsList from './DealsList.jsx';
import CarFilters from './DealsListFilters.jsx';

class CarsPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props);
        return(
            <div><br/><br/>
                <div style = {{display:"flex", flexDirection:"row", gap:"100px"}}>
                     <CarFilters />
                     <CarsDealsList history={this.props.history}/>
        
                  </div>
            </div>
        );
    }
}


export default CarsPage;
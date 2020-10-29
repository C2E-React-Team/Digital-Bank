import React from 'react';
import CarsDealsList from './cars/DealsList.jsx';
import CarFilters from './cars/DealsListFilters.jsx';
import {Link} from "react-router-dom";

class HomePage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                {/* <h1>Home Page</h1><br /> */}
                <Link to="/">Cars</Link>
                <div style = {{display:"flex", flexDirection:"row", gap:"50px"}}>
                     <CarFilters />
                     <CarsDealsList />
        
                  </div>
            </div>
        );
    }
}


export default HomePage;
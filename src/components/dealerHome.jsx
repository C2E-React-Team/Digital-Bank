import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
class DealerHome extends React.Component{
    constructor(props)
{
    super(props);

this.state = { 
    dealername:'',
    dealerid:'',
    cars:[],
    }; 
 
    
}

dealer(e){
    var id=e.target.value;
    console.log("deales")
    for(let i=0;i<this.props.CarData.length;i++){
        if(this.props.CarData[i].dealerid == id){
            this.setState({dealername:this.props.CarData[i].dealername})
            this.setState({cars:this.props.CarData[i].cars})
       }
    }
}

    render(){
        return(
            <div>
                <h1>This is the Home Page for Dealer</h1>
                
                <h4><label>Enter your Dealer ID</label></h4>
                <input style={{border: "2px solid grey"}}type="text" name="text" onChange={(e)=>this.dealer(e)} /> <br />
               Name of the dealer :{this.state.dealername}<br />
             Available Cars :  
               {this.state.cars.map(item => (
            <li key={item}>{item}</li>
          ))}
            
            <Link to="/addCar">
                    <h3> Add Car</h3>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state,props) => {
    return {
    CarData: state.DealerData
    }
}

export default connect(mapStateToProps)(DealerHome);

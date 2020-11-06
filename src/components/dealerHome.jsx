import { Edit } from '@material-ui/icons';
import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getDealById} from '../selectors/cars.js';
import {getCarDeals} from '../services/carService';
class DealerHome extends React.Component{
    constructor(props)
{
    super(props);

this.state = { 
    dealername:'',
    dealerid:'',
    carName:'',
    cars:[],
    carid:0
    };  
}
componentWillMount(){
      
    getCarDeals().then((response) => {
      console.log("in response",response.data)
      
      this.setState(()=>({loading:false}));
      
    });
  }

dealer(e){
    var id=e.target.value;
    console.log("deales")
    //console.log(id);
    //console.log(this.props.CarData[0].dealerid);
    for(let i=0;i<this.props.CarData.length;i++){
        if(this.props.CarData[i].dealerid == id){
            this.setState({dealername:this.props.CarData[i].dealername})
            this.setState({dealerid:this.props.CarData[i].dealerid})
            this.setState({carid:this.props.CarData[i].carid})
          // console.log(this.props.CarData[i].carName)
           
           //this.setState({carName:this.props.CarData[i].carName})
           
           //console.log(this.state.cars);
           this.setState(prevState => ({
            cars: [...prevState.cars, this.props.CarData[i].carName]
          }))
           
       }
    }
}
    
edit(item){
    console.log(item);
    for(let i=0;i<this.props.CarData.length;i++){
        if(this.props.CarData[i].carName == item){
            this.props.history.push(`/dealereditpage/${this.props.CarData[i].carid}`)
        }
    }
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
                <h1>This is the Home Page for Dealer</h1>
                
                <h4><label>Enter your Dealer ID</label></h4>
                <input style={{border: "2px solid grey"}}type="text" name="text" onChange={(e)=>this.dealer(e)} /> <br />
               Name of the dealer :{this.state.dealername}<br />

            Available Cars :  
               {this.state.cars.map(item => (
            <li key={item} onClick={()=>this.edit(item)}>{item}</li>
          ))}
            <Link to="/addCar">
                    <h3> Add Car</h3>
                </Link>
            </div>
        )
    }</div>)
};
}

const mapStateToProps = (state,props) => {
    return {
    CarData: state.DealerData,
    }
}

export default connect(mapStateToProps)(DealerHome);

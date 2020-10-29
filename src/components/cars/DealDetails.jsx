import React,{useRef, useEffect,useState} from 'react';
import {connect} from 'react-redux';
import {getDealById} from '../../selectors/cars.js';
import {getCarDeals} from '../../services/carService';
import {setDeals} from '../../actions/cars/deals';
import {useHistory} from 'react-router-dom';
import '../../css/index_style.css';

const scrollToRef=(ref)=>window.scrollTo(0,ref.current.offsetTop);
const scrollToTop = () => window.scrollTo(0,0);
const useMountEffect = (fun) => useEffect(fun,[]);


const CarDealDetails = (props) => {
    const [loading,setState] = useState(true);
    useEffect(() => {
        getCarDeals().then((response) => {
            console.log("in response",response.data)
            console.log("after set state",props);
            props.dispatch(setDeals(response.data));
            setState(false);
          });
      }, []);

    const headerref = useRef(null);
    const featuresref = useRef(null);
    const loanref = useRef(null);
    const dealerref = useRef(null);
    useMountEffect(()=>scrollToTop());
    const history=useHistory();
    const handleLoan = () => {
        props.history.push(`/loanpage/${props.data.id}`)
    }

    console.log(props.data);
    console.log("27",props,loading);
    return (
        <div>
        {
            (loading===true)? (
              <div className="list-item list-item--message">
                <span>Loading</span>
              </div>
            ) :
            (<div ref={headerref} id="headerDetails" style = {{display:"flex", flexDirection:"row",gap:"50px",height:300}}>
                <div id="imageDiv" style = {{width:"30%"}}>
                    <img src={require(`../../images/${props.data.image}`).default} alt="deal image" width="300" height="300"/>
                </div>
                <div >
                <h3>Brand Name : {props.data.brand_name}</h3>
                <h3>Car Name : {props.data.car_name}</h3>
                <h3>Car Cost : INR  {props.data.price}</h3>
                <h3>Name Of the Dealer : {props.data.dealer_name}</h3>
                <button className="button" onClick={()=>handleLoan()}>Apply for loan</button>
            </div>
            </div>
            )}
            <div>
                <div style={{float:"left",width:"25%",position:"fixed"}}>
                    <div className="button" style={{cursor:"pointer"}} onClick={()=>scrollToRef(featuresref)}>Features & Specs</div><br />
                    <div className="button"style={{cursor:"pointer"}} onClick={()=>scrollToRef(loanref)}>Loan Information</div><br />
                    <div className="button"style={{cursor:"pointer"}} onClick={()=>scrollToRef(dealerref)}>  About the Dealer</div><br />
                    <div className="button" style={{cursor:"pointer"}} onClick={()=>scrollToTop()}>  Go to top</div><br />
                </div>
                <div id="detailsDiv" style={{float:"right",width:"70%"}}><h3>
                    <div ref={featuresref}><mark>Feature</mark>:Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec fermentum lectus. Ut sit amet elit nulla. Mauris malesuada mauris posuere ipsum faucibus efficitur. Vestibulum ultricies id metus et malesuada. Morbi eget lacus faucibus, suscipit velit at, lacinia metus. Maecenas commodo tortor ac metus pretium dictum. Nulla vestibulum at enim non volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</div>
                    <div style={{height:400}}></div>
                    <div ref={loanref}><mark>Loan</mark>:Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec fermentum lectus. Ut sit amet elit nulla. Mauris malesuada mauris posuere ipsum faucibus efficitur. Vestibulum ultricies id metus et malesuada. Morbi eget lacus faucibus, suscipit velit at, lacinia metus. Maecenas commodo tortor ac metus pretium dictum. Nulla vestibulum at enim non volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</div>
                    <div style={{height:400}}></div>
                    <div ref={dealerref}><mark>Dealer</mark>:Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec fermentum lectus. Ut sit amet elit nulla. Mauris malesuada mauris posuere ipsum faucibus efficitur. Vestibulum ultricies id metus et malesuada. Morbi eget lacus faucibus, suscipit velit at, lacinia metus. Maecenas commodo tortor ac metus pretium dictum. Nulla vestibulum at enim non volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</div>
                    </h3>
                </div>
            </div>
        </div>
     );
}



const mapStateToProps = (state,props) => {
    return {
    data :  getDealById(state.carDeals,props.match.params.id)
    }
}

export default connect(mapStateToProps)(CarDealDetails);
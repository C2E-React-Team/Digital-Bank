import React,{useRef, useEffect,useState} from 'react';
import {connect} from 'react-redux';
import {getDealById} from '../../selectors/cars.js';
import {getCarDeals} from '../../services/carService';
import {setDeals} from '../../actions/cars/deals';
import '../../css/index_style.css';
import '../../style/dealdetails.css';
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
    const handleLoan = () => {
        props.history.push(`/loanpage/${props.data.id}`)
    }
    return (
        <div>
        {
            (loading===true)? (
              <div className="list-item list-item--message">
                <span>Loading</span>
              </div>
            ) :
            (<div ref={headerref} className="header_details" style = {{display:"flex", flexDirection:"row",gap:"50px",height:350}}>
                <div id="imageDiv" className="details_image" style = {{width:"40%"}}>
                    <img src={require(`../../images/${props.data.image}`).default} alt="deal image" width="500" height="330"/>
                </div>
                <div className="details_main">
                <h3 className="details_title">{props.data.brand_name}</h3>
                <h5>{props.data.car_name}</h5>
                <h5 className="details_price">₹ {props.data.price}</h5>
                <h5 style={{marginLeft:"5px"}}> {props.data.dealer_name}</h5>
                <button className="button" onClick={()=>handleLoan()}>Apply for loan</button>
            </div>
            </div>
            )}
            <div >
                <div className="details_fixed">
                <ul>
                    <li><a href="#features">Features & Specs</a></li>
                    <li><a href="#loan">Loan Information</a></li>
                    <li><a href="#dealer">About dealer</a></li>
                    {/* <div className="mylink" style={{cursor:"pointer"}} onClick={()=>scrollToRef(featuresref)}>Features & Specs</div><br />
                    <div className="mylink"style={{cursor:"pointer"}} onClick={()=>scrollToRef(loanref)}>Loan Information</div><br />
                    <div className="mylink"style={{cursor:"pointer"}} onClick={()=>scrollToRef(dealerref)}>  About the Dealer</div><br />
                    <div className="mylink" style={{cursor:"pointer"}} onClick={()=>scrollToTop()}>  Go to top</div><br />
            */}
            </ul></div>
                <div className="detailsDiv" ><h1>
                    <div ref={featuresref} id="feature">Feature:Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec fermentum lectus. Ut sit amet elit nulla. Mauris malesuada mauris posuere ipsum faucibus efficitur. Vestibulum ultricies id metus et malesuada. Morbi eget lacus faucibus, suscipit velit at, lacinia metus. Maecenas commodo tortor ac metus pretium dictum. Nulla vestibulum at enim non volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</div>
                    <div style={{height:100}}></div>
                    <div ref={loanref} id="loan">loanpage:Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec fermentum lectus. Ut sit amet elit nulla. Mauris malesuada mauris posuere ipsum faucibus efficitur. Vestibulum ultricies id metus et malesuada. Morbi eget lacus faucibus, suscipit velit at, lacinia metus. Maecenas commodo tortor ac metus pretium dictum. Nulla vestibulum at enim non volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</div>
                    <div style={{height:100}} id="dealer"></div>
                    <div ref={dealerref} id="dealer">Dealer:Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec fermentum lectus. Ut sit amet elit nulla. Mauris malesuada mauris posuere ipsum faucibus efficitur. Vestibulum ultricies id metus et malesuada. Morbi eget lacus faucibus, suscipit velit at, lacinia metus. Maecenas commodo tortor ac metus pretium dictum. Nulla vestibulum at enim non volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</div>
                    </h1>
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
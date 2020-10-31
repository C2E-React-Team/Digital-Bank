import React from 'react';
// import {history} from '../../routers/AppRouter.jsx'
import '../../style/dealListItem.css'
import {BiRupee} from 'react-icons/bi'
import {AiFillCar} from 'react-icons/ai'
import {FaIdeal} from 'react-icons/fa'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
//   style = {{border: "solid" ,display:"flex", flexDirection:"row", gap:"50px", cursor:"pointer"}}

// const DealListItem = ({ id, brand_name, car_name, price, dealer_name, image}) =>{
    // const history = useHistory();

//      return (
//     <div style = {{display:"flex", flexDirection:"row", gap:"50px", cursor:"pointer"}} onClick={() => history.push(`/cars/${id}`)}>
//         <img src={require(`../../images/${image}`).default} alt="Deal_Image"/>
//         <div>
//         <h3>{brand_name}</h3>
//         <h3>{car_name}</h3>
//         <p>INR  {price}</p>
//         <p>{dealer_name}</p>
//         </div>
//     </div>
// );
// }
// 
 const DealListItem = ({ id, brand_name, car_name, price, dealer_name, image,history,mileage,engine_displacement,seating_capacity,type}) =>{
     return (
        <div style={{display:"flex", flexDirection:"row", gap:"50px"}}>


                 <div  className="card1"  onClick={() => history.push(`/cardetails/${id}`)}>
        
        <Card >
        <div style={{padding:"8% 8% 0 8%"}}>
        <CardImg top width="100%" src={require(`../../images/${image}`).default} alt="Card image cap" />
        {/* <img src={require(`../../images/${image}`).default} alt="Deal_Image"/> */}
        {/* <div style={{border:"solid white"}}> */}
         </div>
        <div style={{textAlign:"left",paddingLeft:"8%",paddingTop:"5%", paddingBottom:"5%",borderBottom:"1px solid #909090"}}>
        <CardTitle style={{color:"#909090"}}>{brand_name}</CardTitle>
        <CardSubtitle style={{fontSize:"150%"}}><AiFillCar/>  {car_name}</CardSubtitle>
        </div>
         <CardBody style={{textAlign:"left",padding:"3% 0 3% 8%", backgroundColor:"#f7f7f7"}}>
             <CardText style={{margin:"0",fontSize:"120%"}}><BiRupee/> {price}</CardText>
             <CardText style={{padding:"0",margin:"0",color:"#909090"}}><FaIdeal/>  {dealer_name}</CardText>
         </CardBody>
         </Card>
     </div>


                    <Card style={{backgroundColor:"#f7f7f7"}}>
                        <CardTitle>Car Name: {car_name}</CardTitle>
                        <CardSubtitle>Brand: {brand_name}</CardSubtitle>
                        <CardBody>
                            <CardText>ID: {id}</CardText>
                            <CardText>Price:<BiRupee/> {price}</CardText>
                            <CardText>Type: {type}</CardText>
                            <CardText>Mileage: {mileage} kmpl</CardText>
                            <CardText>Engine displacement: {engine_displacement} cc</CardText>
                            <CardText>Seating Capacity: {parseInt(seating_capacity)} seater</CardText>
                            <Button onClick={() => history.push(`/cardetails/${id}`)} style={{backgroundColor:"red"}}>More Details</Button>
                        </CardBody>
                    </Card>


     </div>
 );
 }

export default DealListItem;
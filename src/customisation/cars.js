const localName = "customerDetails";

export const getCustomerCarBudget = () =>{

    var p1,rate;
    const time=36;
    rate=8.5/1200;
var emi = (parseFloat(JSON.parse(localStorage.getItem(localName)).eMICapacity)*54.27);
var t1=Math.pow((1+rate),time);
var t2=(t1-1)/t1;

p1=(emi*t2)/rate;
return p1*5/4;

}
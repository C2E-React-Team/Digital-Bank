export const getDealById = (carDeals,id) => {
    console.log("selected car = "+ carDeals.filter((deal)=>deal.id==id)[0]+" ID = "+id);
    return carDeals.filter((deal)=>deal.id==id)[0];
}

export const getDealBycarid = (DealerData,carid) => {
    console.log("id is",carid);
    console.log("selected car = "+ DealerData.filter((deal)=>deal.carid==carid)[0]+" ID = "+carid);
    return DealerData.filter((deal)=>deal.carid==carid)[0];
   

}


const filteredDeals =  (carDeals,carFilters) => {
    
    const modelSearch = (carDeal) =>{
        let found =false;
         carFilters.keywords.forEach((keyword)=>{
            if(carDeal.car_name.toLowerCase().includes(keyword.toLowerCase()))
            found= true;
        });
        return found;
    }
    
       console.log("in selector",carFilters);
       return carDeals.filter((carDeal)=>{
    //             console.log("inside filter",carDeal.price >= carFilters.minPrice && 
    //             carDeal.price <= carFilters.maxPrice && 
    //             carFilters.types.indexOf(carDeal.type)>-1 &&
    //             modelSearch(carDeal));
               // console.log("car price="+carDeal.price+"car type"+carDeal.type);
               //console.log("image="+carDeal.image+" ID = "+carDeal.id);
        return carDeal.price >= carFilters.minPrice && 
               carDeal.price <= carFilters.maxPrice && 
               carFilters.types.indexOf(carDeal.type)>-1 &&
               modelSearch(carDeal)
               ;
    }).sort((a,b)=>{
        switch(carFilters.sortBy){
            case 'name' : return a.car_name > b.car_name ? carFilters.order:(-1*carFilters.order);
            case 'price': return a.price > b.price ? carFilters.order:(-1*carFilters.order);
        }
    });
}

export default filteredDeals;
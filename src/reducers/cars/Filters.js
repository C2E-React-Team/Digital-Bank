const types = ["SUV","Hatchback","Sedan","MUV","Minivan","Coupe","Hybrid","Luxury","Convertible","Pickup Truck","Wagon"];

const defaultFilters = {
    minPrice:500000,
    maxPrice:1000000,
    types:["SUV","Hatchback","Sedan","MUV","Minivan","Coupe","Hybrid","Luxury","Convertible","Pickup Truck","Wagon"],
    keywords:[""],
    sortBy:"price",
    order:1,
    page:1
};

export default (state=defaultFilters,action) => {
    switch(action.type){
        case 'SET_BUDGET':
            return{
                ...state,
                minPrice:action.minPrice,
                maxPrice:action.maxPrice,
                page:1
            }
        case 'SET_BODY_TYPE':
            return{
                ...state,
                types:(action.types.length==0)?types:action.types,
                page:1
            }
        case 'SET_SEARCH':
            return{
                ...state,
                keywords:action.keywords,
                page:1
            }
        case 'SET_SORT':
            return{
                ...state,
                sortBy:action.sortBy,
                page:1
            }
        case 'SET_ORDER':
            return{
                ...state,
                order:action.order,
                page:1
            }
        default:
             return state;
    }
}
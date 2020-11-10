import axios from 'axios';

const CARS_REST_API_URL = 'http://localhost:8080/cars';

const CARS_REST_DEALER_NAME_API_URL = 'http://localhost:8080/cardeals/dealer/';

const CARS_REST_ID_API_URL = 'http://localhost:8080/cardeals/';

const LOANS_REST_API_CREATE = 'http://localhost:8080/loans/add';

const CARS_REST_API_CREATE_URL = 'http://localhost:8080/cardeals/addDeal';

const CARS_REST_API_UPDATE_URL = 'http://localhost:8080/cardeals/editDeal/';

export const getCarDeals =()=>{
        return axios.get(CARS_REST_API_URL);
}

export const getCarDealsByDealerName =(dealerName)=>{
        return axios.get(CARS_REST_DEALER_NAME_API_URL+dealerName);
}

export const getCarDealsById =(id)=>{
        return axios.get(CARS_REST_ID_API_URL+id);
}

export const addCarDeal =(formData)=>{
        return axios.post(CARS_REST_API_CREATE_URL,formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                }});
}

export const updateCarDeal = (id,formdata) => {
        return axios.put(CARS_REST_API_UPDATE_URL+id,formdata,{
                headers: {
                  "Content-Type": "multipart/form-data",
                }});
}


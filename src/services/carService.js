import axios from 'axios';

const CARS_REST_API_URL = 'http://localhost:8080/cars';

const LOANS_REST_API_CREATE = 'http://localhost:8080/loans/add';

export const getCarDeals =()=>{
        return axios.get(CARS_REST_API_URL);
}


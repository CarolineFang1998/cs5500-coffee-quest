import axios from "axios";
const RESTAURANTS_API_URL = "https://cs5500-coffee-quest-node.onrender.com/api/detail";

const api = axios.create({
    withCredentials: true,
});

export const findAllRestaurants = async () => {
    const response = await axios.get(RESTAURANTS_API_URL);
    return response.data;
};

export const findRestaurantById = async (id) => {
    const response = await axios.get(`${RESTAURANTS_API_URL}/${id}`);
   
    return response.data;
};




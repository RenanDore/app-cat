import axios from "axios";

// https://api.thecatapi.com/v1/images/search

const api = axios.create({
    baseURL: 'https://api.thecatapi.com/'
});

export default api;
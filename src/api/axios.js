import axios from 'axios';
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    header: { 'Content-Type': 'application/json' },
    withCredentials: true
});
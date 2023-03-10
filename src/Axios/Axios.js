import axios from 'axios';
const BASE_URL = 'https://app.bek.nl/restapi/';

const axiosPublic = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export { axiosPublic, axiosPrivate }
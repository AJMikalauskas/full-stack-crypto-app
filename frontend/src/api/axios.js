import axios from 'axios';
const BASE_URL = 'http://localhost:3500';

export default axios.create({
    baseURL: BASE_URL
})

// axios private to have interceptors, to work with JWT to refresh a token if our current accessToken or refreshToken is expired.
    // withCredentials is for the refreshToken cookie
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true
})
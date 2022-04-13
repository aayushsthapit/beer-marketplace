import axios from 'axios';

// Http util instantiated with axios.
const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    withCredentials: true,
    'Content-Type': 'application/json'
  }
});

export default http;

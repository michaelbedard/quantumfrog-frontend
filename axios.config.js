import axios from 'axios';

axios.defaults.baseURL = 'https://quantumfrog-backend.onrender.com/';
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.withCredential= true
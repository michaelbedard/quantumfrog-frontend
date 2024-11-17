import axios from 'axios';

axios.defaults.baseURL = 'http://ladi.cstjean.qc.ca/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://34.118.250.238:8080'
});

export default instance;
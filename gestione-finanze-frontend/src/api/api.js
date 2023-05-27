import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://35.195.199.131:8080'
});

export default instance;
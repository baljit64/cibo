// http://cibo-env.eba-betua9ec.ap-south-1.elasticbeanstalk.com/


import axios from "axios";


const api = axios.create({
  baseURL: 'http://cibo-env.eba-betua9ec.ap-south-1.elasticbeanstalk.com/'
  // baseURL: 'http://192.168.1.65:8086/'
});

export default api;
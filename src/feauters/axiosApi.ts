import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Gethardly/oracle_digital_users/users',
});

export default axiosApi;
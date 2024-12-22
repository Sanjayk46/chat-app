import axios from 'axios';
const AxiosService = axios.create({
 // baseURL: 'http://localhost:8000',
  baseURL:'https://chat-app-backend-qxkv.onrender.com',
  headers: {
    "Content-Type": "application/json",
  },
});
export default AxiosService;
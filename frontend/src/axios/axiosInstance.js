import axios from 'axios';

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: userInfo ? `Bearer ${userInfo.access}` : '',
  },
});

export default axiosInstance;

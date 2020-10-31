import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const http = axios.create({
  baseURL: API_URL,
});

http.defaults.headers.post['Content-Type'] = 'application/json';

http.interceptors.response.use(
  async (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  },
  (error) => {
    const { response, request } = error;
    console.log({
      request,
      response
    });
    
    if (response) {
      if (response.status >= 400 && response.status < 500) {
        // alert(response.message, 'error');
        // return null;
        return response.data;
      }
    } else if (request) {
      alert('Request failed. Please try again.', 'error');
      return null;
    }
    return Promise.reject(error);
  }
);

export default http;
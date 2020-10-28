import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:5000/api',
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
import axios from 'axios';
const DELAY_MS = 1150;

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const createUrlParamsString = (params) => {
  if(params && params.length){
    const urlParams = new URLSearchParams();
    params.forEach(param => {
      
      if(typeof param === 'string'){
        urlParams.append('username', param)
      } else {
        urlParams.append('id', param)
      }
    });

    return urlParams.toString();
  }

  return '';
};

export default {
  async getEmployees(params, signal) {
    const idsArray = params.filter(param => typeof param === 'number');
    const usernamesArray = params.filter(param => typeof param === 'string');

    const usernames = createUrlParamsString(usernamesArray);
    const ids = createUrlParamsString(idsArray);
    const requests = [];

    usernames.length && requests.push(apiClient.get(`/users?${usernames}`, {signal}));
    ids.length && requests.push(apiClient.get(`/users?${ids}`, {signal}));
    
    try {
      const results = await Promise.all(requests);
      return results;
    } catch (error) {
      console.log('Error:', error);
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        throw error;
      }
    }
  }
};

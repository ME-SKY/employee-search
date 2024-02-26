import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {

  getAllEmployee() {
    return apiClient.get('/users?_name=ma');
  },
  getEmployees(names = [], ids = []) {
    if(names.length > 0 && ids.length > 0) {
      return apiClient.get('/employees', { params: {name: names[1]} }); //TODO: change it from one name to several
    //   return apiClient.get('/employees', { params: { names: names.join(','), ids: ids.join(',') } });    
    }
    // return apiClient.get('/employees', { params: { names, ids } });
  }
};

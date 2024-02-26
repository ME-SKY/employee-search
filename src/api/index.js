import axios from 'axios';
const DELAY_MS = 1150;

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve(true), ms));

async function fakeRequest() { //it return true after 1.15 seconds.
  return await delay(DELAY_MS); // res always true
}


export default {

  getAllEmployee() {
    return apiClient.get('/users');
  },

  getEmployee({name = null, userName = null}) {
    if (name || userName) {
      return apiClient.get('/users', { params: { name, userName } });
    } else {
      return getAllEmployee();
    }
  },
  getEmployees(names = [], ids = [], userNames = []) {

    if (names.length > 0 && ids.length > 0) {
      return apiClient.get('/employees', { params: { name: names[1] } }); //TODO: change it from one name to several
      //   return apiClient.get('/employees', { params: { names: names.join(','), ids: ids.join(',') } });    
    }
    // return apiClient.get('/employees', { params: { names, ids } });
  }
};

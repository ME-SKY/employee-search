import axios from 'axios';
const DELAY_MS = 1150;

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const createUrlParams = (params) => {
  //can be more wide than this

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

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(true), ms));

export default {

  getAllEmployee() {
    return apiClient.get('/users');
  },

  getEmployee({ id, userName }, signal) { //only one id or userName should be passed here TODO: do i really need this
    const params = new URLSearchParams();


    if (id) {
      params.append('id', id);
    } else {
      params.append('username', userName);
    }

    return apiClient.get(`/users?${params.toString()}`, {signal});
  },

  async getEmployees(params, signal) {
    // const canFinish = await delay(2200);
    const requestsUrlParams = createUrlParams(params);
    // console.log('params, ', params);
    // const requests = params.map((param) => this.getEmployee(typeof param === 'number' ? { id: param } : { userName: param }, signal));

    try {
      const results = await apiClient.get(`/users?${requestsUrlParams}`, {signal});
      console.log('All requests completed:', results);
      // console.log('canFinish', canFinish);

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


  // async getEmployees(params, signal) {
  //   const canFinish = await delay(2200);
  //   console.log('params, ', params)
  //   const requests = params.map((param) => this.getEmployee(typeof param === 'number' ? { id: param } : { userName: param }, signal));

  //   try {
  //     const results = await Promise.all(requests);
  //     console.log('All requests completed:', results);
  //     console.log('canFinish', canFinish);

  //     if (canFinish) {
  //       return results;
  //     }
  //   } catch (error) {
  //     console.log('Error:', error);
  //     if (axios.isCancel(error)) {
  //       console.log('Request canceled:', error.message);
  //     } else {
  //       throw error;
  //     }
  //   }
  // }
};

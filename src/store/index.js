import { createStore } from 'vuex'
import api from '../api/index'

const store = createStore({
    state() {
        return {
            selectedEmployee: null,
            allEmployee: [],
            searchString: '',
        }
    },

    actions: {
        getAllEmployee({ commit }) {
            api.getAllEmployee().then(response => {
                console.log('all employees', response.data);
                commit('setAllEmployee', response.data);
            }).catch(error => {
                console.error('There was an error fetching the employees:', error);
            });
        },
        getAllEmployeeByName({ commit }, name) {
            api.getEmployees(names).then(response => {
                console.log('all employees', response.data);
                commit('setAllEmployee', response.data);
            }).catch(error => {
                console.error('There was an error fetching the employees:', error);
            });
        }
    },
    mutations: {
        setAllEmployee(state, payload) {
            state.allEmployee = payload;
        },
        setSearchQuery(state, payload) {
            state.searchString = payload;
        },
        setSelectedEmployee(state, payload) {
            console.log('selected employee set', payload);
            state.selectedEmployee = payload;
        }
    },
    getters: {
        findedEmployee(state, getters) {
            const uniqFilteredNames = new Set();
            let res = [];
            console.log('findedEmployee sting', state.searchString);

            if (getters.paramsFromQuery.length < 1) {
                res = state.allEmployee;
            } else {
                getters.paramsFromQuery.forEach(param => {
                    getters.employeeNames.forEach(name => {
                        if (name.includes(param)) {
                            uniqFilteredNames.add(name);
                        }
                    })
                })

                res = state.allEmployee.filter(emp => uniqFilteredNames.has(emp.name));
            }
            return res;
        },
        paramsFromQuery(state) {
            return state.searchString.length > 0 ? state.searchString.split(/[,\s]+/) : [];
        },
        employeeNames(state) {
            return state.allEmployee.map(emp => emp.name);
        }
    }
});

export default store;
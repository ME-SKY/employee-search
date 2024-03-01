import { createStore } from 'vuex'
import api from '../api/index'

const store = createStore({
    state() {
        return {
            selectedEmployee: null,
            allEmployee: [],
            searchString: '',
            isLoading: false,
            abortController: null
        }
    },

    actions: {
        async getEmployeeByUserNames({ commit, getters, state }) {
            if (state.abortController) {
                state.abortController.abort();
            }

            const abortController = new AbortController();
            commit('setAbortController', abortController);

            !state.isLoading && commit('setLoading', true);

            try {
                const response = await api.getEmployees(getters.paramsFromQuery, state.abortController.signal);

                if (response) {
                    console.log('response in getEmployeeByUserNames', response);
                    const allEmployees = response.data;
                    const uniqIds = new Set();

                    const uniqEmployeeList = allEmployees.filter(emp => {
                        if (uniqIds.has(emp.id)) {
                            return false;
                        } else {
                            uniqIds.add(emp.id);
                            return true;
                        }
                    });

                    if(getters.paramsFromQuery.length > 0){
                        commit('setAllEmployee', uniqEmployeeList);
                    }
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Request was aborted:', error.message);
                } else {
                    console.error('There was an error fetching the employees:', error);
                }
            } finally {
                setTimeout(() => {
                    commit('setAbortController', null);
                    commit('setLoading', false);
                }, 2200);
            }
        }
    },
    mutations: {
        setLoading: (state, payload) => {
            state.isLoading = payload;
        },
        setAllEmployee(state, payload) {
            state.allEmployee = payload;
        },
        setSearchQuery(state, payload) {
            state.searchString = payload;
        },
        setSelectedEmployee(state, payload) {
            console.log('selected employee set', payload);
            state.selectedEmployee = payload;
        },
        setAbortController(state, payload) {
            state.abortController = payload;
        },
    },
    getters: {
        findedEmployee(state) {
            return state.allEmployee ? state.allEmployee : [];
        },
        paramsFromQuery(state, getters) {

            const res = state.searchString.length > 0 ? state.searchString.split(/[,\s]+/)
                .filter(param => param.length > 0)
                .map(p => p.match(/\d+/g) ? +p : p) : [];
            console.log('actual params from query', res);

            return res;
        }
    }
});

export default store;
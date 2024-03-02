import { createStore } from 'vuex'
import api from '../api/index'

const store = createStore({
    state() {
        return {
            selectedEmployee: null,
            allEmployee: [],
            searchString: '',
            isLoading: false,
            abortController: null,
            error: ''
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
                    const allEmployees = response.reduce((acc, rs) => [...acc, ...rs.data], []);
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

                        if(state.selectedEmployee && !uniqEmployeeList.map(emp => emp.id).includes(state.selectedEmployee.id)){
                            commit('setSelectedEmployee', null);
                        }
                        commit('setAllEmployee', uniqEmployeeList);

                    }
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Request was aborted:', error.message);
                } else {
                    commit('setError', 'Попробуйте позже, космические лучи создают неполадки!');
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
            state.selectedEmployee = payload;
        },
        setAbortController(state, payload) {
            state.abortController = payload;
        },
        setError(state, payload) {
            state.error = payload;
        }
    },
    getters: {
        paramsFromQuery(state, getters) {
            const res = state.searchString.length > 0 ? state.searchString.split(/[,\s]+/)
                .filter(param => param.length > 0)
                .map(p => p.match(/\d+/g) ? +p : p) : [];
            return res;
        }
    }
});

export default store;
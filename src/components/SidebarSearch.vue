<script setup>
import { ref, watch } from 'vue';
import store from '../store';
// import HelloWorld from './components/HelloWorld.vue';

const searchQuery = ref('');
// const searchResults = ref([]);

// Methods
// const handleSearch = (ev) => {

//     console.log(ev);

//     store.commit('setSearchQuery', ev.data);
//     // Perform your search logic here and update searchResults
//     // For simplicity, let's assume some dummy data
//     // searchResults.value = [
//     //     { id: 1, name: 'Result 1' },
//     //     { id: 2, name: 'Result 2' },
//     //     { id: 3, name: 'Result 3' },
//     // ];
//     // console.log()
//     console.log('filtered: ', store);
// };

watch(searchQuery, (newSearchValue) => {
    console.log('newSearchValue, ', newSearchValue);
    store.commit('setSearchQuery', newSearchValue);
});


</script>

<template>
    <div class="sidebar">
        <div class="search-section">
            <input v-model="searchQuery" placeholder="Search..." />
        </div>
        <div class="results-section">
            <ul>
                <li @click="store.commit('setSelectedEmployee', result)" v-for="result in store.getters.findedEmployee" :key="result.id">{{ result.name }}</li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sidebar {
    width: 250px;
    padding: 10px;
    border-right: 1px solid #ccc;
}

.search-section {
    margin-bottom: 10px;

    input {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-radius: 4px;
        outline: none;
    }
}

.results-section {
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;

        li {
            padding: 8px;
            border-bottom: 1px solid #eee;
            cursor: pointer;

            &:last-child {
                border-bottom: none;
            }
        }
    }
}
</style>
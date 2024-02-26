<script setup>
import { ref, watch } from 'vue';
import store from '../store';

import PreviewCard from './pure/PreviewCard.vue';

const searchQuery = ref('');

watch(searchQuery, (newSearchValue) => {
    console.log('newSearchValue, ', newSearchValue);
    store.commit('setSearchQuery', newSearchValue);
});
</script>

<template>
    <div class="sidebar">
        <div class="search-section">
            <h5>Поиск сотрудников</h5>
            <input v-model="searchQuery" placeholder="Введите id или имя" />
        </div>

        <div class="results-section">
            <h5>Результаты</h5>

            <ul v-if="store.getters.findedEmployee.length > 0">
                <li @click="store.commit('setSelectedEmployee', result)" v-for="empoyee in store.getters.findedEmployee"
                    :key="empoyee.id">
                    <PreviewCard :username="empoyee.username" :email="empoyee.email"/>
                </li>
            </ul>
            
            <p v-show="!store.getters.findedEmployee.length">Ничего не найдено</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sidebar {
    display: flex;
    flex-flow: column;
    justify-content: left;
    gap: 24px;
    flex: 0 0 25%;
    padding: 26px 22px 18px 22px;
}

.search-section {
    h5 {
        margin-bottom: 22px;
    }

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

    h5 {
        margin-bottom: 16px;
    }

    ul {
        list-style-type: none;
        padding: 0;

        li {
            cursor: pointer;
            margin-bottom: 18px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
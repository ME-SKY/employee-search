<script setup>
import { ref, watch, computed } from 'vue';
import store from '../store';
import SidebarSearch from './SidebarSearch.vue';
import EmployeeInfo from './EmployeeInfo.vue';

const selectedEmployee = computed(() => store.state.selectedEmployee);

</script>

<template>
    <div class="employee-search-block">
        <SidebarSearch />
        <div class="delimiter-vertical"></div>
        <EmployeeInfo />
    </div>
</template>

<style lang="scss" scoped>
.employee-search-block {
    height: 620px;
    display: flex;
    flex-flow: row nowrap;
    background: #FDFDFD;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px #0000001A;
}
</style>

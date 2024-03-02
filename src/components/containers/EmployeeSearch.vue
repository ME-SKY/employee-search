<script setup>
import SidebarSearch from '@components/containers/SidebarSearch.vue';
import EmployeeInfo from '@components/containers/EmployeeInfo.vue';
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
    height: 580px;
    display: flex;
    flex-flow: row nowrap;
    background: #FDFDFD;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px #0000001A;
}
</style>

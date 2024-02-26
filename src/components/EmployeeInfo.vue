<script setup>
import { computed } from 'vue';
import store from '../store';

const selectedEmployee = computed(() => store.state.selectedEmployee);

</script>

<template>
    <div v-if="selectedEmployee" class="employee-info">
        <img src="https://via.placeholder.com/150" alt="employee image">

        <div class="details">
            <h3>{{ selectedEmployee.name }}</h3>
            <p><b>Email:</b> {{ selectedEmployee.email }}</p>
            <p>Phone: {{ selectedEmployee.phone }}</p>
            <h4>Bio:</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
            </p>
        </div>
    </div>

    <div v-else class="no-employee-placholder">
        <p>Please select an employee</p>
    </div>
    <!-- <div class="simple-component">
    <h1>{{ title }}</h1>
    <button @click="incrementCounter">Counter: {{ counter }}</button>
  </div> -->
</template>

<style lang="scss" scoped>
</style>

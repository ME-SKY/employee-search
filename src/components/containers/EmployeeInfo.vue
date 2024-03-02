<script setup>
import { computed } from 'vue';
import store from '@store';
import imagePlaceholder from '@assets/images/image-placeholder.png';

const selectedEmployee = computed(() => store.state.selectedEmployee);

</script>

<template>
    <div v-if="store.state.selectedEmployee" class="employee-info">
        <img :src="imagePlaceholder" alt="employee image">

        <div class="details">
            <h3>{{ selectedEmployee.name }}</h3>
            <p><b>email:</b> {{ selectedEmployee.email }}</p>
            <p><b>phone:</b> {{ selectedEmployee.phone }}</p>
            <h4>bio:</h4>
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

    <div v-else class="no-employee-placeholder">
        <p>Выберите сотрудника, чтобы посмотреть его профиль</p>
    </div>
</template>

<style lang="scss" scoped>
.employee-info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    margin-right: 22px;
    margin-top: 32px;

    >* {
        height: 56%;
        max-width: 46%;
    }

    .details {
        flex: 0 1 46% h3 {
            font-size: 16px;
            font-weight: 600;
        }

        p {
            font-size: 14px
        }
    }

    img {
        border: 1px solid lightgray;
        flex: 0 1 46%;
    }
}

.no-employee-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

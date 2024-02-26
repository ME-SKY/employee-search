<script setup>
import store from './store'
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

// import st
// import HelloWorld from './components/HelloWorld.vue';
import SidebarSearch from './components/SidebarSearch.vue';
import EmployeeInfo from './components/EmployeeInfo.vue';
import EmployeeSearch from './components/EmployeeSearch.vue'
import Header from './components/Header.vue';

// const store = useStore();

onMounted(() => {
  console.log('mounted');
  store.dispatch('getAllEmployee');
})

</script>

<template>
  <Header />

  <EmployeeSearch />  
  <SidebarSearch />
  <EmployeeInfo />
</template>

<style lang="scss"> // removed 'scoped' specially!!!
body {
  #app {
    width: 1%;
    display: flex;
    flex-flow: row wrap;

    >* {
      flex: 1 0 100%
    }
  }
}
</style>

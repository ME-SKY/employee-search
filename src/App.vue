<script setup>
import store from './store'
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

import EmployeeSearch from './components/EmployeeSearch.vue'
import Header from './components/Header.vue';

onMounted(() => {
  console.log('mounted');
  store.dispatch('getAllEmployee');
})

</script>

<template>
  <Header />
  <EmployeeSearch />
</template>

<style lang="scss"> // removed 'scoped' specially!!! TODO: make it isolated again
 body {
   #app {
     min-height: inherit;
     flex: 1 0 100%;
     width: 100%;
     display: flex;
     flex-flow: column;
     padding: 150px 8% 80px 8%;
     gap: 26px
   }

   .delimiter-vertical {
     width: 1px;
     margin: 0 10px;
     background: lightgray;
   }

   .m-0 {
     margin: 0;
   }

  //  h
 }
</style>

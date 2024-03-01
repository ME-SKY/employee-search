<script setup>
import store from './store'
import { onMounted, computed } from 'vue';
// import { useStore } from 'vuex';

//@ts-ignore
import EmployeeSearch from './components/EmployeeSearch.vue'
//@ts-ignore
import Header from './components/Header.vue';

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
     padding: 80px 8% 80px 8%;
     gap: 26px
   }

   .delimiter-vertical {
     width: 1px;
     margin: 0 22px;
     background: lightgray;
   }

   .m-0 {
     margin: 0;
   }
 }
</style>

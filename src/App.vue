<template>
  <div id="app">
    
    <bases  v-show="$store.state.show"/>
    <!-- <shop v-show="!$store.state.show"/> -->
    <div class="main">
      <router-view />
    </div>
  </div>
</template>
<script>
import shop from "./components/classify/shop"
import bases from "./components/base";
export default {
  components: {
    bases,
    shop,
  },
};
</script>
<style lang="scss" scoped>
*{margin: 0;padding: 0;}
  // .main{
  //   width: 400px;
  //   margin: 0 auto;
  // }
</style>

<template>
  <div>
    <heads />
    <van-row v-show="$store.state.bool">
      <van-col span="6">
        <Sidebar  class="dh"/>
      </van-col>
      <van-col span="18">
        <router-view></router-view>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import Vue from "vue";
import Sidebar from "../../components/classify/Sidebar";
import heads from "../../components/classify/head";
import { Loading } from "vant";
import { Col, Row } from "vant";

Vue.use(Col);
Vue.use(Row);
Vue.use(Loading);
export default {
  components: {
    heads,
    Sidebar,
  },
};
</script>
<style lang="scss" scoped>
.dh{
  position: fixed;
  left: 0;
}
// .main {
//   width: 290px;
//   float: left;
//   padding-left: 80px;
//   margin-bottom: 50px;
//   margin-top: 10px;
// }
</style>
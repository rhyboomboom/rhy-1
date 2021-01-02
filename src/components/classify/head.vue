<template>
  <div>
    <div class="headnver">
      <form>
        <van-search
          v-model="value"
          show-action
          class="head"
          placeholder="请输入搜索关键词"
          @click="say"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
      <van-list v-show="!$store.state.bool">
        <van-cell
          v-for="(item, index) in list"
          :key="index"
          @click="saay(item)"
        >
          {{ item }}
        </van-cell>
      </van-list>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Search, Toast } from "vant";
import url from "../../config/url";
import { List } from 'vant';

Vue.use(List);
Vue.use(Search);
Vue.use(Toast);
export default {
  data() {
    return {
      value: " ",
      list: [],
    };
  },
  methods: {
    say: function () {
      this.$store.commit("bools", false);
    },
    onSearch(val) {
      this.$http.get(url.getquery + `?keyword=${val}`).then((res) => {
        console.log(res);
      });
    },
    onCancel() {
      this.$store.commit("bools", true);
      Toast("取消");
    },
    saay: function (k) {
      console.log(k);
      this.$router.push({
        path: `/getquery/${k}`,
      });
    },
  },
  watch: {
    value: function () {
      this.$http.get(url.getquery + `?keyword=${this.value}`).then((res) => {
        console.log(res);
        this.list = res.data;
      });
    },
  },
  filters: {
    parserActors(actors) {
      return actors.substr(0, 26) + "...";
    },
  },
};
</script>
<style lang="scss" scoped>
.headnver {
  width: 100%;
  height: 50px;
}
.head {
  width: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
}
ul {
  margin-top: 60px;
  text-align: center;
}
ul > li {
  font-size: 14px;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
li:hover {
  color: brown;
}
</style>
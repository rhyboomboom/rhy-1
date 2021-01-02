<template>
  <div>
    <van-tabbar v-model="active" @change="say">
      <van-tabbar-item>
        <van-icon
          class="iconfont icon-shouye"
          slot="icon"
          size="1.2rem"
        ></van-icon>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <van-icon
          class="iconfont icon-kinds"
          slot="icon"
          size="1.2rem"
        ></van-icon>
        <span>分类</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <van-icon
          class="iconfont icon-gouwuche"
          slot="icon"
          size="1.2rem"
        ></van-icon>
        <span>购物车</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <van-icon
          class="iconfont icon-wode1"
          slot="icon"
          size="1.2rem"
        ></van-icon>
        <span>个人中心</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import "../assets/icon/iconfont.css";
import { Icon, Tabbar, TabbarItem, Tab, Tabs } from "vant";

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);
export default {
  data: function () {
    return {
      active: 0,
      url: ["/Homepage", "/classify/phone", "/cart", "/center"],
    };
  },
  methods: {
    say: function (index) {
      console.log(index);
      this.$router.push(this.url[index]);
    },
  },
  created() {
    console.log(121);
    this.active = this.url.indexOf(this.$route.path);
    let query = this.$route.path;
    let msg = query.substr(0, 5);
    let mee = query.substr(0, 9);
    if (msg == "/list") {
      this.active = 1;
    }
    if (mee == "/classify") {
      this.active = 1;
    }
  },
  watch: {
    $route: function (val) {
      console.log(val);
      let query = this.$route.path;
      let msg = query.substr(0, 5);
      console.log(msg);
      this.active = this.url.indexOf(this.$route.path);
      if (
        this.$route.path == "/classify/clothing" ||
        this.$route.path == "/classify/everyday"
      ) {
        this.active = 1;
      }
      if (msg == "/list") {
        this.active = 1;
      }
      if (this.$route.path == "/site" || this.$route.path == "/pay") {
        this.$store.commit("shows", false);
      }
      if (query == "/login" || query == "/register") {
        this.active = 3;
      }
    },
  },
};
</script>

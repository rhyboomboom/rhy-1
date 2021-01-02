<template>
  <div>
    <div class="banner">
      <img :src="banner" />
    </div>
    <div class="message" v-for="(item, index) in list" :key="index">
      <p class="pp" v-text="item.classifyName"></p>
      <div class="list">
        <van-row class="row">
          <van-col
            span="8"
            v-for="(v, k) in item.third"
            :key="k"
            @click="say(v.classifyId)"
          >
            <img :src="v.image"  class="image"/>
            <div class="p" v-text="v.classifyName">手机</div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
import url from "../../config/url";
import Vue from "vue";
import { Sidebar, Notify, SidebarItem } from "vant";

Vue.use(Sidebar);
Vue.use(SidebarItem);
export default {
  data() {
    return {
      banner: [],
      activeKey: 0,
      title: [],
      list: [],
    };
  },
  methods: {
    say: function (k) {
      this.$router.push({
        path: `/list/${k}`,
      });
    },
  },
  created() {
    if (this.list.length == 0) {
      this.$http.get(url.getlist).then((res) => {
        console.log(res.data[1]);
        this.banner = res.data[1].banner[0].image;
        this.list = res.data[1].second;
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 290px;
  float: left;
  padding-left: 80px;
  margin-bottom: 50px;
}
.banner {
  width: 100%;
  padding: 1.3rem 5px;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(187, 180, 180);
}
.banner > img {
  width: 100%;
  border-radius: 0.6rem;
}
.message {
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(187, 180, 180);
  //  border: 1px solid rgb(167, 167, 162);
}
.list {
  width: 100%;
  // float: left;
}
.image{
  width: 100%;
}
.row{
  text-align: center;
}
.pp {
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  font-weight: 700;
  line-height: 2.75rem;
  margin-left: 1rem;
}
.p{
  font-size: 12px;
  color: black;
}
</style>
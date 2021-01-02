<template>
  <div>
    <van-row>
      <van-col span="24">
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item title="手机数码" />
          <van-sidebar-item title="服饰鞋包" />
          <van-sidebar-item title="日用文创" />
        </van-sidebar>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import url from "../../config/url";
import Vue from "vue";
import { Sidebar, Notify, SidebarItem } from "vant";
import { Col, Row } from "vant";

Vue.use(Col);
Vue.use(Row);
Vue.use(Sidebar);
Vue.use(SidebarItem);
export default {
  data() {
    return {
      banner: [],
      activeKey: 0,
      title: [],
      list: [],
      url: ["/classify/phone", "/classify/clothing", "/classify/everyday"],
    };
  },
  methods: {
    onChange(index) {
      this.$router.push({
        path: this.url[index],
      });
    },
  },
  created() {
    this.activeKey = this.url.indexOf(this.$route.path);
  },
};
</script>
<style lang="scss" scoped>
</style>
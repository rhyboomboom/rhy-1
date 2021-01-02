<template>
  <div>
    <van-nav-bar
      title="地址管理"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="change"
    />
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar } from "vant";
import { AddressList } from "vant";

Vue.use(AddressList);
Vue.use(NavBar);
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [],
    };
  },
  methods: {
    onAdd() {
      this.$router.push({
        path: "/site",
      });
    },
    onEdit(item, index) {
      console.log(index);
      this.$router.push({
        path: `/amend/${index}`,
      });
    },
    onClickLeft() {
      this.$router.push({
        path: "/pay",
      });
    },
    change(item, index) {
      console.log(index);
      this.list.forEach((v) => {
        v.isDefault = false;
      });
      this.list[index].isDefault = true;
      window.localStorage.setItem("site", JSON.stringify(this.list));
    },
    splice() {
      this.$route.push({
        path: "/settle",
      });
    },
  },
  created() {
    this.list = JSON.parse(window.localStorage.getItem("site"));
    this.list.forEach((v, k) => {
      v.id = k;
      if (v.isDefault == true) {
        this.chosenAddressId = `${k}`;
      }
    });
    this.$store.commit("shows", false);
  },

  beforeDestroy() {
    this.$store.commit("shows", true);
  },
};
</script>
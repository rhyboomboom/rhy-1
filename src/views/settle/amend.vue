<template>
  <div>
    <van-nav-bar
      title="修改地址"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :address-info="this.list[$route.params.id]"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @click="say"
      title="标题"
    />
  </div>
</template>
<script>
import Vue from "vue";
import { AddressEdit } from "vant";
import { Area } from "vant";
import list from "../../components/list";
import { NavBar,Toast } from "vant";

Vue.use(NavBar);
Vue.use(Area);
Vue.use(AddressEdit);
export default {
  data() {
    return {
      areaList: list,
      list: [],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSave(content) {
      this.list = JSON.parse(window.localStorage.getItem("site"));
      console.log(content);
      content.address =
        content.city + content.country + content.county + content.addressDetail;
      let obj = content;
      let bool = content.isDefault;
      if (this.list == null) {
        this.list = [];
        window.localStorage.setItem("site", JSON.stringify(this.list));
      }
      let num = this.$route.params.id;
      console.log(num);
      this.list[num] = obj;
      if (this.list[num].isDefault == true) {
        this.list.forEach((v) => {
          v.isDefault = false;
        });
      }
      this.list[num].isDefault = bool;
      window.localStorage.setItem("site", JSON.stringify(this.list));
      this.list = JSON.parse(window.localStorage.getItem("site"));
      this.$router.push({
        path: "/settle",
      });
    },
    onDelete() {
      Toast("delete");
      this.list.splice(this.$route.params.id,1)
      window.localStorage.setItem("site", JSON.stringify(this.list));
      this.$router.push({
        path:"/settle"
      })
    },
    say: function () {
      console.log(2323);
      
    },
  },
  created() {
    console.log(1234);
    let num = this.$route;
    console.log(num);
    this.list = JSON.parse(window.localStorage.getItem("site"));
    this.$store.commit("shows", false);
  },

  beforeDestroy() {
    this.$store.commit("shows", true);
  },
};
</script>
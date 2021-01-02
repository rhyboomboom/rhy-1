<template>
  <div>
    <van-nav-bar
      title="新增地址"
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
      delete-button-text="放弃新增地址"
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
import { NavBar ,Toast} from "vant";

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
    onSave(content) {
      this.list = JSON.parse(window.localStorage.getItem("site"));
      console.log(content);
      content.address =
        content.city + content.country + content.county + content.addressDetail;
      let obj = content;
      if (this.list == null) {
        this.list = [];
        window.localStorage.setItem("site", JSON.stringify(this.list));
      }
      if (content.isDefault == true) {
        this.list.forEach((v) => {
          v.isDefault = false;
        });
      }
      this.list.push(obj);
      window.localStorage.setItem("site", JSON.stringify(this.list));
      this.list = JSON.parse(window.localStorage.getItem("site"));
      this.$router.push({
        path: "/settle",
      });
    },
    onClickLeft() {
      this.$router.push({
        path: "/settle",
      });
    },
    onDelete(content) {
      Toast("感谢您的使用");
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
    this.list = JSON.parse(window.localStorage.getItem("site"));
    this.$store.commit("shows", false);
  },

  beforeDestroy() {
    this.$store.commit("shows", true);
  },
};
</script>
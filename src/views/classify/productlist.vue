<template>
  <div>
    <van-nav-bar
      title="商品列表"
      left-text=""
      right-text="排序"
      left-arrow
      class="list"
      @click-left="say"
      @click-right="sort"
    />

    <van-row
      v-show="true"
      v-for="(item, index) in list"
      :key="index"
      @click="sayyy(item.spuInfo.spuId)"
    >
      <van-col span="8">
        <img :src="item.spuInfo.images" />
      </van-col>
      <van-col span="16">
        <div class="listtxt">
          <span>{{ item.spuInfo.spuTitle | parserActors }}</span>
          <span class="price">￥{{ item.spuInfo.price }}</span>
        </div>
      </van-col>
    </van-row>
    <van-row
      v-show="false"
      v-for="(item, index) in arr"
      :key="index"
      @click="sayyy(item.spuInfo.spuId)"
    >
      <van-col span="8">
        <img :src="item.spuInfo.images" />
      </van-col>
      <van-col span="16">
        <div class="listtxt">
          <span>{{ item.spuInfo.spuTitle | parserActors }}</span>
          <span class="price">￥{{ item.spuInfo.price }}</span>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import url from "../../config/url";
import Vue from "vue";
import { NavBar } from "vant";
import { Card, PullRefresh, Toast } from "vant";
import { Loading } from "vant";
import { Col, Row } from "vant";

Vue.use(Col);
Vue.use(Row);
Vue.use(Loading);
Vue.use(Card);
Vue.use(Toast);
Vue.use(PullRefresh);

Vue.use(NavBar);
export default {
  data: function () {
    return {
      okk: [],
      list: [],
      bool: true,
      arr: [],
      boolen: true,
    };
  },
  methods: {
    say: function () {
      this.$router.go(-1);
    },
    sayyy: function (index) {
      this.$router.push({
        path: `/particulars/${index}`,
      });
    },
    sort: function () {
      window.localStorage.setItem("id", this.$route.params.id);
      console.log(123);
      for (var j = 0; j <= this.list.length - 1 - 1; j++) {
        var bool = true;
        for (var i = 0; i <= this.list.length - 1 - 1 - j; i++) {
          if (
            this.list[i].spuInfo.price - 0 >
            this.list[i + 1].spuInfo.price - 0
          ) {
            bool = false;
            console.log(1);
            var tmp = this.list[i];
            this.list[i] = this.list[i + 1];
            this.list[i + 1] = tmp;
          }
        }
        if (bool === true) {
          break;
        }
      }
      let arr = this.list;
      window.localStorage.setItem("arr", JSON.stringify(arr));
      this.arr = arr;
      this.bool = false;
      window.localStorage.setItem("bool", JSON.stringify(this.bool));
    },
  },
  filters: {
    parserActors(actors) {
      return actors.substr(0, 16) + "...";
    },
  },
  created() {
    let id = window.localStorage.getItem("id");
    console.log(id, this.$route.params.id);
    if (this.$route.params.id == id) {
      this.bool = false;
      this.list = JSON.parse(window.localStorage.getItem("arr"));
    }
    console.log(this.$route.params.id);
    this.$http
      .get(
        url.getlistevery +
          `?type=shop&category_id=${this.$route.params.id}&num=20&sort=sort&channel_id=1002&page=1`
      )
      .then((res) => {
        console.log(res);
        if (this.bool) {
          this.list = res.data.list;
        }

        window.localStorage.setItem("list", JSON.stringify(this.list));
      });

    // this.bool=JSON.parse(window.localStorage.getItem("bool"));
    // this.arr=JSON.parse(window.localStorage.getItem("arr"));
    // if(this.bool==undefined){
    //   this.bool=true
    // }
  },
  computed: {
    two: function () {
      this.list.sort((a, b) => {
        return a.spuInfo.price - b.spuInfo.price;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
span {
  font-size: 16px;
  display: block;
}
img {
  width: 100%;
}
// .listevery {
//   width: 100%;
//   height: 145px;
//   // background-color: burlywood;
//   margin-bottom: 10px;
//   border-bottom: 1px solid rgb(119, 115, 115);
// }
// .listimg {
//   width: 120px;
//   height: 120px;
//   float: left;
//   // background-color:blue;
//   margin-top: 5px;
//   margin-left: 10px;
// }
.listtxt {
  width: 240px;
  height: 100px;
  // background: blueviolet;
  float: left;
  margin-top: 20px;
}
.price {
  color: red;
  line-height: 120px;
}
</style>
<template>
  <div>
    <van-nav-bar title="商品列表" left-text="" left-arrow @click-left="say" />
    <div>
      <!-- <ul>
         <li class="listevery" v-for="(item,index) in list" :key="index" @click="sayyy(item.spuId)">
           <div class="listimg">
             <img :src="item.images">
           </div>
           <div class="listtxt">
             <span >{{ item.skuName | parserActors }}</span>
            <span class="price">￥{{item.price}}</span>
           </div>
         </li>
       </ul> -->
      <van-row
        v-show="true"
        v-for="(item, index) in list"
        :key="index"
        @click="sayyy(item.spuId)"
      >
        <van-col span="8">
          <img :src="item.images" />
        </van-col>
        <van-col span="16">
          <div class="listtxt">
            <span>{{ item.skuName | parserActors }}</span>
            <span class="price">￥{{ item.price }}</span>
          </div>
        </van-col>
      </van-row>
    </div>
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
      list: [],
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
  },
  filters: {
    parserActors(actors) {
      return actors.substr(0, 16) + "...";
    },
  },
  created() {
    console.log(this.$route.params.id);
    let query = this.$route.params.id;
    query = query.replace(/ /g, "——");
    console.log(query);
    this.$http
      .get(url.getshop + `??page=1&pageSize=20&keyword=${query}`)
      .then((res) => {
        console.log(res);
        this.list = res.data.list;
      });
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
.listevery {
  width: 100%;
  height: 145px;
  // background-color: burlywood;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(119, 115, 115);
}
.listimg {
  width: 120px;
  height: 120px;
  float: left;
  // background-color:blue;
  margin-top: 5px;
  margin-left: 10px;
}
.listtxt {
  width: 240px;
  height: 100px;
  // background: blueviolet;
  float: left;
  margin-top: 20px;
  margin-left: 5px;
}
.price {
  color: red;
  line-height: 120px;
}
</style>
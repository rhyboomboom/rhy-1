<template>
  <div class="sylist">
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <template v-for="(item, index) in banner">
          <van-swipe-item :key="index">
            <img :src="item.src" @click="come(list[index])"/>
          </van-swipe-item>
        </template>
      </van-swipe>
    </div>
    <div>
      <van-grid column-num="5" class="fwlist">
        <van-grid-item
          :icon="item.src"
          :text="item.entryName"
          v-for="(item, index) in entryCenter"
          @click="FwFun(index)"
          :key="index"
        />
      </van-grid>
    </div>
    <div>
      <img
        _ngcontent-c7=""
        v-for="item in customize"
        :key="item.uuid"
        alt="坚果手机"
        class="fill-img"
        :src="item.src"
        style="opacity: 1; width: 100%"
        @click="go(1001628)"
      />
      <van-grid :border="false" :gutter="2" :column-num="2">
        <van-grid-item v-for="(item, index) in twoColumn" :key="index">
          <van-image :src="item.src"          @click="go(1001628)"/>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="cnxh">
      <span>猜你喜欢</span>
      <van-grid :border="true" :gutter="10" :column-num="2">
        <van-grid-item
          v-for="(item, index) in newuser"
          :key="index"
          @click="ckxq(item.spuId)"
        >
          <van-image :src="item.images" />
          <span>{{ item.skuName }}</span>
          <span style="color: grey">{{ item.spuSubTitle }}</span>
          <span style="color: red">￥{{ item.discountPrice }}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="db">~~没有更多了,去分类看看吧!~~</div>
  </div>
</template>
<script>
import Vue from "vue";
import {
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Grid,
  GridItem,
  Icon,
  Image,
} from "vant";
import url from "../../config/url"
Vue.use(Icon);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Image);
export default {
  data() {
    return {
      active: 0,
      banner: [],
      entryCenter: [],
      customize: [],
      twoColumn: [],
      newuser: [],
      ckxqlist: ["183", "925", "905", "939", "207"],
      list:["/particulars/1001628","/particulars/1002116","/particulars/1001871","/list/205","/Homepage"]
    };
  },
  created() {
    this.$http
      .get(url.gethome+"?channel_id=1002")
      .then((ret) => {
        this.banner = ret.data[0].content;
        this.entryCenter = ret.data[1].content;
        this.customize = ret.data[5].content;
        this.twoColumn = ret.data[6].content;
        this.twoColumn.push(ret.data[7].content[0]);
        this.twoColumn.push(ret.data[7].content[1]);
      });
    this.$http
      .get(url.getqq+"?page=1&pageSize=20")
      .then((ret) => {
        this.newuser = ret.data.skuInfo;
      });
      //  window.localStorage.setItem("jwt", JSON.stringify("ewaebjkwaehbakw"));
  },
  methods: {
    go: function (index) {
      this.$router.push({
        path: `/particulars/${index}`,
      });
    },
    come:function(k){
      this.$router.push({
        path:k
      })
    },
    FwFun(index) {
      this.$router.push({
        path: `/list/${this.ckxqlist[index]}`,
      });
    },
    ckxq(index) {
      this.$router.push({
        path: `/particulars/${index}`,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
img {
  width: 100%;
}
.my-swipe .van-swipe-item {
  color: #999;
  height: 200px;
  font-size: 20px;
  line-height: 250px;
  text-align: center;
}
.sylist {
  margin-bottom: 50px;
}
.fwlist {
  margin-top: 10px;
}
.van-grid-item__content {
  padding: 0 0 0 0;
}
.cnxh span {
  display: block;
  font-weight: bold;
  margin: 10px 10px;
}
.db {
  text-align: center;
  width: 250px;
  margin: 0 auto;
  color: gray;
}
</style>

<template>
  <div>
    <van-overlay :show="show">
      <div class="wrapper" @click="nav">
        <div class="block">
          <img :src="obj.qr_code" />
        </div>
      </div>
    </van-overlay>
    <van-nav-bar
      title="订单支付"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-divider />
    <ul>
      <li class="okk" @click="site">地址管理</li>
      <li class="url">
        <span class="title kk">地址信息:</span>姓名:{{ lis.name }}
      </li>
      <li class="url"><span class="kk"></span>电话:{{ lis.tel }}</li>
      <li class="url"><span class="kk"></span>地址:{{ lis.address }}</li>
    </ul>
    <van-divider />
    <van-swipe-cell v-for="(item, index) in cart" :key="index">
      <van-card
        :num="item.number"
        :price="item.price"
        :title="item.name"
        class="goods-card"
        :thumb="item.image"
        @click="go(index)"
      >
      </van-card>
      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          class="delete-button"
          @click="dele(item.name)"
        />
      </template>
    </van-swipe-cell>
    <van-submit-bar :price="one * 100" button-text="支付" @submit="say" />
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Toast } from "vant";
import { SwipeCell } from "vant";
import { SubmitBar } from "vant";
import { Divider } from "vant";
import url from "../../config/url";
import { Overlay } from "vant";
import { Dialog } from "vant";

// 全局注册
Vue.use(Dialog);
Vue.use(Overlay);
Vue.use(Divider);
Vue.use(SubmitBar);
Vue.use(SwipeCell);
Vue.use(Toast);
Vue.use(NavBar);
export default {
  data: function () {
    return {
      lis: {},
      cart: [],
      number: 0,
      show: false,
      obj: {},
    };
  },
  methods: {
    dele(msg) {
      this.cart.forEach((v) => {
        Dialog.confirm({
          message: "您真的想删除该商品",
        })
          .then(() => {
            if (v.name == msg) {
              this.cart.splice(v, 1);
            }

            let carr = JSON.parse(window.localStorage.getItem("shopping"));
            carr.forEach((v) => {
              if (v.name == msg) {
                carr.splice(v, 1);
                window.localStorage.setItem("shopping", JSON.stringify(carr));
              }
            });
          })
          .catch(() => {
            Toast("您的决定是正确的");
          });
      });
    },
    go: function (index) {
      this.$router.push({
        path: `/particulars/${this.cart[index].skup}`,
      });
    },
    onClickLeft() {
      Toast("返回");
      this.$router.push({
        path: "/cart",
      });
    },
    onClickRight() {
      Toast("按钮");
    },
    say: async function () {
      if (this.number > 0) {
        let ok = 0;
        let data = await this.$http.post(
          "https://m.28sjw.com/order/getQR.php",
          `_s=2121&_f=0.01&_t=2`
        );
        console.log(data);
        this.obj = data;
        this.show = true;
      } else {
        Dialog.alert({
          title: "订单检查异常",
          message: "请您回到购物车",
        }).then(() => {
          this.$router.push({
            path: "/cart",
          });
        });
      }

      //   var time=setInterval(function () {
      //     //    https://m.28sjw.com/order/orderPayStatusCheck.php
      //     console.log(ok.order_id)
      //     this.$http
      //       .get(`https://m.28sjw.com/order/orderPayStatusCheck.php?_oid=${ok.order_id}`)
      //       .then((res) => {
      //         console.log(res);
      //       });
      //       if(data){
      //           clearInterval(time)
      //       }
      //   }, 1500);
    },
    nav: function () {
      this.show = false;
    },
    site: function () {
      this.$router.push({
        path: "/settle",
      });
    },
  },
  created() {
    let arr = JSON.parse(window.localStorage.getItem("site"));
    arr.forEach((v) => {
      if (v.isDefault == true) {
        this.lis = v;
      }
    });
    this.$store.commit("shows", false);
    let carr = JSON.parse(window.localStorage.getItem("shopping"));
    carr.forEach((v) => {
      if (v.buy == true) {
        this.cart.push(v);
      }
    });
  },

  beforeDestroy() {
    this.$store.commit("shows", true);
  },
  computed: {
    one: function () {
      let total = 0;
      this.cart.forEach((v) => {
        total += v.price * v.number;
      });
      this.number = total;
      return total;
    },
  },
  watch: {
    show: async function () {
      if (this.show == false) {
        let data = await this.$http.get(
          `https://m.28sjw.com/order/orderPayStatusCheck.php?_oid=${this.obj.order_id}`
        );
        console.log(data.data.order_status);
        if (data.data.order_status == 1) {
          Toast("您支付成功");
          let arr = JSON.parse(window.localStorage.getItem("shopping"));
          let crr = JSON.parse(window.localStorage.getItem("shopping"));
          arr.forEach((v) => {
            if (v.buy == true) {
              crr.splice(v, 1);
            }
          });
          window.localStorage.setItem("shopping", JSON.stringify(crr));
          this.$router.push({
            path: "/cart",
          });
        } else {
          Toast("您支付失败");
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.goods-card {
  margin: 0;
}

.delete-button {
  height: 100%;
}
ul {
  width: 100%;
  height: 60px;
}
li {
  font-size: 16px;
  color: black;
}
.url {
  width: 100%;
  font-size: 15px;
  color: rgb(53, 98, 150);
}
.kk {
  width: 70px;
  display: inline-block;
}
.okk {
  float: right;
  background: rgb(236, 17, 17);
  color: white;
  border-radius: 5px;
  font-size: 13px;
}
.title {
  color: rgb(27, 48, 53);
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
.block > img {
  width: 100%;
}
</style>
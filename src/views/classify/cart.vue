<template>
  <div>
    <!-- <van-overlay :show="ber">
  <div class="wrapper" @click.stop>
    <div class="block" />
  </div>
</van-overlay> -->
    <div class="top">
      <div class="topone">
        <van-nav-bar
          title="购物车"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
        <div class="iptall">
          <input type="checkbox" v-model="boole" @click="over" />全选
        </div>
      </div>
    </div>
    <div class="main">
      <div class="cart" v-for="(item, index) in list" :key="index">
        <input
          type="checkbox"
          class="ipt"
          :value="item.name"
          v-model="boolen"
          @change="get(index)"
        />
        <!-- <div class="logo">
          <img :src="item.image"  @click="go(index)"/>
        </div>
        <div class="text">
          <div class="title">{{ item.name }}</div>
          <div class="price">
            ￥ {{ item.price * item.number }}<span @click="say(index)">+</span
            ><input v-model="item.number" /><span @click="sayy(index)">-</span>
          </div>
        </div> -->
        <!-- <div class="delete" @click="delet(index)">删除</div> -->
        <!-- <van-card
          :num="item.number"
          :price="item.price * item.number"
          :title="item.name"
          :thumb="item.image"
        >
          <template #footer>
            <van-button size="mini">按钮</van-button>
            <van-button size="mini">按钮</van-button>
            <van-button size="mini">按钮</van-button>
          </template>
        </van-card> -->
        <van-swipe-cell>
          <van-card
            :num="item.number"
            :price="item.price * item.number"
            :title="item.name"
            class="goods-card"
          >
          <template #thumb>
            <img :src="item.image" @click="go(index)">
          </template>
            <template #footer>
              <van-button size="mini" @click="sayy(index)">-</van-button>
              <van-button size="mini" @click="say(index)">+</van-button>
            </template>
          </van-card>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button" 
            />
          </template>
        </van-swipe-cell>
      </div>
    </div>
    <van-submit-bar :price="one * 100" button-text="合计结算" @submit="ok" />
  </div>
</template>

<script>
import { NavBar } from "vant";
import { Toast } from "vant";
import Vue from "vue";
import { SubmitBar } from "vant";
import { Overlay } from "vant";
import { Dialog } from "vant";
import { Card, Tag } from "vant";
import { SwipeCell } from "vant";

Vue.use(SwipeCell);
Vue.use(Card);
// 全局注册

Vue.use(Dialog);
Vue.use(Overlay);
Vue.use(SubmitBar);

Vue.use(NavBar, Toast, Tag);

export default {
  data: function () {
    return {
      list: [],
      boolen: [],
      boole: false,
      ber: false,
      number: 0,
    };
  },
  methods: {
    delet: function (k) {
      Dialog.confirm({
        message: "您确定删除该商品吗",
      })
        .then(() => {
          this.list.splice(k, 1);
          window.localStorage.setItem("shopping", JSON.stringify(this.list));
        })
        .catch(() => {
          // this.list[k].number = 1;
          Toast("您的决定是正确的");
        });
    },
    go: function (index) {
      this.$router.push({
        path: `/particulars/${this.list[index].skup}`,
      });
    },
    over: function () {
      //   this.boolen=[]
      if (this.boole) {
        this.boolen = [];
        this.list.forEach((v) => {
          if (this.boolen.includes(v.name)) {
            v.buy = true;
            window.localStorage.setItem("shopping", JSON.stringify(this.list));
          } else {
            v.buy = false;
            window.localStorage.setItem("shopping", JSON.stringify(this.list));
          }
        });
      } else {
        this.list.forEach((v) => {
          this.boolen.push(v.name);
        });
        this.list.forEach((v) => {
          if (this.boolen.includes(v.name)) {
            v.buy = true;
            window.localStorage.setItem("shopping", JSON.stringify(this.list));
          } else {
            v.buy = false;
            window.localStorage.setItem("shopping", JSON.stringify(this.list));
          }
        });
      }
    },
    ok: function () {
      if (this.list.length) {
        if (this.number == 0) {
          Dialog.confirm({
            title: "订单不可为空",
            message: "将为您切换选购页",
          }).then(() => {
            this.$router.push({
              path: "/classify/phone",
            });
          });
        } else {
          this.$router.push({
            path: "/pay",
          });
        }
      } else {
        Dialog.confirm({
          title: "订单不可为空",
          message: "将为您切换选购页",
        }).then(() => {
          this.$router.push({
            path: "/classify/phone",
          });
        });
      }
    },
    onClickLeft() {
      this.$router.push({
        path: "/classify/phone",
      });
    },
    onClickRight() {
      Toast("按钮");
    },
    say: function (k) {
      this.list[k].number++;
      window.localStorage.setItem("shopping", JSON.stringify(this.list));
    },
    sayy: function (k) {
      this.list[k].number--;
      if (this.list[k].number < 1) {
        // this.list.splice(k, 1);
        // window.localStorage.setItem("shopping", JSON.stringify(this.list));
        // let bo = confirm("您确定要删除该商品吗");
        // if (bo) {
        //   this.list.splice(k, 1);
        //   window.localStorage.setItem("shopping", JSON.stringify(this.list));
        // } else {
        //   this.list[k].number = 1;
        // }
        Dialog.confirm({
          message: "您确定删除该商品吗",
        })
          .then(() => {
            this.list.splice(k, 1);
            window.localStorage.setItem("shopping", JSON.stringify(this.list));
          })
          .catch(() => {
            this.list[k].number = 1;
          });
      }
      window.localStorage.setItem("shopping", JSON.stringify(this.list));
    },
    get(k) {
      this.list.forEach((v) => {
        if (this.boolen.includes(v.name)) {
          v.buy = true;
          window.localStorage.setItem("shopping", JSON.stringify(this.list));
        } else {
          v.buy = false;
          window.localStorage.setItem("shopping", JSON.stringify(this.list));
        }
      });
      if (this.list.length === this.boolen.length) {
        this.boole = true;
      } else {
        this.boole = false;
      }
    },
  },
  created() {
    console.log(12121);
    this.list = JSON.parse(window.localStorage.getItem("shopping"));
    if (this.list == null) {
      this.list = [];
      window.localStorage.setItem("shopping", JSON.stringify(this.list));
    }
    this.list.forEach((v) => {
      if (v.buy == true) {
        this.boolen.push(v.name);
      }
    });
    this.$store.commit("shows", false);
    if (this.list.length === this.boolen.length) {
      this.boole = true;
    } else {
      this.boole = false;
    }
  },
  beforeDestroy() {
    this.$store.commit("shows", true);
  },
  computed: {
    one: function () {
      let total = 0;
      this.list.forEach((v) => {
        if (this.boolen.includes(v.name)) {
          total += v.price * v.number;
        }
      });
      this.number = total;
      return total;
    },
  },
};
</script>
<style lang="scss" scoped>
.delete-button {
  height: 100%;
}
.iptall {
  width: 100%;
  height: 20px;
  font-size: 14px;
  color: rgb(13, 74, 109);
  background-color: white;
}
.topone {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
}
.ipt {
  float: left;
  margin-top: 60px;
  position: absolute;
  top: -13px;
  z-index: 999;
}
.main {
  width: 100%;
  //   margin-top: 10px;
  margin-bottom: 60px;
}
.cart {
  width: 100%;
  //   background: cadetblue;
  margin-bottom: 15px;
  position: relative;
}
.logo {
  width: 100px;
  height: 100px;
  margin: 15px 0;
  //   background: chartreuse;
  float: left;
}
.text {
  width: 200px;
  height: 130px;
  float: left;
  //   background-color: chocolate;
}
.top {
  width: 100%;
  height: 60px;
  background-color: white;
  z-index: 999;
}
.delete {
  width: 55px;
  height: 130px;
  background-color: rgb(245, 41, 34);
  line-height: 130px;
  text-align: center;
  float: left;
  color: white;
}
img {
  width: 100px;
  height: 100px;
}
.title {
  padding: 30px 0;
  font-size: 14px;
}
.price {
  width: 190px;
  font-size: 14px;
  color: red;
}
.price > input {
  width: 20px;
  text-align: center;
  float: right;
}
.price > span {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 22px;
  float: right;
}
</style>
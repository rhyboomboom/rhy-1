<template>
  <div>
    <van-nav-bar
      :title="details.name"
      left-text=""
      left-arrow
      @click-left="say"
    />
    <hr />
    <div class="logo">
      <img :src="image" />
    </div>
    <div class="message">
      <div class="price">
        ￥{{ details.price }}
        <span class="price1">满99元包邮</span>
      </div>
      <div class="title">{{ details.name }}</div>
      <div class="title1">{{ title }}</div>
    </div>
    <div class="shop">
      <div class="shoptext">商品详情</div>
      <img :src="shop" />
    </div>
    <van-submit-bar
      :price="details.price * 100"
      button-text="加入购物车"
      @submit="omm"
    />
    
  </div>
</template>

<script>
import url from "../../config/url";
import Vue from "vue";
import { NavBar } from "vant";
import { SubmitBar } from "vant";

Vue.use(SubmitBar);
Vue.use(NavBar);
export default {
  data: function () {
    return {
      details: [],
      image: "",
      title: "",
      shop: "",
      shopping: [],
      bool:true
    };
  },
  methods: {
    omm: function () {
      let obj = {
        name: this.details.name,
        price: this.details.price,
        image:this.image,
        number: 1,
        buy: true,
        skup:this.$route.params.id
      };
      this.shopping = JSON.parse(window.localStorage.getItem("shopping"));
      if (this.shopping == null) {
        this.shopping = [];
        window.localStorage.setItem("shopping", JSON.stringify(this.shopping));
        this.shopping.push(obj);
        window.localStorage.setItem("shopping", JSON.stringify(this.shopping));
      } else {
        this.shopping.forEach((v) => {
        if (v.name == obj.name) {
          this.bool=false
          console.log(1234);
          v.number++;
          window.localStorage.setItem(
            "shopping",
            JSON.stringify(this.shopping)
          );
        }
        });
        if(this.bool){
            this.shopping.push(obj)
             window.localStorage.setItem("shopping", JSON.stringify(this.shopping));
        }
        this.bool=true
        this.$router.push({
          path:"/cart"
        })
      }

      
      // this.shopping.forEach((v) => {
      //   if (v.name == obj.name) {
      //     console.log(1234);
      //     v.number++;
      //     window.localStorage.setItem(
      //       "shopping",
      //       JSON.stringify(this.shopping)
      //     );
      //     return false;
      //   } else {
      //     this.shopping.push(obj);
      //     window.localStorage.setItem(
      //       "shopping",
      //       JSON.stringify(this.shopping)
      //     );
      //   }
    },
    say: function () {
      this.$router.go(-1);
    },
  },
  created() {
    console.log(this.$route.params.id);
    this.$http
      .get(url.getdetails + `spus?ids=${this.$route.params.id}`)
      .then((res) => {
        this.details = res.data.list[0];
        this.image = this.details.sku_info[0].ali_image;
        this.title = this.details.shop_info.spu_mobile_sub_title;
        this.shop = this.details.shop_info.tpl_content.base.images.ali.url[0];
      });

    this.$store.commit("shows", false);
  },
  beforeDestroy() {
    this.$store.commit("shows", true);
  },
};
</script>
<style lang="scss" scoped>
.shoptext {
  font-size: 20px;
  color: black;
  padding-top: 10px;
}
.shop {
  width: 100%;
}
.shop > img {
  padding-top: 10px;
  width: 100%;
}
.message {
  padding: 0 20px;
  border-bottom: 4px solid rgb(185, 175, 175);
}
.logo {
  width: 100%;
  height: 300px;
  text-align: center;
  border-bottom: 4px solid rgb(185, 175, 175);
}
.logo > img {
  width: 300px;
}
.price {
  padding-top: 10px;
  color: red;
  font-size: 20px;
  margin-bottom: 12px;
  // border-bottom: 4px solid  rgb(185, 175, 175);
}
.price1 {
  color: rgb(126, 123, 118);
  font-size: 14px;
  float: right;
}
.title {
  margin-bottom: 12px;
}
.title1 {
  color: rgb(126, 123, 118);
  font-size: 12px;
  line-height: 20px;
  margin-bottom: 12px;
}
</style>
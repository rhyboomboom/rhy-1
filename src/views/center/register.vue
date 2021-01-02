<template>
  <div>
    <div>
      <van-nav-bar
        title="欢迎注册"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="zct">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="请填写用户名"
          :rules="[{ required: true, message: '请填写正确用户名' }]"
        />
        <van-field
          v-model="age"
          name="age"
          label="年龄"
          placeholder="请填写年龄"
          :rules="[{ required: true, message: '请填写正确年龄' }]"
        />
        <van-field
          v-model="phone"
          name="phone"
          label="手机号"
          placeholder="请填写手机号"
          :rules="[{ required: true, message: '请填写正确手机号' }]"
        />
        <van-field
          v-model="password1"
          name="password1"
          label="密码"
          type="password"
          placeholder="请填写密码"
          :rules="[{ required: true, message: '请填写正确密码' }]"
        />
        <van-field
          v-model="password2"
          name="password"
          label="确认密码"
          placeholder="请填写密码"
          type="password"
          :rules="[{ required: true, message: '请填写正确密码' }]"
        />

        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Form, Notify, NavBar } from "vant";
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Notify);
export default {
  data() {
    return {
      username: "",
      password1: "",
      password2: "",
      phone: "",
      age: "",
    };
  },
  methods: {
    onSubmit(val) {
      if (val.password1 == val.password) {
        console.log(val);
        let obj = {
          userId: val.username,
          mobile: val.phone,
          password: val.password,
        };
        // if (obj.mobile.length !== 10) {
        //   Notify({ type: "danger", message: "手机号不正确" });
        //   console.log(2121);
        // }
        this.$http.post("/v1/setmin", obj).then((ret) => {
          console.log(ret);
          if (ret.code == 0) {
            Notify({ type: "success", message: ret.msg });
            setTimeout(() => {
              this.$router.push("/center");
            }, 3000);
          } else {
            Notify({ type: "danger", message: ret.msg });
          }
        });
      } else {
        Notify({ type: "danger", message: "两次密码不一致" });
      }
    },
    onClickLeft() {
      this.$router.push("/center");
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
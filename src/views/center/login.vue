<template>
  <div>
    <div>
      <img  src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=283063906,2688805621&fm=15&gp=0.jpg" alt="" />
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="phone"
        label="用户名"
        placeholder="请填写手机号"
        :rules="[{ pattern, message: '请填写正确手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from "vue";
import { Form, Button, Field,Notify } from "vant";
Vue.use(Button);
Vue.use(Form);
Vue.use(Field);
Vue.use(Notify)
export default {
  data() {
    return {
      username: "",
      password: "",
      pattern:/^1[3-9]\d{9}$/
    };
  },

  methods: {
    onSubmit(val) {
      console.log(val)
      let obj={
        mobile:val.phone,
        password:val.password
      }
      console.log(obj)
      this.$http.post("/v1/login", obj ).then((ret)=>{
        if(ret.code==0){
          Notify({ type: 'success', message: ret.msg });
           this.$store.commit("setjwt",ret.jwt)
          setTimeout(()=>{
             this.$router.push("/center");
          },2000)
        }else{
          Notify({ type: 'danger', message: ret.msg });
        }
      })
     
    },
  },
};
</script>
<style lang="scss" scoped>
  img{
    width: 100%;
  }
</style>
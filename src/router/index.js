import Vue from 'vue'
import VueRouter from 'vue-router'
import classify from "./list/classify"
import center from './center/center'
import homepage from "../router/homepage/homepage"
import {Notify } from "vant";
Vue.use(Notify);
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};
const routes = [
    ...classify,
    ...center,
    homepage,
    {path:"/",redirect:"/Homepage"}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  console.log(to);
  let arr = ["/pay"]
  if(arr.includes(to.path) && !window.localStorage.getItem("jwt") ){
    Notify({ type: 'danger', message: "您还没有登录,稍后为您跳转到登录页面" });
    setTimeout(()=>{
      router.push("/login")
    },3000)
  }else{
      next()
  }
})


export default router

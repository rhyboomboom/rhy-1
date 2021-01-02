import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bool:true,
    show:true,
    jwt:"",
    list:true
  },
  mutations: {
    bools(state,val){
      state.bool=val
    },
    shows(state,val){
      state.show=val
    },
    setjwt(state,val){
      state.jwt=val
      window.localStorage.setItem("jwt",val)
    },
    lists(state,val){
      state.list=val
    },
  },
  actions: {
  },
  modules: {
  }
})

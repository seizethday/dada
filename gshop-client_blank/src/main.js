import Vue from 'vue'
import App from './App'
//(1)引入路由组件配置
import router from "./router"
//(2)引入vuex对象!!!!!!
import store from "./store"
//(3)!!小心程序顺序  new Vue在最后
//引入mint-ui button按钮
import {Button} from "mint-ui"
//注册
Vue.component(Button.name,Button);
//(4)引入mock服和器模块
import "./mock/mockServer"
//(5)引入过滤器
import "./filters"

//!!最后
new Vue({
  el: '#app',
  render:h=>h(App),
  router,
  store    //将store对象注册vue实例中!!! this.$store
})

<template>
  <div id="app">
     <!--创建路由组件占位符-->
     <router-view></router-view>
     <!--3:调用组件-->
     <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>
<script>
//(1)引入底部导航组件
import FooterGuide from "./components/FooterGuide/FooterGuide.vue"
//解决问题:用户刷新网页，用户登录状态丢失问题
//当app.vue 加载成功立即调用vuex actions 方法 getUserInfo 
//第二种:vuex mapAction
import {mapActions} from "vuex"
export default {
  //(2)注册底部导组组件
  mounted(){
     //读取用户信息属性  10:00 完成此任务 第一种方案
     //this.$store.dispatch("getUserInfo");
     this.getUserInfo();
  },
  methods:{
     ...mapActions(['getUserInfo'])
  },
  components:{
    FooterGuide
  },
  name: 'App'
}
</script>

<style>
#app {
    width:100%;
    height:100%;
    background:#f5f5f5;
}
</style>

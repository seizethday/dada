//过滤器
//src/filters/index.js
//1:引入vue对象
import Vue from "vue"
//2:添加自定义过滤器  
Vue.filter("currency-format",function(value){
   return value.toFixed(2);
})


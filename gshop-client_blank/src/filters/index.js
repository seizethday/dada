//过滤器
//src/filters/index.js
//1:引入vue对象
import Vue from "vue"
import format from "date-fns/format"
//2:添加自定义过滤器
//value 传入货币 
Vue.filter("currency-format",function(value){
   return value.toFixed(2);
})
//3:添加日期过滤器
Vue.filter("date-format",function(value,formatStr="YYYY-MM-DD HH:mm:ss"){
   return format(value,formatStr);
}) 


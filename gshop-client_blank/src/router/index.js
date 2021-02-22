//src/router/index.js  配置路由对象
//1:引入vue模块
import Vue from "vue"
//2:引入vuerouter模块
import VueRouter from "vue-router"
//3:引入首页组件
import MSite from "../pages/Msite/Msite.vue"
import Profile from "../pages/Profile/Profile.vue"
import Search from "../pages/Search/Search.vue"
import Order from "../pages/Order/Order.vue"
import Login from "../pages/Login/Login.vue"

//引入商家五个组件
import Shop from "../pages/Shop/Shop.vue"
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods.vue"
import ShopRating from "../pages/Shop/ShopRating/ShopRating.vue"
import ShopInfo   from "../pages/Shop/ShopInfo/ShopInfo.vue"

//4:注册vuerouter模块
Vue.use(VueRouter)
//5:创建路由字典:完成组件与路由之间的映射关系
export default new VueRouter({
    //配置路由与组件之间映射关系
    routes:[
        //添加一个重定向路由 16:10
        {path:"/",redirect:"/msite"}, //添加默认路由
        {path:"/msite",component:MSite,meta:{showFooter:true}},
        {path:"/order",component:Order,meta:{showFooter:true}},
        {path:"/profile",component:Profile,meta:{showFooter:true}},
        {path:"/search",component:Search,meta:{showFooter:true}},
        {path:"/login",component:Login,meta:{showFooter:false}},
        {
            path:"/shop",component:Shop,
            children:[
                {path:"/shop/goods",component:ShopGoods},
                {path:"/shop/ratings",component:ShopRating},
                {path:"/shop/info",component:ShopInfo},
                //设置默认显示二级路由
                {path:'',redirect:'/shop/goods'}
            ]
         }
    ]
})
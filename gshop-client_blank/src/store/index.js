//src/store/index.js
//src/store.js 保存vuex中所有数据
//实现对象count数据存储与操作
//1:引入vuex模块
import Vue from "vue"
import Vuex from "vuex"

//1.1:引入ajax函数
import {reqUserInfo,reqLogout, reqShopInfo,reqShopGoods,reqShopRatings} from "../api"
//2:将vuex注册vue对象
Vue.use(Vuex)
//3:创建对象state对象[菜品]
const state = {
    userInfo:{},   //用户信息对象
    info:{},       //商家信息
    goods:[],      //商家商品列表
    cartFoods:[],  //食物列表购物车
    ratings:[],    //商家评价
}
//4:创建对象mutations对象[厨师]
const mutations = {
    //接收用户信息，保存至state
    RECEIVE_USER_INFO(state,{userInfo}){
       state.userInfo = userInfo
    },
    //重置用户信息
    RESET_USER_INFO(state){
      state.userInfo = {}
    },
    //接收商家信息
    RECEIVE_INFO(state,{info}){
      state.info = info
    },
    //接收商家商品列表
    RECEIVE_GOODS(state,{goods}){
      state.goods = goods
    },
    //定义三个方法操作购物车
    //1:将购物车中某个食物对象数量加一 #加号
    INCREMENT_FOOD_COUNT(state,{food}){
      //1.1:判断食物是否有数量数属性
      if(!food.count){
       //1.2:如果没有添加属性添加属性并且支持双向绑定
       Vue.set(food,"count",1);
       //1.3:并且将食物保存在购物车中
       state.cartFoods.push(food);
      }else{
        //1.4;数量加一
        food.count++;
      }
    },
    //2:将购物车中某个食物对象数量减一 #减号
    DECREMENT_FOOD_COUNT(state,{food}){
      //1:判断当前food对象是否有count属性
      if(food.count){
        //2:数量减一
        food.count--;
        //3:如果数量等于0
        if(food.count === 0){
          //4.1:查找元素下标
          var idx = state.cartFoods.indexOf(food);
          //4.2:将food对象从购物车数组中删除
          state.cartFoods.splice(idx,1);
        }
      } 
    },
    //3:清空购物车
    CLEAR_CART(state){
      //3.1:清除food中的count=0
      state.cartFoods.forEach(food=>food.count=0)
      //3.2:清除购物车
      state.cartFoods = [];
    },
    //4:接收商家评论信息
    RECEIVE_RATINGS(state,{ratings}){
       state.ratings = ratings
    }
}
//5:创建对象actions对象[服务员]
const actions = {
    //5.1:获取服务器中用户信息并且保存  14:15 完成此任务
    async getUserInfo({commit}){
      //5.1.1 发送请求
      //result {code:1,data:{id:...}}
      const result = await reqUserInfo();
      //5.1.2 将用户信息保存vuex code 大于零正确
      if(result.code>0){
        const userInfo = result.data;//用户信息
        commit("RECEIVE_USER_INFO",{userInfo})//提交
      }
    },
    //5.2:完成用户退出功能
    async logout({commit}){
       //5.2.1 发送请求完成服务器退出任务
       const  result = await reqLogout();
       //5.2.2 如果服务器返回正确信息,清除vuex中用户状态数据
       if(result.code === 0 ){
          commit("RESET_USER_INFO");
       }
    },
    //5.3:获取商家信息
    async getShopInfo({commit}){
         //5.3.1 获取商家信息?? 上面引入
         const result = await reqShopInfo();
         //5.3.2 如果信息正确
         if(result.code == 0 ){
           const info = result.data;
           commit("RECEIVE_INFO",{info})
         }
         //5.3.3 将商家信息保存vuex
    },
    //5.4:获取商家商品列表信息
    async getShopGoods({commit}){
      //5.4.1 获取商家信息?? 上面引入
      const result = await reqShopGoods();
      //5.4.2 如果信息正确
      if(result.code == 0 ){
        const goods = result.data;
        commit("RECEIVE_GOODS",{goods})
      }
      //5.4.3 将商家信息保存vuex       
    },
    //5.5 更新购物车中数量
    //commit 函数提交
    //isAdd  加一和减一判断条件isAdd true  加一
    //                        isAdd false 减 一
    updateFoodCount({commit},{isAdd,food}){
        if(isAdd){
         commit("INCREMENT_FOOD_COUNT",{food});
        }else{
          commit("DECREMENT_FOOD_COUNT",{food});
        }
    },
    //5.6 清空购物车   10:26
    clearCart({commit}){
      commit("CLEAR_CART");
    },
    //5.7 接收服务器商家评价信息   组件数据接收完成创建滚动条
    async getShopRatings({commit},callback){
       //1:发送请求获取评价
       const result = await reqShopRatings()
       //2:判断数据是否正确
       //debugger
       if(result.code === 0){
        //3;提交mutations
        const ratings = result.data;
        commit("RECEIVE_RATINGS",{ratings})
        //4:回调函数
        callback && callback()
       }
    }
}

const getters = {
  //1:添加计算购物车总数量方法
  totalCount(state){
    return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count,0)
  },
  //2:添加计算购物车总价格方法
  totalPrice(state){
    return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count*food.price,0)
  },
  //3:添加统计满意评论数量
  positiveSize(state){
    return state.ratings.reduce((preTotal,rating)=>preTotal+(rating.rateType===0?1:0),0)
  } 
}
//6:创建vuex配置并导出
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters  
})
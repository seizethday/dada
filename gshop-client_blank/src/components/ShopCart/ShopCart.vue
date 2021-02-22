<!--  -->
<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <!--任务一:为div绑定事件  显示隐藏遮罩层 购物车列表-->
        <!--content-left 左侧条  读取购物车数据显示  完成此任务-->
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo highlight">
              <i class="iconfont icon-shopping_cart highlight"></i>
            </div>
            <div class="num">{{totalCount}}</div>
          </div>
          <div class="price highlight">￥
            {{totalPrice | currency-format}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}} 元</div>
        </div>
        <div class="content-right">
          <!--engough 充足-->
          <!--not-enough不充足 engough 充足  ? 20-->
          <!--16:45 完成上述class切换任务-->
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>
      <!--购物车列表: 默认隐藏-->
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty"  @click="clearCart">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="(food,index) in cartFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price"><span>￥{{food.price}}</span></div>
              <div class="cartcontrol-wrapper">
                 <CartControl :food="food"></CartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="list-mask" v-show="listShow"  @click="toggleShow"></div>
  </div>
</template>
<script>
//任务一:读取vuex中数据 mapState函数
//1:引入函数
import {mapState,mapGetters, mapActions} from "vuex"
//2:引入购物车按钮组件
import CartControl from "../CartControl/CartControl.vue"
//3:引入滑动组件
import BScroll from "better-scroll"
//4:引入MessageBox 清空|删除|下订单|支付|权限|之前要提示,再次确认
import {MessageBox} from "mint-ui"

export default {
  computed: {
      //2:通过mapState函数读取属性 cartFoods
     ...mapState(['cartFoods','info']),
     ...mapGetters(['totalCount','totalPrice']),
     //计算结算
     payText(){
         //1:获取总价格
         const {totalPrice} = this;
         //2:商家最小配送金额
         const  {minPrice} = this.info;
         //3:如果总价等于0
         if(totalPrice===0){
           return `￥${minPrice}元起送`;
         }else if(totalPrice<minPrice){
           return `还差${minPrice-totalPrice}元起送`;
         }else{
           return '结算';
         }
         //4:如果总价格小于最小配送金额
         //5:总价大于最小配送金额
     },
     payClass(){
        //1:获取总价格
        const {totalPrice} = this
        //2:获取最小起送金额
        const {minPrice} = this.info
        //3:判断
        return totalPrice>=minPrice?'enough':'not-enough'
     },
     listShow(){
       //切换显示购物车中列表
       //1:判断总数量0直接不显示   17:30 完成代码
       if(this.totalCount===0){
         this.isShow = false;
         return false;
       }
       //2:this.isShow == true
       if(this.isShow){
        //3:创建BScroll对象显示列表
        new BScroll(".list-content",{
          click:true
        })
        //4:返回this.isShow
       }
       return this.isShow;
     }
  },
  data() {
    return {
        isShow:false
    }
  },
  components: {
    CartControl
  },
  
  methods: {
    toggleShow(){
      //只有当前总数量大于0时切换
      if(this.totalCount > 0){
         this.isShow = !this.isShow
      }
    },
    clearCart(){
      //清除购物车   9:30
      //1:显示清空提示框
      MessageBox.confirm("确定清空购物车吗?").then(action=>{
        //2:如果用户点击确认 删除
        this.$store.dispatch("clearCart")
        //3:如果用户点击取消 什么都不做
      },()=>{})
      

    }
  },
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/minxns.styl'
.shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background $green
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 5px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          font-size 16px
          font-weight 700
          color #fff
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align bottom
          margin-bottom 15px
          margin-left -45px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          color #fff
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background $green
          transition all 0.4s linear
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition transform .3s
      &.move-enter, &.move-leave-to
        transform translateY(0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)

      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity 0
      background rgba(7, 17, 27, 0)
</style>
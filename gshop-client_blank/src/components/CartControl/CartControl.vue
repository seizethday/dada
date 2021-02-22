<!--  -->
<template>
  <div class="cartcontrol">
    <div class="iconfont icon-remove_circle_outline" @click="updateFoodCount(false)" v-if="food.count"></div>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont icon-add_circle" @click="updateFoodCount(true)"></div>
  </div>
</template>
<script>
//1:完成点击(+) 将食物添加至购物车
//2:完成点击(-) 将食物数量减一
export default {
  //声明接收父组件数据
  props:{
     food:Object
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {
    updateFoodCount(isAdd){
      //调用actions中定义方法 updateFoodCount
      this.$store.dispatch("updateFoodCount",{isAdd,food:this.food})
    }
  },
  //如果当前没有食物数量  (-) 没有    0没有   
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/minxns.styl'
.cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green


</style>
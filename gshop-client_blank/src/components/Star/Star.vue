<!-- 10:30 -->
<template>
  <!--指定星星大小:使用父组件传递参数-->
  <div class="star"  :class="'star-'+size">
    <span class="star-item" v-for="(sc,index) in starClasses" :key="index" :class="sc"></span>
  </div>
</template>
<script>
//解决星星样式问题算法
//(1)创建三个常量分别保存 满星 半星 空星 样式
const CLASS_ON = "on"
const CLASS_HALF = "half"
const CLASS_OFF = "off"
export default {
  //定义属性接收父组件传入数据
  props:{
     score:Number,   //分数
     size:Number     //大小 24 36 48
  },  
  data () {
    return {
    };
  },
  components: {},
  computed: {
      //添加计算属性
      //3.2:3 + 0 + 2 
      //3.5:3 + 1 + 1
      //计算返回数组 ["on","on","on","off","off"]
      starClasses(){
         //1:获取分数
         const {score} = this 
         //2:创建空数组
         const scs = []
         //3:获取分数整数部分3.1  3.9 3.5 =>3  全星
         const scoreInteger = Math.floor(score);
         for(var i=0;i<scoreInteger;i++){
             scs.push(CLASS_ON)
         }
         //4:计算分数半星部分
         if(score*10-scoreInteger*10>=5){
             scs.push(CLASS_HALF)
         }
         //5:计算空星部分
         while(scs.length<5){
             scs.push(CLASS_OFF)
         }
         return scs;   
      }
  },
  methods: {}
}

</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import "../../common/stylus/minxns.styl"
.star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
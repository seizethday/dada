<!--  -->
<template>
  <div>
    <div class="goods">
      <!--左侧商品类别列表--菜单-->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(good,index) in goods" :key="index" @click="clickMenuItem(index)"
          :class="{current:index===currentIndex}">
            <span class="text bottom-border-1px">
              <img
                class="icon"
                :src="good.icon"
                v-if="good.icon"
              />
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <!--右侧商品列表--菜单-->
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUI">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index">
                <div class="icon">
                  <img
                    width="57"
                    height="57"
                    :src="food.icon"
                  />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <!--将当前食物对象传递,子组件-->
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--添加购物车组件-->
      <ShopCart></ShopCart>
    </div>
  </div>
</template>

<script>
//1:读取商家商品信息
import {mapState} from "vuex"
//2:引入滚动条组件
import BScroll from "better-scroll"
//3:引入添加购物车组件
import CartControl from "../../../components/CartControl/CartControl.vue"
//4:引入购物车组件
import ShopCart from "../../../components/ShopCart/ShopCart.vue"
export default {
  computed: {
    ...mapState(['goods']), //2:读取商家信息
    //添加计算属性;依据tops数组与scrollY值判断返回下标0 1 2
    currentIndex(){
       //1:得到参与计算二个数值 scrollY tops
       //const scrollY = this.scrollY;
       //const tops = this.tops;
       const {scrollY,tops} = this;
       //2:判断scrollY范围
       //for(var i=0;i<tops.length;i++){
         //scrollY  800
         //if(scrollY > tops[i] && scrollY < tops[i+1]){
         //           return i;
         //}
       //} 16:46
       const index = tops.findIndex((top,i)=>{
         return scrollY > top && scrollY < tops[i+1]
       });
       //3:满足条件返回下标
       return index;
    }
  },
  components: { 
    CartControl,
    ShopCart
  },
  data() {
    return {
      tops:[],//右侧分类li元素高度数组
      scrollY:0,//右侧滑动顶部位置
    };
  },
  mounted() {
    //17:40 检查代码输出结果 ->ajax data dom  20ms
    this.$store.dispatch("getShopGoods").then(()=>{
      this.$nextTick(()=>{
         console.log(this.$store)
         this._initScroll();    //0.1ms error 10:26 完成..
         //解决方案:等待上面元素DOM更新结束
         this._initTops();
      })
    })
  },
  methods: {
    //点击左侧菜单右侧食物列表滑动
    clickMenuItem(index){
       //1:依据左侧元素下标查找tops数组中对应元素y值
       const scrollY = this.tops[index];
       //2:在data添加scrollY 14:55
       this.scrollY = scrollY;
       //3:将当前y保存scrtollY
       //4:右侧滑动块scrollTo跳转指定位置14:43
       this.foodsScroll.scrollTo(0,-scrollY,300);
    },
     //当前组件创建成功创建多个对象和方法..初始值单独写一个方法
     _initScroll(){
       //0:文件开始引入第三方组件better-scroll
       //1:创建better-scroll对象 绑定左侧菜单
       new BScroll(".menu-wrapper",{
         click:true          //左侧菜单支持点击事件右侧联动
       })
       //2:创建better-scroll对象 绑定右侧菜单 10:51
       this.foodsScroll = new BScroll(".foods-wrapper",{
         probeType:2,//滑动与滑动结束时触发
         click:true
       })
       //3:为右侧better-scroll对象绑定事件 scroll 15:51
       this.foodsScroll.on("scroll",({x,y})=>{
         //获取右侧y位置保存
         this.scrollY = Math.abs(y);
       });
       //4:为右侧better-scroll对象绑定事件 scrollEnd
       this.foodsScroll.on("scrollEnd",({x,y})=>{
         this.scrollY = Math.abs(y);
       })
     },
     //计算所有商品类别元素高度!
     _initTops(){
      //1:创建数组 tops 每个类别高度
      const tops = [];
      //2:创建变量 top = 0 累加高度
      let top = 0;
      //3:将top添加数组
      tops.push(top);
      //4:查找右侧所有li元素
      const lis = this.$refs.foodsUI.getElementsByClassName("food-list-hook");
      //5:创建循环遍历所有li获取高度累加保存 0 1000 1300 1400
      Array.prototype.slice.call(lis).forEach(li=>{
        top += li.clientHeight;
        tops.push(top);
      })
      //6:将数组tops 保存data
      this.tops = tops;
      //[0,1000,1300]]
      console.log(tops);
     },
  },
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../../common/stylus/minxns.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;//高亮背景颜色白色...
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
<template>
  <transition name="van-slide-up">
    <div class="food" v-if="isShow">
      <div class="close">
        <van-icon name="close" @click="$emit('close')"/>
      </div>
      <div class="food-body">
        <div class="food_img">
          <img :src="food.image_path" alt=""/>
        </div>
        <div class="dvMain">
          <div class="title">{{food.name}}</div>
          <div class="foodSales">
            <span>月售{{food.month_sales}}</span>
            <span>好评率{{food.satisfy_rate}}%</span>
          </div>
          <div class="price flex-container">
            <span>￥{{food.activity.fixed_price}}</span>
            <CartControll :foods="food"/>
          </div>
          <div class="des">{{food.description}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import CartControll from "@/components/Shops/CartControll";
export default{
  name:'Food',
  components:{
    CartControll
  },
  props:{
    food:Object,
    isShow:Boolean
  },
  methods:{

  }
}
</script>
<style scoped lang="less">
.food{
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background: white;
  z-index: 20;
  .close{
    font-size: 25px;
    text-align: right;
    position:absolute;
    right: 10px;
    top: 10px;
  }
  .dvMain{
    margin-left: 15px;
    margin-top: 20px;
    &>div{
      margin-bottom: 10px;
    }
    .title{
      font-size: 18px;
      font-weight: bold;
    }
    .des,.foodSales{
      color: rgb(82, 76, 76);
      font-size: 13px;
    }
    .price{
      color: red;
      justify-content: space-between;
      padding-right: 20px;
      align-items: center;
    }
  }
}
</style>
<template>
  <section v-if="orderInfo">
    <h3>{{orderInfo.shopInfo.name}}</h3>
    <ul class="group">
      <li v-for="(food,index) in orderInfo.selectFoods" :key="index">
        <img :src="food.image_path" alt=""/>
        <div class="group_info">
          <span>{{food.name}}</span>
          <span><van-icon name="cross" size="12px"/> {{food.count}}</span>
          <span>{{food.activity.fixed_price}}</span>
        </div>
      </li>
      <li class="group_total">
        <div>配送费</div>
        <div>￥{{orderInfo.shopInfo.float_delivery_fee}}</div>
      </li>
      <li class="total">
        小计 <span>￥</span><span>{{totalPrice}}</span>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  name:"CartGroup",
  props:{
    orderInfo:Object,
    totalPrice:Number
  }
}
</script>
<style scoped lang="less">
section{
  margin: 8px;
  background: #fff;
  padding: 20px;
  h3{
    font-size: 17px;
  }
  .group{
    margin-top: 30px;
    li{
      display: flex;
      align-items: center;
      margin-bottom: 25px;
      img{
        width:30px;
        height: 30px;
        padding-right: 10px;;
      }
      .group_info{
        display: flex;
        justify-content: space-between;
        width:100%;
      }
    }
    .group_total{
      display: flex;
      justify-content: space-between;
    }
    .total{
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      margin-bottom: 0px;
      &>span:first-child{
        font-size: 13px;
        margin-left: 5px;
      }
      &>span:last-child{
        font-size: 22px;
      }
    }
  }
}
</style>
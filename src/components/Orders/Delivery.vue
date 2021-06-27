<template>
  <div class="delivery">
    <div class="boxline" style="padding-bottom:0">
      <div class="left">
        <p>送达时间</p>
        <p class="tag" v-if="shopInfo && shopInfo.delivery_mode">{{shopInfo.delivery_mode.text}}</p>
      </div>
      <div class="center" v-if="shopInfo && shopInfo.order_lead_time">尽快送达（{{deliveryTime(shopInfo.order_lead_time)}}送达）<van-icon name="arrow" /></div>
    </div>
    <van-divider />
    <div class="boxline" style="padding-top:0">
      <div>支付方式</div>
      <div style="font-size:16px">在线支付</div>
    </div>
  </div>
</template>
<script>
export default{
  name:"Delivery",
  props:{
    shopInfo:Object
  },
  methods:{
    deliveryTime(time){
      let date = new Date();
      date.setMinutes(date.getMinutes() + time);
      return date.getHours() + ":"+date.getMinutes();
    }
  }
}
</script>
<style scoped lang="less">
.center,.boxline{
  align-items:center;
  display: flex;
}
.delivery{
  margin: 8px;
  background: #fff;
  font-size: 16px;
  .boxline{
    padding: 20px;
    justify-content: space-between;
    .left{
      display: flex;
      flex-direction: column;
     .tag{
       background: #1989fa;
       color: #fff;
       font-size: 12px;
       padding: 1px 4px;
       width: max-content;
       margin-top: 3px;
       border-radius: 1px;
     }
    }
    &>div:last-child{
      color: #2395ff;
      font-size: 14px;
    }
  }
}
</style>
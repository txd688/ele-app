<template>
  <div class="pay">
    <Header title="在线支付" />
    <div class="main">
      <div class="box" v-if="orderInfo">
        <p>支付剩余时间</p>
        <p class="time">000</p>
        <van-divider />
        <div class="shopInfo">
          <div class="overOmitLine">{{orderInfo.shopInfo.name}}</div>
          <span>￥{{totalPrice}}</span>
        </div>
      </div>
      <div class="online">在线支付</div>
      <div class="box2">
        <div>
          <van-icon name="wechat-pay" />
          <span>微信</span>
        </div>
        <van-icon name="checked" />
      </div>
      <div class="button">
        <van-button type="success">成功按钮</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
  name:'Pay',
  components:{
    Header
  },
  data(){
    return{

    }
  },
  computed:{
    userInfo(){
      return this.$store.getters.userInfo;
    },
    orderInfo(){
      return this.$store.getters.orderInfo;
    },
    totalPrice(){
      return this.$store.getters.totalPrice;
    }
  }
}
</script>
<style lang="less" scoped>
.pay{
  .box{
    background: #fff;
    padding: 40px 20px;
    padding-bottom: 20px;
    text-align: center;
    .time{
      font-size: 30px;
      margin-top: 15px;
      padding-bottom: 20px;
    }
    .shopInfo{
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      div{
        width:60%;
        text-align: left;
      }
      span{
        color: rgb(250, 178, 43);
      }
    }
  }
  .online{
    padding:20px;
    color: rgb(129, 125, 125);
  }
  .box2{
    background: #fff;
    display: flex;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
    &>div:first-child{
      display: flex;
      align-items: center;
      font-size: 17px;
    }
    &>div>i{
      margin-right: 20px;
      font-size: 35px;
      color: #2bd67e;
    }
    &>i{
      font-size: 25px;
      color: #2bd67e;
    }
  }
  .button{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    button{
      width:90%;
      background: #2bd67e;
      border: 0;
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>
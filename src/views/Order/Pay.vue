<template>
  <div class="pay">
    <Header title="在线支付" />
    <div class="main">
      <div class="box" v-if="orderInfo">
        <p>支付剩余时间</p>
        <p class="time">{{countdown}}</p>
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
        <van-button type="success" :disabled="outTime" @click="pay">确定支付</van-button>
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
      countdown:'00:15:00',
      timer:null,
      outTime:false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
      vm.countTimeDown();
    })
  },
  beforeRouteLeave (to, from, next) {
    window.clearInterval(this.timer);
    next();
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
    },
    remarkInfo() {
      return this.$store.getters.remarkInfo;
    }
  },
  methods: {
    countTimeDown(){
      let minute = 14;
      let second = 59;
      this.countdown = '00:'+minute+':'+second;
      this.timer = setInterval(() => {
        second--;
        if(second == '00' && minute == '00'){
          this.countdown = '订单已超时';
          this.outTime = true;
          window.clearInterval(this.timer);
          return;
        }
        if(second == '00'){
          second = 59;
          minute--;
          minute = minute < 10 ? '0' + minute : minute;
        }
        second = second < 10 ? '0' + second : second;
        this.countdown = '00:'+minute+':'+second;
      }, 1000);
    },
    pay() {
      // const data = {
      //   body: "米修在线",
      //   out_trade_no: new Date().getTime().toString(),
      //   total_fee: 1000
      // };
      // // alert("进入到pay方法中");
      // // 请求 http://www.thenewstep.cn/wxzf/example/jsapi.php
      // fetch("https://www.thenewstep.cn/wxzf/example/jsapi.php", {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/json"
      //   },
      //   body: JSON.stringify(data)
      // })
      //   .then(res => res.json())
      //   .then(data => {
      //     this.onBridgeReady(data);
      //   })
      //   .catch(err => {
      //     alert(err);
      //     // this.addOrder();
      //   });
      this.addOrder();
    },
    // onBridgeReady(data) {
    //   WeixinJSBridge.invoke("getBrandWCPayRequest", data, res => {
    //     if (res.err_msg == "get_brand_wcpay_request:ok") {
    //       // 使用以上方式判断前端返回,微信团队郑重提示：
    //       //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
    //       // alert("支付成功");
    //       // 生成订单
    //       this.addOrder();
    //     }
    //   });
    // },
    addOrder(){
      let orderlist = {
        orderInfo: this.orderInfo,
        userInfo: this.userInfo,
        totalPrice: this.totalPrice,
        remarkInfo: this.remarkInfo,
        image_path: this.orderInfo.shopInfo.image_path,
        shopInfoName: this.orderInfo.shopInfo.name,
        selectFoodsName: this.orderInfo.selectFoods[0].name
      };
      // console.log(orderlist)
      // alert(JSON.stringify(orderlist));
      this.$axios
        .post(`/apis/api/user/add_order/${localStorage.ele_login}`, orderlist)
        .then(() => {
          this.$router.push("/order");
        });
    }
  },
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
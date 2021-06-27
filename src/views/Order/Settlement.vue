<template>
<!-- eslint-disable -->
  <div class="settlement">
    <Header title="确定订单"/>
    <div class="content" v-if="orderInfo">
      <div class="order_info">
        <p>
          订单配送至
          <span v-if="userInfo && userInfo.tag" class="tag">
            {{userInfo.tag}}
          </span>
        </p>
        <template v-if="!userInfo || !userInfo.name">
          <span class="info" v-if="!haveAddress" @click="addAddress">新增收货地址 <van-icon name="arrow" /></span>
          <span class="info" v-else @click="$router.push('/myaddress')">选择收货地址 <van-icon name="arrow" /></span>
        </template>
        <template v-else>
          <span @click="$router.push('/myAddress')" class="info"><span class="overOmitLine">{{userInfo.address}}</span> <van-icon name="arrow" /></span>
          <p>{{userInfo.name}}({{userInfo.sex}})&nbsp;{{userInfo.phone}}</p>
        </template>
      </div>

      <Delivery :shopInfo="orderInfo.shopInfo"/>

      <CartGroup :orderInfo="orderInfo" :totalPrice="totalPrice"/>

      <div style="margin:8px;">
        <van-cell title="餐具份数" is-link value="未选择" @click="show=true"/>
        <van-cell title="订单备注" is-link value="口味、偏好" />
        <van-cell title="发票信息" is-link value="不需要发票" />
      </div>
    </div>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '30%' }">
      <van-picker title="标题" :columns="columns" :default-index="2" confirm-button-text="1123">
123
      </van-picker>
    </van-popup>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Delivery from "@/components/Orders/Delivery";
import CartGroup from "@/components/Orders/CartGroup";
export default{
  name:'Settlement',
  components:{
    Header,
    Delivery,
    CartGroup
  },
  data(){
    return {
      haveAddress:false,
      show:true,
      columns:['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华']
    }
  },
  created(){

  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      if(!vm.userInfo){
        vm.getData();
      }
    });
  },
  methods:{
    onConfirm(){

    },
    onCancel(){

    },
    onChange(){

    },
    addAddress(){
      this.$router.push({
        name:"addAddress",
        params:{
          title:"添加地址",
          addressInfo:{
            name:'',
            bottom:'',
            address:'',
            sex:'',
            tag:'',
            phone:''
          }
        },
       
      });
    },
    getData(){
      this.$axios(`apis/api/user/user_info/${localStorage.ele_login}`).then(res=>{
        if(res.data.myAddress.length > 0 ){
          this.haveAddress = true;
        }else{
          this.haveAddress = false;
        }
      });
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

<style scoped lang='less'>
.settlement{
  .content{
    background: linear-gradient(#1989fa 100px, #fff 100%);
    .order_info{
      color: rgba(243, 243, 243);
      padding: 12px 0 60px 18px;
      &>p:first-child{
       opacity: 0.8;
       display: flex;
       align-items: flex-end;
      }
      .info{
        font-size: 19px;
        font-weight: bold;
        line-height: 40px;
        display: flex;
        align-items: center;
        .overOmitLine{
          width:90%;
          display: block;
        }
        i{
          font-size: 16px;
          margin-left: 5px;
        }
      }
      .tag{
        border: 1px solid rgba(243, 243, 243,0.8);
        font-size: 12px;
        display: block;
        width: max-content;
        margin-left: 10px;
        padding: 0 1px;
      }
    }
  }
}
</style>
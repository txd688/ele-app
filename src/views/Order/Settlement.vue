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
        <van-cell title="餐具份数" is-link :value="tablewareNum || '未选择'" @click="show=true"/>
        <van-cell title="订单备注" is-link  @click="$router.push('/remark')">
          <template #default>
            <span class="overOmitLine" style="display:block;">{{remark || '口味、偏好'}}</span>
          </template>
        </van-cell>
        <van-cell title="发票信息" is-link value="不需要发票" />
      </div>
    </div>
    <div class="footer">
      <span>￥{{totalPrice}}</span>
      <span @click="handklePay">去支付</span>
    </div>

    <van-popup v-model:show="show" position="bottom" :style="{ height: '40%' }">
      <!-- picker不知道为什么确定和取消按钮不见了，手动添加 -->
      <div class="pickerTop">
        <span @click="hideProp">取消</span>
        <span>—— 餐具分数 ——</span>
        <span @click="ok()">确定</span>
      </div>
      <van-picker title="标题" :columns="columns"  ref="tableware">
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
      show:false,
      columns:['1', '2', '3', '4', '5', '6', '7','8','9'],
      tablewareNum:'',
      remark:''
    }
  },
  created(){
    
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      if(!vm.userInfo){
        vm.getData();
      }
      vm.remark = vm.$store.getters.remarkInfo.remark;
      vm.tablewareNum = vm.$store.getters.remarkInfo.tableware;
    });
  },
  methods:{
    ok(){
      this.tablewareNum = this.$refs.tableware.getValues() + '份餐具';
      this.$store.dispatch("setRemarkInfo",{
        tableware:this.tablewareNum,
        remark:this.$store.getters.remarkInfo.remark
      });
      this.hideProp();
    },
    hideProp(){
      this.show = false;
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
    },
    handklePay(){
      if(!this.userInfo){
        this.$toast('请选择送货地址');
        return;
      }
      this.$router.push("/pay");
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
  height: calc(100% - 48px);
  overflow-x: scroll;
  .content{
    padding-bottom: 10px;
    background: linear-gradient(#1989fa 50px, #fff 100%);
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
  .pickerTop{
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    position: relative;
    padding-bottom: 2px;
    align-items: flex-end;
    &>span:first-child,&>span:last-child{
      font-size: 14px;
    }
    &>span:first-child{
      color: #969799;
    }
    &>span:last-child{
      color: #576b95;
    }
  }
  .footer{
    position: absolute;
    bottom: 0;
    background: #5c5d5e;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-size: 18px;
    &>span:first-child{
      margin-left: 10px;
    }
    &>span:last-child{
      background: #2bd67e;
      padding: 15px 30px;
    }
  }
}
</style>
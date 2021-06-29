<template>
  <div class="shopCar flex-container" :class="{'isAddFood':isEmpty}">
    <van-overlay :show="showFoodList && !isEmpty"  z-index="9" @click="showList"/>
    <transition name="van-fade">
      <div class="top"  v-if="showFoodList && !isEmpty">
        <div class="header">
          <div>已选商品</div>
          <div @click="clearFoods"><van-icon name="delete-o" />清空</div>
        </div>
        <div class="main">
          <div class="list" v-for="(item,index) in selectFoods" :key="index">
            <div class="title">{{item.name}}</div>
            <div class="price">￥{{item.activity.fixed_price}}</div>
            <div class="add"><CartControll :foods="item"/></div>
          </div>
        </div>
      </div>
    </transition>
    <div class="bottom">
      <div class="flex-container">
        <div class="car" @click="showList">
          <van-badge :content="totalCount" :show-zero="false">
            <van-icon name="shopping-cart" />
          </van-badge>
        </div>
        <div class="p" @click="showList">
          <span v-if="isEmpty">未选购商品</span>
          <p v-else>￥{{totalPrice.toFixed(2)}}</p>
          <p>另需配送费{{shopInfo.rst.float_delivery_fee}}元</p>
        </div>
      </div>
      <van-button type="success" @click="goSettlement">
        <span v-if="isEmpty">￥{{shopInfo.rst.float_minimum_order_amount}}元起送</span>
        <span v-else >去结算</span>
      </van-button>
    </div>
  </div>
</template>
<script>
import CartControll from "@/components/Shops/CartControll";
export default{
  name:'ShopCar',
  components:{
    CartControll
  },
  props:{
    shopInfo:Object
  },
  data(){
    return {
      totalCount:0,
      totalPrice:0,
      selectFoods:[],
      showFoodList:false
    }
  },
  created(){
  },
  methods:{
    init(){
      this.totalCount = 0;
      this.totalPrice = 0;
      this.selectFoods = [];
    },
    showList(){
      if(this.isEmpty)return;
      this.showFoodList = !this.showFoodList;
    },
    clearFoods(){
      this.shopInfo.recommend.forEach(res=>{
        res.items.forEach(item=>{
          item.count = 0;
        })
      });
      this.shopInfo.menu.forEach(res=>{
        res.foods.forEach(item=>{
          item.count = 0;
        })
      });
      this.showFoodList = false;
    },
    goSettlement(){
      if(this.isEmpty)return;
      this.$store.dispatch("setOrderInfo",{
        shopInfo:this.shopInfo.rst,
        selectFoods:this.selectFoods
      });
      this.$router.push("/settlement");
    }
  },
  computed:{
    isEmpty(){
      let empty = true;
      this.init();
      this.shopInfo.recommend.forEach(res=>{
        res.items.forEach(item=>{
          if(item.count){
            empty = false;
            this.totalCount += item.count;
            this.totalPrice += item.activity.fixed_price * item.count;
            this.selectFoods.push(item);
          }
        })
      });
      this.shopInfo.menu.forEach(res=>{
        res.foods.forEach(item=>{
          if(item.count){
            empty = false;
            this.totalCount += item.count;
            this.totalPrice += item.activity.fixed_price * item.count;
            this.selectFoods.push(item);
          }
        })
      });

      return empty;
    }
  }
}
</script>
<style scoped lang="less">
.shopCar{
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  z-index: 10;
  justify-content: space-between;
  color: #fff;
  .bottom{
    width: 100%;
    display: flex;
    padding-left: 20px;
    justify-content: space-between;
    position: static;
    z-index: 10;
    background: rgba(61,61,61,0.9);
  }
  .car{
    border:5px solid rgba(61,61,61,0.9);
    width:42px;
    height: 42px;
    border-radius: 50%;
    margin-top: -10px;
    background: #1989fa;
    text-align: center;
    line-height: 42px;
    font-size: 25px;
    z-index: 100;
  }
  .p{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    font-size: 13px;
    margin-left: 15px;
    &>*:last-child{
      font-size: 12px;
      margin-top: 3px;
      color: rgb(158, 154, 154);
    }
  }
  .bottom>button{
    height: 100%;
    border: 0;
    background: #07c160;
    width: 105px;
    font-size: 13px;
    font-weight: bold;
  }
  .top{
    position: absolute;
    bottom: 0;
    margin-bottom: 50px;
    background: white;
    left: 0;
    right: 0;
    z-index: 10;
    .header{
      background: rgb(223, 219, 219);
      padding:15px 10px;
      display: flex;
      color: rgb(65, 62, 62);
      font-size: 15px;
      justify-content: space-between;
      &>*:last-child{
        display: flex;
        align-items: center;
        font-size: 13px;
        i{
          font-size: 15px;
          margin-right: 1px;
        }
      }
    }
    .list{
      padding: 20px 10px;
      color: black;
      display: flex;
      font-size: 15px;
      .title{
        width:70%;
      }
      .price{
        width:15%;
        color: red;
      }
      .add{
        width:15%;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
.isAddFood{
  .car{
    border:5px solid rgba(88, 86, 86, 0.5);
    background: rgba(61,61,61);
    color: rgb(143, 141, 141);
    position: relative;
    z-index: 10;
  }
  .p{
    color: rgb(158, 154, 154);
  }
  button{
    background: none!important;
  }
}
// .but{
//   button{
//     background: black!important;
//   }
// }
</style>
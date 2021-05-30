<template>
  <div class="shopCar flex-container" :class="{'isAddFood':isEmpty}">
    <div class="flex-container">
      <div class="car">
        <van-badge :content="totalCount" :show-zero="false">
          <van-icon name="shopping-cart" />
        </van-badge>
      </div>
      <div class="p">
        <span v-if="isEmpty">未选购商品</span>
        <p v-else>￥{{totalPrice.toFixed(2)}}</p>
        <p>另需配送费{{shopInfo.rst.float_delivery_fee}}元</p>
      </div>
    </div>
    <van-button type="success">
      <span v-if="isEmpty">￥{{shopInfo.rst.float_minimum_order_amount}}元起送</span>
      <span v-else>去结算</span>
    </van-button>
  </div>
</template>
<script>
export default{
  name:'ShopCar',
  components:{
  },
  props:{
    shopInfo:Object
  },
  data(){
    return {
      totalCount:0,
      totalPrice:0,
      selectFoods:[]
    }
  },
  created(){
  },
  methods:{
    init(){
      this.totalCount = 0;
      this.totalPrice = 0;
      this.selectFoods = [];
    }
  },
  computed:{
    isEmpty(){
      let empty = true;
      this.initCount();
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
  background: rgba(61,61,61,0.9);
  padding-left: 20px;
  z-index: 1000;
  justify-content: space-between;
  color: #fff;
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
  &>button{
    height: 100%;
    border: 0;
    background: #07c160;
    width: 105px;
    font-size: 13px;
    font-weight: bold;
  }
}
.isAddFood{
  .car{
    border:5px solid rgba(88, 86, 86, 0.5);
    background: rgba(61,61,61);
    color: rgb(143, 141, 141);
  }
  .p{
    color: rgb(158, 154, 154);
  }
  button{
    background: none;
  }
}
</style>
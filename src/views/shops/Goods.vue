<template>
  <div class="goods" v-if="shopInfo">
    <div class="recommmend" v-for="(recommend,index) in shopInfo.recommend" :key="index">
      <p>{{recommend.name}}</p>
      <ul>
        <li v-for="(item,i) in recommend.items" :key="i">
          <img :src="item.image_path" alt=""/>
          <div class="food">
            <p class="overOmitLine">{{item.name}}</p>
            <p>月售{{item.month_sales}} 好评率{{item.satify_rate}}</p>
          </div>
          <div class="price flex-container">
            <p>￥{{item.activity.fixed_price}}</p>
            <CartControll :foods="item"/>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CartControll from "@/components/Shops/CartControll";
export default{
  name:'Goods',
  components:{
    CartControll
  },
  data(){
    return {
      shopInfo:null
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      this.$axios.get('/apis/api/profile/batch_shop').then(res=>{
        res.data.recommend.forEach(recommend=>{
          recommend.items.forEach(item=>{
            item.count = 0;
          });
        });
        this.shopInfo = res.data;
        console.log(this.shopInfo)
      })
    },
  }
}
</script>
<style scoped lang="less">
.goods{
  .recommmend{
    &>p{
      font-weight: bold;
      margin-top: 20px;
    }
    ul{
      overflow-x: scroll;
      white-space: nowrap;
      margin-top: 20px;
      font-size: 12px;
      line-height: 18px;
      li{
        width: 30%;
        display: inline-block;
        margin: 0 10px;
        .food{
          &>p:last-child{
            color: #666;
          }
        }
        .price{
          color: red;
          line-height: 30px;
          font-size: 15px;
          justify-content: space-between;
        }
      }
    }
  }
}
::-webkit-scrollbar{
  width: 0;
}
</style>
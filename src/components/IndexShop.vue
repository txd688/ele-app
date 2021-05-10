<template>
  <div class="indexShop flex-container">
    <div class="box-left">
      <img :src="restaurant.image_path" alt=""/>
    </div>
    <div class="box-right">
      <div>
        <i v-if="restaurant.is_premium">品牌</i>
        <span>{{restaurant.name}}</span>
      </div>

      <div class="center-box flex-container">
        <div>
          <van-rate
            v-model="restaurant.rating"
            :size="12"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
            style="margin-right:5px"
          />
          <span>{{restaurant.rating}} </span>
          <span>月售{{restaurant.recent_order_num}}单</span>
        </div>
        <div v-if="restaurant.delivery_mode">
          <span class="blue">{{restaurant.delivery_mode.text}}</span>
        </div>
      </div>

      <div class="bottom flex-container">
        <div>
          <span>￥{{restaurant.float_minimum_order_amount}}起送</span>
          |
          <span>配送费￥{{restaurant.float_delivery_fee}}</span>
        </div>
        <div>
          <span>1km</span>
          |
          <span>{{restaurant.order_lead_time}}分钟</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  name:'IndexShop',
  props:{
    restaurant:Object
  },
  data(){
    return {

    }
  },
  methods:{

  }
}
</script>
<style scoped lang="less">
.indexShop{
  padding: 10px;
  background: #ffffff;
  border-top: 1px solid #ccc;
  .box-left{
    padding-right: 10px;
    img{
      width: 80px;
    }
  }
  .box-right{
    &>div:first-child{
      i{
        background: #ffd21e;
        padding: 1px;
        font-size: 12px;
        font-weight: bold;
        margin-right: 10px;;
      }
      font-size: 13px;
    }
    .center-box{
      font-size: 12px;
      margin:10px 0;
      justify-content: space-between;
      .blue{
        background:#1989fa;
        color: #ffffff;
        padding: 0px 2px;
      }      
    }
    .bottom{
      font-size: 12px;
      justify-content: space-between;
      &>div:last-child{
        color: rgb(126, 126, 126);
      }
    }
  }
}
</style>
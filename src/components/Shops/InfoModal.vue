<template>
  <transition name="van-fade">
    <div class="shopInfo" v-show="showModal">
      <van-overlay :show="show" @click="show = false" z-index="100">
        <div class="flex-container wrapper" @click.stop>
          <div class="block">
            <div class="title flex-container">
              <div><i>品牌</i></div>
              <span>{{data.name}}</span>
            </div>
            <ul class="flex-container">
              <li>{{data.rating}} <div>评分</div></li>
              <li>{{data.recent_order_num}} <div>月售</div></li>
              <li>蜂鸟专送<div>约{{data.order_lead_time}} 分钟</div></li>
              <li>￥{{data.float_delivery_fee}}元 <div>配送费</div></li>
              <li>{{(data.distance/1000).toFixed(1)}}km <div>距离</div></li>
            </ul>
            <div class="notice" >
              <div>—— 公告 ——</div>
              <div>{{data.promotion_info}}</div>
            </div>
            <div class="close"><van-icon @click="$emit('hideModal')" name="close" /></div>
          </div>
        </div>
      </van-overlay>
    </div>
  </transition>
</template>
<script>
export default{
  name:'shopInfo',
  props:{
    data:Object,
    showModal:Boolean
  },
  data(){
    return {
      show:true,
    }
  },
}
</script>
<style scoped lang="less">
.shopInfo{
  .wrapper {
    height: 100%;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .block {
    width: 80%;
    padding: 30px 20px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    .title{
      padding: 0 30px;
      i{
        background: yellow;
        white-space:nowrap;
        border-radius: 1px;
        padding:5px 3px;
        font-size: 13px;
        display: block;
        color: rgb(78, 31, 31);
      }
      span{
        font-size: 20px;
        margin-left: 5px;
        line-height: 25px;
      }
    }
    ul{
      margin-top: 20px;
      li{
        text-align: center;
        flex: 1;
        &>div{
          color: #666;
          font-size: 12px;
          line-height: 25px;
        }
      }
    }
    .notice{
      color: #666;
      text-align: center;
      font-size: 12px;
      margin-top: 20px;
      &>div:last-child{
        text-align: left;
        margin-top: 15px;
        color: black;
      }
    }
    .close{
      position: absolute;
      bottom: -50px;
      font-size: 30px;
      color: white;
      right: 0;
      left: 0;
      text-align: center;
    }
  }
}
</style>
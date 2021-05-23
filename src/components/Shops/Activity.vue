<template>
  <div class="acitivity flex-container">
    <div class="txt">
      <span :style="{background:'#'+data[0].icon_color}" class="tag">{{ data[0].icon_name }}</span>
      <span>{{ data[0].description }}</span>
    </div>
    <div class="count">
      <span @click="showSheet=true">{{ data.length }}个优惠<van-icon name="play" /></span>
    </div>
    <!-- 优惠弹窗 -->
    <transition name="van-slide-up">
      <div class="act-model" v-show="showSheet">
        <div class="title">优惠活动</div>
        <ul>
          <li v-for="(item,index) in data" :key="index">
            <span :style="{ background:'#'+item.icon_color }" class="tag">{{ item.icon_name }}</span>
            <span>{{ item.description }}</span>
          </li>
        </ul>
        <div class="close" @click="showSheet=false">
          <van-icon name="cross" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default{
  name:'Acitivity',
  props:{
    data:Array
  },
  data(){
    return {
      showSheet:false
    }
  },
}
</script>
<style lang="less">
.acitivity{
  font-size: 12px;
  padding:0 40px;
  justify-content:space-between;
  margin-top: 15px;
  margin-bottom: 8px;
  .tag{
    color: white;
    padding: 1px 4px;
    margin-right: 10px;
  }
  .count{
    color: #666;
    i{
      transform: rotate(90deg);
    }
  }
  .act-model{
    background: white;
    position: absolute;
    bottom: 0;
    padding: 20px 30px;
    left: 0;
    right: 0;
    padding-bottom: 110px;
    .close{
      right: 10px;
      position: absolute;
      top: 10px;
      font-size: 20px;
      color: #666;
    }
    .title{
      font-size: 18px;
      text-align: center;
    }
    ul{
      margin-top: 15px;
      li{
        line-height: 30px;
      }
    }
  }
}
</style>
<template>
  <div class="index">
    <router-view></router-view>
    <tabBar :data="tabBarData"></tabBar>
  </div>
</template>
<script>
import tabBar from "@/components/TabBar";
export default{
  name:'Index',
  components:{
    tabBar
  },
  data(){
    return {
      tabBarData:[
        { title: '首页', icon: 'wap-home-o', path: '/home' },
        { title: '订单', icon: 'orders-o', path: '/order' },
        { title: '我的', icon: 'contact', path: '/me' },
      ]
    }
  }
}
</script>
<style scoped lang="less">
.index{
  height: calc(100% - 45px);//切结"+或-"两边要有空格 不然不生效
  width: 100%;
}
</style>
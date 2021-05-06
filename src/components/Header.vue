<template>
  <div class="header_address flex-container">
    <div class="flex-container flex-align-center" v-if="leftBack" @click="$router.go(-1)"><van-icon name="arrow-left" />返回</div>
    <div>{{title}}</div>
  </div>
</template>
<script>
export default{
  name:'Header',
  props:{
    title:{
      type:String,
      default:'标题'
    },
    leftBack:{
      type:Boolean,
      default:true
    }
  }
}
</script>
<style scoped lang="less">
.header_address{
  background: #1989fa;
  padding: 15px 10px;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  &>div:last-child{
    flex:1;
    text-align: center;
  }
}
</style>
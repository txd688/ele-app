<template>
  <div class="tabber">
    <router-link
      v-for="(item,index) in data"
      :key="index"
      :to="item.path"
      active-class="action"
    >
     <van-icon class="icon" :name="item.icon" />
    <div class="title">{{ item.title }}</div>
    </router-link>
  </div>
</template>
<script>
export default{
  name:'Tabber',
  props:{
    data:Array
  }
}
</script>
<style scoped lang="less">
.tabber{
  bottom: 0px;
  height: 45px;
  position:absolute;
  display: flex;
  width: 100%;
  &>a{
    flex:1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: rgb(151, 145, 145);
    text-decoration:none;
    font-size: 14px;
    .icon{
      margin-bottom: 5px;
      font-size: 18px;
    }
  }
  .action{
    color: #02b6fd;
  }
}
</style>
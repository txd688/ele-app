<template>
  <div class="location">
    <div class="title">当前定位</div>
    <div class="des flex-container flex-align-cente" @click="$emit('click')">
      <svg-icon class="icons" iconClass="cursor"></svg-icon>
      <div class="address overOmitLine">{{address}}</div>
    </div>
  </div>
</template>
<script>
export default{
  name:'Location',
  props:{
    address:String
  }
}
</script>
<style scoped lang="less">
.location{
  padding: 15px 20px;
  background: #ffffff;
  .icons {
    margin-right: 12px;
    color: #1989fa;
    font-size: 18px;
  }
  .des{
    margin-top: 10px;
    .address{
      font-weight: bold;
      font-size: 16px;
    }
  }
}

</style>
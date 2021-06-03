<template>
  <div class="MyAddress">
    <Header title="我的地址"/>
    <div @click="addAddress" class="address">
      <van-icon name="add" />新增收货地址
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header"
export default{
  name:'MyAddress',
  components:{
    Header
  },
  methods:{
    addAddress(){
      this.$router.push("/addAddress")
    }
  }
}
</script>

<style scoped lang='less'>
.MyAddress{
  .address{
    background-color: white;
    padding: 15px 25px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    color: #0085ff;
    font-size: 16px;
    text-align: center;
    i{
      margin-right: 8px;
      font-size: 18px;
    }
  }
}
</style>
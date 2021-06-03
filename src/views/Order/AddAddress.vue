<template>
  <div class="addAddress">
    <Header title="添加地址"/>
  </div>
</template>
<script>
import Header from "@/components/Header"
export default{
  name:'AddAddress',
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
.addAddress{

}
</style>
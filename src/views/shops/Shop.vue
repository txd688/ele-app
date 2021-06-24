<template>
  <div class="shop" v-if="shopInfo">
    <nav class="header">
      <div class="nav_bg">
        <img :src="shopInfo.rst.scheme" alt=""/>
      </div>
      <van-icon name="arrow-left" class="arrow-left" @click="$router.push('/home')" style="z-index:5"/>
      <div class="shop_img">
        <img :src="shopInfo.rst.image_path" alt="" />
      </div>
    </nav>
      <div class="title"><div class="overOmitLine" @click="showModal=true">{{shopInfo.rst.name}}</div><van-icon name="play" class="icon"/></div>
      <div class="order">
        <span>评分{{shopInfo.rst.rating}}</span>
        <span>月售{{shopInfo.rst.recent_order_num}}</span>
        <span>蜂鸟专送约{{shopInfo.rst.recent_order_num}}分钟</span>
      </div>
      <Activity :data="shopInfo.rst.activities"/>
      <div class="notice">公告：{{shopInfo.rst.promotion_info}}</div>
      <van-sticky :offset-top="0" zIndex="10">
        <van-tabs :active="activeName" @click="childPage">
          <van-tab title="点餐" name="goods"></van-tab>
          <van-tab title="评价" name="comments"></van-tab>
          <van-tab title="商家" name="seller"></van-tab>
        </van-tabs>
      </van-sticky>
      <keep-alive>
        <router-view/>
      </keep-alive>
      
    <!-- 弹窗 -->
    <InfoModal :data="shopInfo.rst" :showModal="showModal" @hideModal="hideModal"/>
  </div>
</template>
<script>
import InfoModal from "@/components/Shops/InfoModal";
import Activity from "@/components/Shops/Activity";
export default{
  name:'Shop',
  components:{
    InfoModal,
    Activity,
  },
  data(){
    return {
      shopInfo:null,
      showModal:false,
      activeName:'goods'
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      this.$axios.get('/apis/api/profile/batch_shop').then(res=>{
        // console.log(res.data);
        this.shopInfo = res.data;
      })
    },
    hideModal(){
      this.showModal = false;
    },
    childPage(name){
      if(name==this.activeName)return;
      this.activeName = name;
      this.$router.push('/'+name);
    }
  }
}
</script>
<style scoped lang="less">
.shop{
  overflow-x: scroll;
  height: 100%;
  background: white;
  .header{
    position: relative;
    .arrow-left{
      position: absolute;
      font-weight: bold;
      color: white;
      left: 5px;
      top:5px;
      font-size: 20px;
    }
    .shop_img{
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      text-align: center;
      img{
        height: 80px;
        width: 80px;
        border-radius: 5px;
        margin-top: 65px;
      }
    }
  }
  .title{
    font-size: 18px;
    font-weight: bold;
    width: 70%;
    margin: 0 auto;
    padding: 35px 0 10px 0;
    position: relative;
    display: flex;
    &>div{
      width: 90%;
    }
    .icon{
      position: absolute;
      right: 0;
    }
  }
  .order,.notice{
    font-size: 12px;
    color: #666;
    text-align: center;
    line-height: 20px;
  }
  .notice{
    padding:0 40px;
    text-align: left;
    margin-bottom: 10px;
  }
}
</style>
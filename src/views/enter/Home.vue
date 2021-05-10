<template>
  <div class="home">
    <div class="dvTop" style="padding-bottom:0;">
      <van-row gutter="20" @click="$router.push({name:'address',params:{city}})">
        <van-col span="1"><van-icon name="location" /></van-col>
        <van-col span="18" class="overOmitLine">{{address}}</van-col>
        <van-col span="2"><van-icon style="transform:rotate(90deg)" name="play" /></van-col>
      </van-row>
    </div>
    <div class="dvTop" style="padding-top:0" :class="{'isShow':isShow}">
       <van-search
        placeholder="搜索商家 商家名称"
        input-align="center"
        background="none"
        style="padding:10px 0 0 0;"
        left-icon=""
      />
    </div>
    <!-- 轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(img,index) in bannerImage" :key="index">
        <img :src="img" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 分类 -->
    <van-swipe :show-indicators="false">
      <van-swipe-item v-for="(item,index) in entries" :key="index">
        <van-grid :column-num="5" :border="false" :square="true" :clickable="true" style="background:white">
          <van-grid-item v-for="(i,j) in item" :key="j" :text="i.name">
            <template #icon>
              <img :src="i.image" alt="" style="width:40px;" />
            </template>
          </van-grid-item>
        </van-grid>
      </van-swipe-item>
    </van-swipe>
    <!-- 商品列表 -->
    <div>
      <div class="shopTitle box-padding">—— <span>推荐商家</span> ——</div>
      <FilterView :filterData="filterData" @filterShow="filterShow" @updateData="updateData"/>
    </div>
    
  </div>
</template>
<script>
import FilterView from "@/components/FilterView"
export default{
  name:'Home',
  components:{
    FilterView
  },
  data(){
    return {
      bannerImage:[],
      entries:[],
      filterData:null,
      isShow:false
    }
  },
  computed:{
    address(){
      return this.$store.getters.address;
    },
    city(){
      return this.$store.getters.location.addressComponent.city || this.$store.getters.location.addressComponent.province;
    }
  },
  methods:{
    getData(){
      this.$axios.get("/api2/api/profile/shopping").then(res=>{
        this.bannerImage = res.data.swipeImgs;
        this.entries = res.data.entries;
      });
      this.$axios.get("/api2/api/profile/filter").then(res=>{
        console.log(res.data)
        this.filterData = res.data;
      });
    },
    filterShow(n){
      this.isShow = n;
    },
    updateData(condation){
      console.log(condation)
    }
  },
  created(){
    this.getData();
  }
}
</script>
<style scoped lang="less">
.home{
  .dvTop{
    background: #1989fa;
    padding:15px;
    color: #ffffff;
    font-weight: bold;
    font-size: 16px;
  }
  .my-swipe{
    img{
      width: 100%;
      height:100px;
      object-fit: cover;
    }
  }
  .shopTitle{
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 25px;
    span{
      padding: 0 20px;
    }
  }
  .isShow{
    z-index: 999;
    position: fixed;
    top: 0;
    width:100%;
    box-sizing: border-box;
  }
}
</style>
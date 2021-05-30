<template>
  <div class="home">
    <div class="dvTop" style="padding-bottom:0;">
      <van-row gutter="20" @click="$router.push({name:'address',params:{city}})">
        <van-col span="1"><van-icon name="location" /></van-col>
        <van-col span="18" class="overOmitLine">{{address}}</van-col>
        <van-col span="2"><van-icon style="transform:rotate(90deg)" name="play" /></van-col>
      </van-row>
    </div>
    <div class="dvTop sticky" :class="{'isShow':isShow}" @click="$router.push('/search')">
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
    <template>
      <div class="shopTitle box-padding">—— <span>推荐商家</span> ——</div>
      <FilterView :filterData="filterData" @filterShow="filterShow" @updateData="updateData"/>
    </template>
    <!-- 商家信息 -->
    <template>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getShopMessageData"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
        >
          <IndexShop v-for="(item,index) in restaurants" :key="index" :restaurant="item.restaurant"/>
        </van-list>
      </van-pull-refresh>
    </template>
  </div>
</template>
<script>
import FilterView from "@/components/FilterView"
import IndexShop from "@/components/IndexShop"
export default{
  name:'Home',
  components:{
    FilterView,
    IndexShop
  },
  data(){
    return {
      bannerImage:[],
      entries:[],
      filterData:null,
      isShow:false,
      page:1,
      size:5,
      restaurants:[],
      loading: false,
      finished: false,
      error:false,
      isLoading:false,
      data:null,//
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
      this.$axios.get("/apis/api/profile/shopping").then(res=>{
        this.bannerImage = res.data.swipeImgs;
        this.entries = res.data.entries;
      });
      this.$axios.get("/apis/api/profile/filter").then(res=>{
        // console.log(res.data)
        this.filterData = res.data;
      });
      //this.getShopMessageData();
    },
    getShopMessageData(){
       //拉取商家信息
      return new Promise((resolve, reject)=>{
        this.$axios.post(`/apis/api/profile/restaurants/${this.page}/${this.size}`,this.data).then(res=>{
          this.page++;
          this.restaurants = [...this.restaurants,...res.data];
          this.loading = false;
          if(res.data.length < this.size){
            this.finished = true;
          }
          resolve(res.data);
        },()=>{
          this.error = true;
          this.loading = false;
          reject();
        });
      });
    },
    filterShow(n){
      this.isShow = n;
    },
    //上拉刷新，重置数据
    onRefresh(){
      this.page = 1;
      this.finished = false;
      this.getShopMessageData().then((res)=>{
        this.restaurants = res;
        this.isLoading = false;
      });
    },
    updateData(condation){
      // console.log(condation)
      this.data = condation;
      this.onRefresh();
    },
  },
  created(){
    this.getData();
  }
}
</script>
<style scoped lang="less">
.home{
  height: 100%;
  width: 100%;
  overflow-x: scroll;
  .dvTop{
    background: #1989fa;
    padding:15px;
    color: #ffffff;
    font-weight: bold;
    font-size: 16px;
    box-sizing: border-box;
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
    box-sizing: border-box;
    span{
      padding: 0 20px;
    }
  }
  .isShow{
    position: fixed!important;
    z-index: 999!important;
  }
  .sticky{
    padding-top:0!important;
    position: sticky;
    z-index: 10;
    width:100%;
    top: 0;
  }
}
</style>
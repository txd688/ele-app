<template>
  <div class="search">
    <Header title="搜索" />
    <form action="/">
     <van-search
      v-model="value"
      show-action
      placeholder="输入商家，商品信息"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    </form>
    <div class="shop" v-if="result && !showShop">
      <div v-if="empty" class="empty">
        <img src="../../assets/images/empty.png" alt=""/>
        <div>
          <h4>附近没有搜索结果</h4>
          <span>换个关键词试试吧</span>
        </div>
      </div>
      <div v-else>
        <searchIndex :data="result.restaurants"  @click="$router.push('/shop')"/>
        <searchIndex :data="result.words" @click="clickList"/>
      </div>
    </div>
    <div  v-if="showShop" style="overflow: hidden;height:calc(100% - 90px)">
      <template>
        <FilterView :filterData="filterData"  @updateData="updateData" :style="{'top':0}"/>
      </template>
      <!-- 商家信息 -->
      <div class="container">
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
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header"
import searchIndex from "@/components/SearchIndex"
import FilterView from "@/components/FilterView"
import IndexShop from "@/components/IndexShop"
export default{
  name:'Search',
  components:{
    Header,
    searchIndex,
    FilterView,
    IndexShop
  },
  data(){
    return {
      value:'',
      result:null,
      empty:true,
      showShop:false,
      filterData:null,
      data:null,
      restaurants:[],
      isLoading:false,
      loading: false,
      finished: false,
      error:false,
      page:1,
      size:5,
    }
  },
  created(){
    this.$axios.get("/api2/api/profile/filter").then(res=>{
      this.filterData = res.data;
    });
  },
  methods:{
    keyWordChange(){
      this.$axios.get(`/apis/api/profile/typeahead/${this.value}`).then(res=>{
        this.result = res.data;
      }).catch(()=>{
        this.result = null;
      })
    },
    onSearch(){
      if(!this.value)return;
      if(this.result && (this.result.restaurants.length>0 || this.result.words.length>0)){
        this.clickList();
      }else{
        this.empty = true;
      }
    },
    //点击商家列表
    clickList(){
      this.showShop = true;
    },
    updateData(condation){
      this.data = condation;
      this.onRefresh();
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
    getShopMessageData(){
      // alert(123)
       //拉取商家信息
      return new Promise((resolve, reject)=>{
        this.$axios.post(`/api2/api/profile/restaurants/${this.page}/${this.size}`,this.data).then(res=>{
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
  },
  watch:{
    value(){
      this.empty = false;
      this.showShop = false;
      this.keyWordChange();
    }
  }
}
</script>
<style scoped lang="less">
.search{
  height: 100%;
  width: 100%;
  overflow: hidden;
  .shop{
    height: calc(100% - 98px);
    overflow-x: scroll;
  }
  .empty{
    text-align: center;
    img{
      width: 40%;
    }
    h4{
      font-size: 16px;
      list-style: 30px;
    }
    span{
      line-height: 30px;
    }
    color: rgb(163, 163, 163);
  }
  .container{
    height: calc(100% - 48px);
    overflow-x: scroll;
  }
}
</style>
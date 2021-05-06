<template>
  <div class="city flex-container">
    <div class="search">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入城市名"
        @cancel="$router.replace({name:'address',params:{city}})"
      />
    </div>
    <Location :address="city" v-show="searchList.length === 0" @click="selectCity({name:city})"/>
    <Alphabet  :cityInfo="cityInfo" :keys="keys" ref="allCity" @selectCity="selectCity" v-show="searchList.length === 0" />
    <div class="searchList box-padding" v-show="searchList.length > 0">
      <ul>
        <li v-for="(item,index) in searchList" :key="index" @click="selectCity(item)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import Location from "@/components/Location"
import Alphabet from "@/components/Alphabet"
export default{
  name:'City',
  components:{
    Location,
    Alphabet
  },
  data(){
    return {
      value:"",
      cityInfo:{},
      keys:[],
      allCities:[],
      searchList:[]
    }
  },
  computed:{
    city(){
      return this.$store.getters.location.addressComponent.city || this.$store.getters.location.addressComponent.province;
    }
  },
  created(){
    this.getCityInfo();
  },
  methods:{
    //获取城市信息
    getCityInfo(){
       this.$axios.get("/apis/api/posts/cities",{}).then(res=>{
         this.cityInfo = res.data;
         this.keys = Object.keys(this.cityInfo);
         this.keys.pop();
         this.keys.sort();
         this.$nextTick(()=>{
           this.$refs.allCity.initScroll();
         });
         //存储所有城市，用来搜索过滤
         this.keys.forEach(key=>{
           this.cityInfo[key].forEach(city=>{
             this.allCities.push(city);
           });
         });
       });
    },
     //选择城市
    selectCity(city){
      this.$router.replace({name:"address",params:{city:city.name}});
    },
    //查询城市
    searchCity(){
      if(!this.value){
        this.searchList = [];
      }else{
        this.searchList = this.allCities.filter(item=>{
          return item.name.indexOf(this.value) != -1;
        });
      }
    }
  },
  watch:{
    value(){
      this.searchCity();
    }
  }
 
}
</script>
<style scoped lang="less">
.city{
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  .searchList{
    padding-top: 0!important;
    li{
      line-height: 28px;
      border-bottom: 1px solid #eee;
      padding-left: 20px;
    }
  }
}
</style>
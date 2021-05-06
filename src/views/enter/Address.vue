<template>
  <div class="address flex-container">
    <Header title="选择收获地址"/>
    <div class="search">
      <van-search
        v-model="search_val"
        placeholder="小区/写字楼/学校等"
      >
        <template #label>
          <div class="flex-container flex-align-center" @click="$router.replace('/city');">
            {{city}}
            <van-icon name="arrow-down" class="icon" />
            <span style="padding-right:10px;">|</span>
          </div>
        </template>
      </van-search>
    </div>
    <Location :address="address" @click="selectAddress"/>
    <div class="area">
      <ul>
        <li v-for="(item,index) in searchList" :key="index" @click="selectAddress(item)">
          <h4>{{item.name}}</h4>
          <p>{{item.district + item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Header from "@/components/Header.vue"
import Location from "@/components/Location.vue"
export default{
  name:'Address',
  data(){
    return {
      city:"",
      search_val:"",
      searchList:[]
    }
  },
  components:{
    Header,
    Location
  },
  methods:{
    //搜索
    searchPlace(){
      const self = this;
      AMap.plugin('AMap.Autocomplete', function(){
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: self.city
        }
        var autoComplete= new AMap.Autocomplete(autoOptions);
        autoComplete.search(self.search_val, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          self.searchList = result.tips;
        })
      });
    },
    //点击搜索列表地址
    selectAddress(item){
      if(item){
        this.$store.dispatch("setAddress",item.district + item.address + item.name);
      }else{
         this.$store.dispatch("setAddress",this.address);
      }
      
      this.$router.push("/home")
    }
  },
  computed:{
    address(){
      return this.$store.getters.location.formattedAddress;
    }
  },
  watch:{
    search_val(){
      this.searchPlace();
    }
  },
  beforeRouteEnter(to,form,next){
    next(vm=>{
      vm.city = to.params.city;
    })
  }
}
</script>
<style scoped lang="less">
.address{
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  .icon{
    padding: 0 5px 0 5px;
  }
  .area{
    margin-top: 10px;
    height: auto;
    background: white;
    overflow-x: scroll;
    flex: 1;
    ul{
      height: 100%;
      overflow-x: scroll;
      li{
        padding: 15px 10px;
        h4{
          font-size: 16px;
        }
        p{
          color: #818181;
          margin-top: 5px;
        }
      }
    }
  }
}

</style>
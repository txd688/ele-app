<template>
  <div v-if="showSearch" class="AddressSearch">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入小区/写字楼/学校等"
      @cancel="onCancel"
    />
    <ul>
      <li class="row" v-for="(item,index) in areaList" :key="index" @click="selectAddress(item)">
        <p class="title">{{item.name}}</p>
        <p class="location overOmitLine">{{item.district + item.address}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name:'AddressSearch',
  props:{
    showSearch:Boolean,
    optionTag:Object
  },
  data(){
    return {
      value:'',
      areaList:[]
    }
  },
  methods:{
    onCancel(){
      this.$emit('close');
    },
    selectAddress(item){
      this.optionTag.address = item.name + item.district + item.address;
      this.onCancel();
    }
  },
  computed:{
    city(){
      return this.$store.getters.location.addressComponent.city || this.$store.getters.location.addressComponent.province;
    }
  },
  watch:{
    value(val){
      let self = this;
      AMap.plugin('AMap.Autocomplete', function(){
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: self.city
        }
        var autoComplete= new AMap.Autocomplete(autoOptions);
        autoComplete.search(val, function(status,result) {
          // 搜索成功时，result即是对应的匹配数据
          self.areaList = result.tips;
        })
      })
    },

  }
}
</script>
<style scoped lang="less">
.AddressSearch{
  ul{
    background: #fff;
    li{
      padding: 10px 20px;
      .title{
        font-size: 17px;
      }
      .location{
        color: #666;
        line-height: 22px;
      }
    }
  }
}
</style>
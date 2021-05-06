<template>
  <div class="alphabet box-padding" v-if="keys.length>0" ref="alphabet" >
    <div class="scroll_warp">
      <div class="hot_warp  cityList">
        <div class="title">热门城市</div>
        <ul class="hot_city flex-container">
          <li v-for="(item,index) in cityInfo.hotCities" :key="index" @click="$emit('selectCity',item)">
            {{item.name}}
          </li>
        </ul>
      </div>

      <div class="all_city">
        <div class="city-content cityList" v-for="(item,index) in keys" :key="index">
          <div class="title">{{item}}</div>
          <ul>
            <li v-for="(val,i) in cityInfo[item]" :key="i" @click="$emit('selectCity',val)">{{val.name}}</li>
          </ul>
        </div>
      </div>

      
    </div>
    <div class="area_keys">
      <ul>
        <li @click="selectKey(0)">#</li>
        <li @click="selectKey(index+1)" v-for="(item,index) in keys" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll"
export default{
  name:'Alphabet',
  props:{
    cityInfo:Object,
    keys:Array
  },
  data(){
    return {
      scroll:null
    }
  },
  methods:{
    //在父元素传来有数据后触发
    initScroll(){
      this.scroll = new BScroll(this.$refs.alphabet,{
        click:true
      });
    },
    selectKey(index){
      const cityList = this.$refs.alphabet.getElementsByClassName("cityList");
      let el = cityList[index];
      this.scroll.scrollToElement(el,250);
    }
  }
}
</script>
<style scoped lang="less">
.alphabet{
  overflow: hidden;
  margin-top: 10px;
  position: relative;
  flex: 1;
  padding-top: 0!important;
  .hot_warp{
    .title{
      padding-top: 10px;
      color: rgb(134, 134, 134);
      margin-bottom: 5px;
    }
    .hot_city{
      flex-wrap: wrap;
      padding: 0 20px;
      li{
        padding: 10px 25px;
        background: rgb(243, 242, 242);
        margin: 5px;
        white-space: nowrap;
      }
    }
  }
  .all_city{
    .title{
      color: #c2bdbd;
      padding:10px 0 15px 0;
    }
    li{
      line-height: 28px;
      border-bottom: 1px solid rgb(247, 247, 247);
    }
  }
  .area_keys{
    color: #c2bdbd;
    position: absolute;
    right: 5px;
    top: 40px;
    line-height: 18px;
    font-size: 13px;
  }
}
</style>
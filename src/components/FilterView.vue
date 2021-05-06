<template>
  <div class="filter_wrap" v-if="filterData">
    <van-overlay :show="show" @click="isShow(false)" :z-index="10"/>
    <aside class="filter flex-container" :class="{'isShow':show}">
      <div 
        v-for="(item,index) in filterData.navTab" 
        :key="index" 
        :class="{'filter-bold':currentFilter==index}"
        @click="filterSort(index)"
      >
        {{item.name}}
        <span v-if="item.icon">
          <svg-icon v-if="item.icon=='filter'" iconClass="funnel"  style="font-size:12px;"></svg-icon> 
          <van-icon v-else name="play"   class="rotate"/>
        </span>
      </div>
    </aside>
    <!-- 排序 -->
    <div v-if="show" class="filterSort">
      <ul>
        <li 
          v-for="(item,index) in filterData.sortBy" 
          :key="index" 
          class="flex-container flex-align-center" 
          :class="{'blue':sort==index}"
          @click="clickSort(index,item)"
        >
          <span>{{item.name}}</span>
          <van-icon v-show="sort==index" name="success" />
        </li>
      </ul>
    </div>
    
  </div>
</template>
<script>
export default{
  name:'FilterView',
  props:{
    filterData:Object
  },
  data(){
    return {
      currentFilter:0,
      show:false,
      sort:0
    }
  },
  methods:{
    filterSort(index){
      this.currentFilter = index;
      switch(index){
        case 0:
          this.isShow(true);
          break;
        case 1:
        case 2:
          this.$emit("updateData",{
            condation:this.filterData.navTab[index].condition
          });
          this.isShow(false);
          break;
        default:
          this.isShow(false);
          break;
      }
    },
    isShow(b){
      this.show = b;
      this.$emit("filterShow",b);
    },
    clickSort(index,item){
      this.sort = index;
      this.filterData.navTab[0].name = this.filterData.sortBy[index].name;
      this.isShow(false);
      //更新数据
      this.$emit("updateData",{condation:item.code});
    }
  }
}
</script>
<style scoped lang="less">
.filter_wrap{
  .filter{
    position: relative;
    background: white;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    z-index: 1000;
    &>div{
      flex:auto;
      text-align: center;
    }
  }
  .filterSort{
    background: white;
    z-index: 1000;
    position: fixed;
    top: 99px;
    color: #333;
    font-size: 14px;
    line-height: 40px;
    padding:0 20px 0 10px;
    width:100%;
    box-sizing: border-box;
    li{
      width: 100%;
      justify-content: space-between;
    }
  }
}
.rotate{
  transform: rotate(90deg);
}
.filter-bold{
  font-weight: bold;
  color: #333;
}
.isShow{
  position: fixed!important;
  width: 100%;
  top: 59px;
}
.blue{
  color:#1989fa!important;
}
</style>
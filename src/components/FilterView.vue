<template>
  <div class="filter_wrap" v-if="filterData">
    <van-overlay :show="show || isScreen" @click="hide()" :z-index="10"/>
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
    <!-- 筛选 -->
    <div v-if="isScreen" class="filterSort screen">
      <div class="filter-sort">
        <div v-for="(screen,index) in filterData.screenBy" :key="index">
          <div class="title">{{screen.title}}</div>
          <ul class="flex-container">
            <li v-for="(item,i) in screen.data" :key="i" class="flex-container">
              <div class="flex-container flex-align-center" :class="{'selected':item.select}" @click="selectScreen(item,screen)">
                <img v-if="item.icon" :src="item.icon" alt=""/>
                <span>{{item.name}}</span>
              </div>
              
            </li>
          </ul>
        </div>
        <div class="buttons">
          <button :class="{'edit':edit}" @click="clearSelect">清空</button>
          <button @click="filterOk">确定</button>
        </div>
      </div>
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
      sort:0,
      isScreen:false
    }
  },
  methods:{
    filterSort(index){
      this.currentFilter = index;
      switch(index){
        case 0:
          this.show = true;
          this.emitShow();
          break;
        case 1:
        case 2:
          this.$emit("updateData",{
            condation:this.filterData.navTab[index].condition
          });
          this.hide();
          break;
        case 3:
          this.isScreen = true;
          this.emitShow();
          break;
        default:
          this.hide();
          break;
      }
    },
    hide(){
      this.isScreen = false;
      this.show = false;
      this.$emit("filterShow",false);
    },
    emitShow(){
      this.$emit("filterShow",true);
    },
    clickSort(index,item){
      this.sort = index;
      this.filterData.navTab[0].name = this.filterData.sortBy[index].name;
      this.hide();
      //更新数据
      this.$emit("updateData",{condation:item.code});
    },
    selectScreen(item,screen){
      if(screen.id !="MPI"){
        //单选
        screen.data.forEach(ele=>{
          ele.select = false;
        });
      }
      item.select = !item.select;
    },
    clearSelect(){
      this.filterData.screenBy.forEach(screen=>{
        screen.data.forEach(item=>{
          item.select = false;
        });
      });
    },
    filterOk(){
      let mpiStr = "";
      let screenData = {
        MPI:"",
        offer:"",
        per:""
      }
      this.filterData.screenBy.forEach(e=>{
        e.data.forEach((item)=>{
          if(item.select){
            //两种情况 单选 多选
            if(e.id !== "MPI"){
              //单选
              screenData[e.id] = item.code;
            }else{
              mpiStr += item.code + ',';
              screenData[e.id] = mpiStr;
            }
          }
        });
      });
      this.$emit("updateData",{condation:screenData});
      this.hide();
    }
  },
  computed:{
    edit(){
      let edit = false;
      this.filterData.screenBy.forEach(e=>{
        e.data.forEach(item=>{
          if(item.select){
            edit = true;
          }
        })
      });
      return edit;
    }
  }
}
</script>
<style scoped lang="less">
.filter_wrap{
  position: sticky;
  z-index: 10;
  top: 58px;
  background: white;
  .filter{
    position:static;
    background: white;
    top: 59px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    z-index: 10;
    &>div{
      flex:auto;
      text-align: center;
    }
  }
  .filterSort,.screen{
    background: white;
    z-index: 10;
    position: fixed;
    top: 99px;
    color: #333;
    font-size: 14px;
    line-height: 40px;
    padding:0 20px;
    width:100%;
    box-sizing: border-box;
    li{
      margin-bottom: 8px;
      justify-content: space-between;
    }

  }
  .screen{
    top:49px;
    padding-bottom: 50px;
    padding:10px 10px 50px 10px;
    .title{
      margin-bottom: 10px;
    }
    ul{
      flex-wrap: wrap;
      li{
        width:30%;
        margin-bottom: 8px;
        justify-content: center;
        div{
          width: 90%;
          background: rgb(245, 243, 243);
          white-space: nowrap;
          justify-content: center;
          span{
            line-height: 35px;
          }
        }
      }
    }
    img{
      width: 15px;
      height: 15px;
      padding-right: 5px;
    }  
    .buttons{
      border-top: 1px rgb(228, 228, 228) solid;
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      &>button:first-child{
        background: none;
        color: #ccc;
      }
      &>button:last-child{
        background: #07c160;
        color: white;
      }
      button{
        width: 50%;
        border: 0;
      }
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
  z-index: 999;
}
// .sticky{
//   position: sticky!important;
//   width: 100%;
//   top: 59px;
// }
.blue{
  color:#1989fa!important;
}
.selected{
  background: #e0ebf7!important;
  color: #1989fa!important;
}
.edit{
  color: #333!important;
}
</style>
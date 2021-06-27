<template>
  <div class="remark">
    <Header title="订单备注"/>
    <div class="content">
      <textarea placeholder="填写额外对餐厅或骑手小哥备注的信息" v-model="text" rows="5"></textarea>
      <div class="tag">
        <div class="radio">
          <ul>
            <li v-for="(item,index) in radioItem" :key="index" @click="handleRadio(item)" :class="{'actTag':item.select}">{{item.title}}</li>
          </ul>
        </div>
        <span v-for="(item,index) in swithItem" :key="index" @click="item.select=!item.select" :class="{'actTag':item.select}">{{item.title}}</span>
      </div>
    </div>
    <div class="button">
      <van-button type="success" @click="submit">确定</van-button>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default{
  name:'Remark',
  components:{
    Header
  },
  data(){
    return{
      radioItem:[
        {title:'不要辣',select:false}, 
        {title:'少点辣',select:false}, 
        {title:'多点辣',select:false}, 
      ],
      swithItem:[
       {title:'不要香菜',select:false}, 
       {title:'不要洋葱',select:false}, 
       {title:'多点醋',select:false}, 
       {title:'多点葱',select:false}, 
      ],
      switch:'',
      text:''
    }
  },
  methods:{
    handleRadio(item){
      this.radioItem.forEach(ele=>{
        ele.select = false;
      });
      item.select = true;
    },
    submit(){
      let selectItem = '';
      this.radioItem.forEach(ele=>{
        if(ele.select){
          selectItem += ele.title+',';
        }
      });
      this.swithItem.forEach(ele=>{
        if(ele.select){
          selectItem += ele.title+',';
        }
      });
      selectItem += this.text;

      this.$store.dispatch("setRemarkInfo",{
        tableware:this.$store.getters.remarkInfo.tableware,
        remark:selectItem
      });
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  margin: 8px 0;
  background: #fff;
  padding: 15px;
  textarea{
    width:100%;
    padding: 20px 15px;
    box-sizing: border-box;
    background: #eeeeee;
    border-radius: 3px;
    border: 1px solid #cccccc;
    font-size: 13px;
  }
  .tag{
    flex-wrap: wrap;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    span,.radio{
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      color: #666;
      margin-right: 10px;
      white-space:nowrap;
      margin-bottom: 10px;
      display: block;
      width: max-content;
    }
    .radio{
      padding:0;
      ul{
        display: flex;
        li{
          padding:10px;
          border-right: 1px solid #cccccc;
        }
        &>li:last-child{
          border: 0;
        }
      }
    }
  }
  .actTag{
    color:#2395ff!important;
    background: #eef7ff!important;
    border-color: rgba(35,149,225,0.18)!important;
  }
}
.button{
  margin-top: 10px;
  display: flex;
  justify-content: center;
  &>button{
    width:90%;
    background: #07c160;
    color: #fff;
    border: 0;
  }
}
</style>

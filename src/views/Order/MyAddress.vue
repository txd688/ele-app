<template>
  <div class="MyAddress">
    <Header title="我的地址"/>

    <div class="address-view">
      <div class="card flex-container" v-for="(item,index) in allAddress" :key="index">
        <div class="active">
          123
        </div>
        <div class="main">
          <div class="top">
            <span>{{item.name}}</span>
            <span class="sex" v-if="item.sex">{{item.sex}}</span>
            <span>{{item.phone}}</span>
          </div>
          <div class="cardAddress">
            <span class="tag" v-if="item.tag">{{item.tag}}</span>
            <span>{{item.address}}</span>
          </div>
        </div>
        <div class="right">
          <van-icon name="edit" @click="handleEdit(item)"/>
          <van-icon name="cross" @click="handleDel(item,index)"/>
        </div>
      </div>
    </div>

    <div @click="addAddress" class="address">
      <van-icon name="add" />新增收货地址
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header"
export default{
  name:'MyAddress',
  components:{
    Header
  },
  data(){
    return {
      allAddress:[]
    }
  },
  created(){
    this.getData();
  },
  beforeRouteEnter(to,from,next){
    next(vm=>vm.getData())
  },
  methods:{
    addAddress(){
      this.$router.push({
        name:"addAddress",
        params:{
          title:"添加地址",
          addressInfo:{
            name:'',
            bottom:'',
            address:'',
            sex:'',
            tag:'',
            phone:''
          }
        }
      });
    },
    getData(){
      this.$axios(`apis/api/user/user_info/${localStorage.ele_login}`).then(res=>{
        console.log(res)
        this.allAddress = res.data.myAddress;
      })
    },
    handleEdit(address){
      this.$router.push({
        name:'addAddress',
        params:{
          title:'编辑地址',
          addressInfo:address
        }
      })
    },
    handleDel(address,index){
      this.$axios.delete(`apis/api/user/address/${localStorage.ele_login}/${address._id}`).then(()=>{
        this.allAddress.splice(index,1)
      });
    }
  }
}
</script>

<style scoped lang='less'>
.MyAddress{
  .address-view{
    .card{
      padding: 15px 15px 30px 15px;
      border-bottom: 1px solid #ccc;
      .active{
        width:40px;
      }
      .main{
        color: #666;
        flex:1;
        .top{
          font-size: 16px;
          span{
            margin-right: 5px;
            line-height: 25px;
          }
          &>span:first-child{
            color: black;
            font-weight: bold;
          }
        }
        .cardAddress{
          display: flex;
          align-items: center;
          .tag{
            border: 1px solid rgb(223, 153, 48);;
            color: rgb(223, 153, 48);
            width:38px;
            display:inline-block; 
            text-align: center;
            white-space:nowrap;
            margin-right: 4px;
            line-height: 18px;
          }
          &>span:last-child{
            line-height: 18px;
          }
        }
      }
      .right{
        width: 50px;
        display:flex;
        justify-content:space-around;
        align-items:center;
        color:#666;
        i{
          font-size:20px;
         
        }
      }
    }
  }
  .address{
    background-color: white;
    padding: 15px 25px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    color: #0085ff;
    font-size: 16px;
    text-align: center;
    i{
      margin-right: 8px;
      font-size: 18px;
    }
  }
}
</style>
<template>
  <div class="addAddress">
    <Header :title="title"/>
    <template v-if="!showSearch">
      <van-cell-group >
        <van-field v-model="addressInfo.name" label="联系人" placeholder="姓名" label-width='50px'/>
        <van-field  label=" " placeholder="" label-width='50px'>
          <template #input>
            <div class="tag">
              <span v-for="(item,index) in gender" :key="index" @click="addressInfo.sex=item" :class="{'actTag':addressInfo.sex==item}">{{item}}</span>
            </div>
          </template>
        </van-field>
        <van-field v-model="addressInfo.phone" label="电话" placeholder="手机号码" label-width='50px'/>
        <van-field label="地址" :clickable='true' v-model="addressInfo.address" placeholder="小区/写字楼/学校等" readonly label-width='50px' right-icon="arrow" @click="showSearch=true"/>
        <van-field label="门牌号" v-model="addressInfo.bottom" type="textarea" placeholder="10号楼5层501室222"  label-width='50px' right-icon="edit"  rows="2"/>
        <van-field label="标签" placeholder="手机号码" label-width='50px'>
          <template #input>
            <div class="tag">
              <span v-for="(item,index) in tags" :key="index" @click="addressInfo.tag=item" :class="{'actTag':addressInfo.tag==item}">{{item}}</span>
            </div>
          </template>
        </van-field>
      </van-cell-group>
      <div class="button" @click="enter">
        <van-button type="primary">确定</van-button>
      </div>
    </template>

    <AddressSearch :showSearch="showSearch" @close="close" :optionTag="addressInfo"/>
  </div>
</template>
<script>
import Header from "@/components/Header"
import AddressSearch from "@/components/Orders/AddressSearch"
export default{
  name:'AddAddress',
  components:{
    Header,
    AddressSearch
  },
  data(){
    return  {
      tags:['家','学校','公司'],
      gender:['先生','女士'],
      showSearch:false,
      title:'',
      addressInfo:{ }
    }
  },
  beforeRouteEnter(to,form,next){
    next(vm=>{
      vm.addressInfo = to.params.addressInfo;
      vm.title = to.params.title;
      // alert(to.params.title)
    });
  },
  methods:{
    close(){
      this.showSearch = false;
    },
    enter(){
      if(!this.addressInfo.name){
        this.$toast('请输入联系人');
        return;
      }
      if(!this.addressInfo.phone){
        this.$toast('请输入手机号码');
        return;
      }
      if(!this.addressInfo.address){
        this.$toast('请输入地址');
        return;
      }
      if(this.title=='编辑地址'){
        this.editUser();
      }else{
        this.saveUser();
      }
    },
    editUser(){
      this.$axios.post(`apis/api/user/edit_address/${localStorage.ele_login}/${this.addressInfo._id}`,this.addressInfo).then(()=>{
        this.$router.push("/myAddress");
      });
    },
    saveUser(){
      this.$axios.post(`apis/api/user/add_address/${localStorage.ele_login}/`,this.addressInfo).then(()=>{
        this.$router.push('myAddress');
      }).catch(err=>{
        console.log(err);
      });
    }
  }
}
</script>

<style scoped lang='less'>
.addAddress{
  .tag{
    span{
      padding: 5px 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
      color: #666;
      margin-right: 10px;
    }
  }
  .button{
    display: flex;
    justify-content: center;
    margin-top: 25px;
    button{
      width:90%;
    }
  }
}
.actTag{
  color:#2395ff!important;
  background: #eef7ff!important;
  border-color: rgba(35,149,225,0.18)!important;
}
</style>
<style>
.van-field__body{
  align-items: flex-start;
}
</style>
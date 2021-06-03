<template>
  <div class="me">
    <header>
      <div class="logo">
        <img src="../../assets/images/head.png" alt=""/>
      </div>
      <div class="user">
        <div class="title overOmitLine" v-if="userInfo">{{userInfo._id}}</div>
        <div class="title" @click="handleLogin" v-else>登录/注册</div>
        <p v-if="userInfo">{{encryptPhone(userInfo.phone)}}</p>
        <p v-else>登录后享受更多特权</p>
      </div>
      <div class="icon">
        <van-icon name="arrow" />
      </div>
    </header>
    <div v-if="userInfo">
      <div class="address" @click="myAddress">
        <van-icon name="location"  />
        我的地址
        <van-icon name="arrow" />
      </div>
      <div class="logout" @click="handleLogout">退出登录</div>
    </div>
  </div>
</template>
<script>
export default{
  name:'Me',
  data(){
    return {
      userInfo:''
    }
  },
  beforeRouteEnter(to,form,next){
    next(vm=>vm.getData());
  },
  methods:{
    handleLogin(){
      this.$router.push('/login');
    },
    getData(){
      const user_id = localStorage.ele_login;
      this.$axios(`/apis/api/user/user_info/${user_id}`).then(res=>{
        this.userInfo = res.data;
      })
    },
    encryptPhone(phone){
      return phone.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2");
    },
    handleLogout(){
      localStorage.removeItem("ele_login");
      this.$router.push("/login");
    },
    myAddress(){
      if(this.userInfo.myAddress.length>0){
        this.$router.push("/myAddress");
      }else{
        this.$router.push("/addAddress");
      }
    }
  }
}
</script>
<style scoped lang="less">
.me{
  header{
    background-image: linear-gradient(90deg, #0af, #0085ff);
    padding: 6.666667vw 4vw;
    color: #fff;
    display: flex;
    align-items: center;
    .logo{
      width: 60px;
      height: 60px;
      position: relative;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 15px;
      img{
        top: 0px;
        position: absolute;
        height: auto;
      }
    }
    .user{
      .title{
        font-size: 18px;
        font-weight: bold;
        white-space: nowrap;
        margin-bottom: 10px;
        width:60%;
      }
      p{
        font-size: 12px;
      }
    }
    .icon{
      position: absolute;
      right:4vw;
      font-size: 18px;
    }
  }
  .address,.logout{
    background-color: white;
    padding: 15px 25px;
    margin-top: 10px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    &>i:first-child{
      color: #0085ff;
      margin-right: 5px;
    }
    &>i:last-child{
      position: absolute;
      right: 10px;
    }
  }
  .logout{
    margin-top: 20px;
    border: 1px solid #ccc;
    color: #ff5339;
    border-radius: 0.8vw;
    text-align: center;
    font-weight: bold;
  }
}
</style>
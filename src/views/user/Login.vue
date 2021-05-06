<template>
  <div class="login">
    <img src="@/assets/images/logo.jpg" alt=""/>
    <inputGroup 
      v-model="phone"
      type="number"
      placeholder="请输入手机号" 
      :btnTitle="btnTitle" 
      name="phone" 
      :disabled="disabled" 
      :error="error.phone"
      @btnClick="getCode"
    />
    <inputGroup 
      type="number"
      v-model="verificatyCode" 
      placeholder="请输入验证码" 
      name="verificatyCode" 
      :disabled="disabled" 
      :error="error.verificatyCode"
    />
    <div class="login-des">
      新用户登录时即自动注册，表示已同意<span>《用户服务协议》</span>
    </div>
    <div class="button">
      <button :disabled="isClick" @click="login">登录</button>
    </div>
  </div>
</template>
<script>
import inputGroup from "@/components/InputGroup"
export default {
  name:'login',
  data() {
    return {
      phone:null,
      btnTitle:'获取验证码',
      verificatyCode:null,
      disabled:false,
      error:{},
    };
  },
  methods: {
    getCode(){
      if(this.isPhone()){
        this.codeDown();
        //发送请求
        this.$axios.post('/apis/api/posts/sms_send',{
          phone: '17610351502'
        }).then((res)=>{
          console.log(res)
        });
      }
    },
    //验证手机号
    isPhone(){
      if(!this.phone){
        this.error = {
          phone:'手机号不能为空'
        };
        return false;
      } else if(!/^1[35678]\d{9}$/.test(this.phone)) {
        this.error = {
          phone:'请填写正确的手机号'
        };
        return false;
      } else {
        this.error = {};
        return true;
      }
    },
    //验证码倒计时
    codeDown(){
      let time = 60;
      this.disabled = true;
      this.btnTitle = time + '秒重试';
      let set = setInterval(() => {
        if(time === 0){
          clearInterval(set);
          this.btnTitle = '获取验证码';
          this.disabled = false;
        }else{
          time--;
          this.btnTitle = time + '秒重试';
        }
      },1000);
    },
    login(){
      this.error = {};
      //发送登录请求
      this.$axios.post("/apis/api/posts/sms_back",{
        // phone: this.phone,
        phone: '17610351502',
        code: this.verificatyCode
      }).then(res=>{
        console.log(res);
        localStorage.setItem("ele_login",true);
        this.$router.push("/");
      }).catch(err=>{
        this.error = {
          verificatyCode:err.response.data.msg
        }
      })
    }
  },
  computed:{
   isClick(){
     if(!this.phone || !this.verificatyCode){
       return true;
     }else{
       return false;
     }
   }
  },
  mounted() {},
  components: {
    inputGroup
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 30px 40px;
  box-sizing: border-box;
  img{
    width: 200px;
    margin-top: 20%;
    margin-bottom: 40px;
  }
  .login-des{
    text-align: left;
    line-height: 20px;
    margin-bottom: 20px;
    font-size: 14px;
    span{
      color: #02b6fd;
    }
  }
  .button{
    button{
      font-weight: bold;
      width: 100%;
      border:none;
      background: #1989fa;
      line-height: 34px;
      color: #fff;
      border-radius: 3px;
      outline: none;
      &:disabled{
       background: #5daeff;
      }
    }
    
  }
}
</style>

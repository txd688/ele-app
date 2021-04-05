<template>
  <div class="login">
    <img src="../assets/images/logo.jpg" alt=""/>
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
      :value="verificatyCode" 
      placeholder="请输入验证码" 
      name="verificatyCode" 
      :disabled="disabled" 
      :error="error.verificatyCode"
    />
    <div class="login-des">
      新用户登录时即自动注册，表示已同意<span>《用户服务协议》</span>
    </div>
    <div class="button">
      <button>登录</button>
    </div>
  </div>
</template>
<script>
import inputGroup from "../components/InputGroup"
export default {
  name:'login',
  data() {
    return {
      phone:'',
      btnTitle:'获取验证码',
      verificatyCode:'',
      disabled:false,
      error:{}
    };
  },
  methods: {
    getCode(){
      if(this.isPhone()){
        this.codeDown();
        //发送请求
        this.$axios.post('').then(()=>{

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
      background: red;
      line-height: 34px;
      color: #fff;
      border-radius: 3px;
      outline: none;
    }
  }
}
</style>

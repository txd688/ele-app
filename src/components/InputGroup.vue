<template>
  <div class="inputGroup">
    <div class="input" :class="{'errorBorder':error}">
      <input 
        :type="type" 
        :value="value" 
        :placeholder="placeholder" 
        :name="name" 
        @input="$emit('input',$event.target.value)" 
      />
      <button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')">{{ btnTitle }}</button>
    </div>
    <div class="error">{{ error }}</div>
  </div>
</template>
<script>
export default {
  name:'inputGroup',
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: String,
    placeholder: String,
    name: String,
    btnTitle: String,
    disabled: Boolean,
    error: String
  },
  data() {
    return {};
  },
  mounted() {},
  components: {}
};
</script>
<style lang="less" scoped>
.inputGroup{
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 15px;
  &>div{
    box-sizing: border-box;
  }
  .input {
    width: 100%;
    padding: 2px 10px;
    border: 1px solid #cfcfcf;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    input{
      border: 0;
      outline: none;
      line-height: 30px;
    }
    button{
      border: 0;
      background: none;
      outline: none;
    }
  }
  .error{
    width: 100%;
    margin-top: 5px;
    color: red;
    font-size: 14px;
    text-align: left;
  }
  .errorBorder{
    border: red 1px solid;
  }
}

</style>

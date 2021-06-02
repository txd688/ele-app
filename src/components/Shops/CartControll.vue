<template>
  <div class="cartControll">
    <svg @click.stop="minusFood" v-if="foods.count>0"  xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
    </svg>
    <span v-if="foods.count>0">{{foods.count}}</span>
    <svg @click.stop="addFood" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
    </svg>
  </div>
</template>
<script>
export default{
  name:'CartControll',
  props:{
    foods:Object
  },
  components:{
  },
  data(){
    return {
    }
  },
  created(){
  },
  methods:{
    addFood(){
      this.foods.count++;
    },
    minusFood(){
      this.foods.count--;
    }
  }
}
</script>
<style scoped lang="less">
.cartControll{
  color: #39a9ed;
  display: flex;
  align-items: center;
  font-size: 16px;
  &>*{
    margin: 0 2px;
  }
  span{
    color: rgb(39, 39, 39);
  }
}
</style>
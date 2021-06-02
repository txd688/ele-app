<template>
  <div class="seller" v-if="data">
    <section>
      <img :src="data.header_image" alt=""/>
      <h3>{{data.title}}</h3>
      <p class="moreLine">{{data.brand_intros[0].brief}}</p>
      <div>查看品牌故事</div>
    </section>
  </div>
</template>
<script>
export default{
  name:'Seller',
  components:{
  },
  data(){
    return {
      data:null
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      this.$axios("/apis/api/profile/seller").then(res=>{
        this.data = res.data;
      });
    },
  }
}
</script>
<style scoped lang="less">
.seller{
  section{
    margin-top: 5px;
    padding: 15px;
    h3{
      font-size: 16px;
      font-weight: bold;
      margin-top: 20px;
    }
    p{
      color: #6d7885;
      line-height: 18px;
      margin-top: 8px;
    }
    div{
      font-size: 12px;
      text-align: center;
      color: #6d7885;
      margin-top: 30px;
    }
  }
}
</style>
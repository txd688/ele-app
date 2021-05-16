<template>
  <div class="searchIndex">
    <ul>
      <li v-for="(item,index) in data" :key="index" class="flex-container flex-align-center" @click="$emit('click')">
        <img v-if="item.image_path" :src="item.image_path" alt="" />
        <van-icon name="search" v-else />
        <div class="flex-container">
          <span>{{item.name || item}}</span>
          <span class="rating" v-if="item.rating">评分 {{item.rating}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default{
  name:'SearchIndex',
  props:{
    data:[Object,Array]
  }
}
</script>
<style scoped lang="less">
.searchIndex{
  background: white;
  li{
    padding:0 15px;
    &>*:first-child{
      padding-right: 15px;
    }
    img{
      width: 30px;
      height: 30px;
      object-fit: cover;
    }
    &>div{
      border-bottom: 1px solid #ccc;
      padding:20px 0px 20px 0;
      flex: 1;
      justify-content: space-between;
      .rating{
        color: rgb(138, 138, 138);
      }
    }
    &:last-child{
      &>div{
        border-bottom: 0;
      }
    }
  }
}

</style>
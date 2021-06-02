<template>
  <div class="comments" v-if="data">
    <!-- 商家评分 -->
    <div class="nav flex-container">
      <h4>{{data.rating.shop_score.toFixed(1)}}</h4>
      <div class="shop-info">
        <div>商家评分</div>
        <van-rate
          v-model="value"
          :size="12"
          color="#ffd21e"
          void-icon="star"
          void-color="#eee"
          :gutter="1"
        />
      </div>
      <div>
        <div>味道</div>
        <p>{{data.rating.taste_score.toFixed(1)}}</p>
      </div>
      <div>
        <div>包装</div>
        <p>{{data.rating.package_score.toFixed(1)}}</p>
      </div>
      <div>
        <div>配送</div>
        <p>{{data.rating.rider_score.toFixed(1)}}</p>
      </div>
    </div>
    <!-- 评论区间 -->
    <div class="shopInfo">
      <!-- 标签 -->
      <ul class="tags">
        <li v-for="(item,index) in data.tags" :key="index" :class="{'unsatisfied':item.unsatisfied}">
          {{item.name}}
          <span v-if="item.count>0">{{item.count}}</span>
        </li>
      </ul>
      <!-- 内容 -->
      <ul class="comment-warp">
        <li v-for="(item,index) in data.comments" :key="index" class="flex-container">
          <div class="userImg">
            <img :src="item.avatar" alt=""/>
          </div>
          <div class="commentsInfo">
            <div class="name flex-container">
              <h4>{{item.username}}</h4>
              <small>{{item.rated_at}}</small>
            </div>
            <div class="rating">
              <van-rate
                v-model="item.rating"
                :size="13"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                :gutter="1"
              />
              <span :style="{'color':ratingcountent(item.rating).color}">{{ratingcountent(item.rating).txt}}</span>
            </div>
            <div class="text">{{item.rating_text}}</div>
            <div class="reply">{{item.reply.content}}</div>
            <ul class="comment-image">
              <li v-for="(img,i) in item.order_images" :key="i">
                <img :src="img.image_hash" alt=""/>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default{
  name:'Comments',
  components:{
  },
  data(){
    return {
      data:null,
      value:''
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      this.$axios("/apis/api/profile/comments").then(res=>{
        this.data = res.data;
        this.value=this.data.rating.shop_score;
        console.log(res)
      });
    },
    ratingcountent(rating){
      const content = [
        { txt:'吐槽', color:"rgb(137,159,188"},
        { txt:'较差', color:"rgb(137,159,188"},
        { txt:'一般', color:"rgb(251,154,11"},
        { txt:'满意', color:"rgb(251,154,11"},
        { txt:'超赞', color:"rgb(255,96,0"}
      ];
      return content[rating-1];
    }
  },
}
</script>
<style scoped lang="less">
.nav{
  align-items: center;
  justify-content: space-between;
  border-top: 3px solid #eeeeee;
  border-bottom: 8px solid #eeeeee;
  padding: 20px;
  h4{
    font-size: 30px;
    color: tomato;
  }
  &>div{
    line-height: 25px;
    text-align: center;
  }
}
.shopInfo{
  padding: 15px;
  .tags{
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    li{
      margin-right: 8px;
      background: #ebf5ff;
      padding: 8px;
      white-space:nowrap;
      margin-bottom: 10px;
      color: #6d7885;
    }
  }
}
.unsatisfied{
  color: #aaa!important;
  background: #f5f5f5!important;
}
.comment-warp{
  margin-top: 20px;
  &>li{
    padding: 15px 0;
    border-top: 1px solid #ccc;
  }
  .userImg{
    width: 40px;
    height: 40px;
    img{
      border-radius: 50%;
    }
  }
  .commentsInfo{
    flex: 1;
    margin-left: 10px;
    .name{
       margin-bottom: 8px;
       justify-content: space-between;
       small{
         font-size: 12px;
         color: #6d7885;
       }
    }
    .rating{
      margin-bottom: 8px;
      span{
        font-size: 13px;
        margin-left: 10px;
      }
    }
    .text{
      line-height: 25px;
    }
    .reply{
      background: rgb(238, 238, 238);
      font-size: 12px;
      padding: 10px;
      line-height: 13px;
    }
    .comment-image{
      margin-top: 5px;
      display: flex;
      flex-wrap: wrap;
      li{
        width: 50%;
        padding: 5px;
        box-sizing: border-box;
        img{
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
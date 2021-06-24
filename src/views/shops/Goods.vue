<template>
  <div class="goods" v-if="shopInfo">
    <div class="recommmend" v-for="(recommend,index) in shopInfo.recommend" :key="index">
      <p>{{recommend.name}}</p>
      <ul>
        <li v-for="(item,i) in recommend.items" :key="i">
          <img :src="item.image_path" alt=""/>
          <div class="food">
            <p class="overOmitLine">{{item.name}}</p>
            <p>月售{{item.month_sales}} 好评率{{item.satisfy_rate}}%</p>
          </div>
          <div class="price flex-container">
            <p>￥{{item.activity.fixed_price}}</p>
            <CartControll :foods="item"/>
          </div>
        </li>
      </ul>
    </div>
    <div class="menuview flex-container">
      <van-sidebar v-model="currentIndex"  id="menuScroll">
        <van-sidebar-item v-for="(item,index) in shopInfo.menu" :key="index" :title="item.name" @click="clickMenu"/>
      </van-sidebar>
      <div class="main" ref="foodScroll">
        <ul>
          <li v-for="(item,index) in shopInfo.menu" :key="index" class="foodList">
            <div class="title">
              <strong>{{item.name}}</strong>
              <span>{{item.description}}</span>
            </div>
            <div class="foods flex-container" v-for="(food,i) in item.foods" :key="i" @click="handleFood(food)">
              <img :src="food.image_path" alt=""/>
              <section class="food-info overOmitLine">
                <h4>{{food.name}}</h4>
                <p class="overOmitLine">{{food.description}}</p>
                <p>月售{{food.month_sales}}份 好评率{{food.satisfy_rate}}%</p>
                <div class="price flex-container">
                  <span>￥{{food.activity.fixed_price}}</span>
                  <CartControll :foods="food"/>
                </div>
              </section>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <ShopCar :shopInfo="shopInfo"/>
    <!-- 商品详情 -->
    <Food :food="selectFood" :isShow="showFood" @close="showFood=false"/>
  </div>
</template>
<script>
import CartControll from "@/components/Shops/CartControll";
import ShopCar from "./ShopCar";
import BScroll from "better-scroll"
import Food from "./Food.vue"
export default{
  name:'Goods',
  components:{
    CartControll,
    ShopCar,
    Food
  },
  data(){
    return {
      shopInfo:null,
      active:0,
      foodScr:{},
      scrollY:0,//右侧菜单当前滚动到的y值
      listHeight:[],//12个区列表高度
      selectFood:null,
      showFood:false
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      this.$axios.get('/apis/api/profile/batch_shop').then(res=>{
        res.data.recommend.forEach(recommend=>{
          recommend.items.forEach(item=>{
            item.count = 0;
          });
        });
        res.data.menu.forEach(res=>{
          res.foods.forEach(item=>{
            item.count = 0;
          });
        });
        this.shopInfo = res.data;
        // console.log(this.shopInfo)
        this.$nextTick(()=>{
          this.initScroll();
          //计算12个区域高度
          this.calculateHeight();
        });
      })
    },
    initScroll(){
      this.foodScr = new BScroll(this.$refs.foodScroll,{
        click:true,
        probeType:3
      });
      // new BScroll(this.$refs.menuScroll,{
      //   click:true,
      // });
      this.foodScr.on("scroll",pos=>{
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    clickMenu(e){
      let el = this.$refs.foodScroll.getElementsByClassName("foodList")[e];
      this.foodScr.scrollToElement(el,250);
    },
    calculateHeight(){
      let foodList = this.$refs.foodScroll.getElementsByClassName('foodList');
      let height = 0;
      this.listHeight.push(height);
      for(let i=0;i<foodList.length-1;i++){
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    handleFood(food){
      this.selectFood = food;
      this.showFood = true;
    }
  },
  computed:{
    //根据右侧滚动的位置，确定对应索引下标
    currentIndex:{
      get(){
        for(let i=0;i<this.listHeight.length;i++){
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if(this.scrollY>=height1 && this.scrollY<height2){
            return i;
          }
        }
        return 0;
      },
      set(){}
    }
  },
  watch:{}
}
</script>
<style scoped lang="less">
.goods{
  height: calc(100% - 60px);
  #menuScroll,.main ul{
    padding-bottom: 100px;
  }
  #menuScroll{
    background: #f7f8fa;
  }
  .recommmend{
    &>p{
      font-weight: bold;
      margin-top: 20px;
      margin-left:10px;
    }
    ul{
      overflow-x: scroll;
      white-space: nowrap;
      margin-top: 20px;
      font-size: 12px;
      line-height: 18px;
      padding-bottom: 0!important;
      li{
        width: 30%;
        display: inline-block;
        margin: 0 10px;
        .food{
          &>p:last-child{
            color: #666;
          }
        }
        .price{
          color: red;
          line-height: 30px;
          font-size: 15px;
          justify-content: space-between;
        }
      }
    }
  }
  .menuview{
    height: 100%;
    .main{
      padding: 10px;
      flex: auto;
      width:50%;
      height: 100%;
      overflow: hidden;
      padding-bottom: 0;
      .title{
        padding: 10px 0;
        strong{
          font-weight: bold;
        }
        span{
          color: #666;
          font-size: 13px;
          margin-left: 10px;
        }
      }
      .foods{
        img{
          width:100px;
          margin-right:10px;
        }
        h4{
          font-size: 16px;
          font-weight: bold;
          line-height: 25px;
        }
        p{
          line-height: 20px;
          font-size: 12px;
          color: #666;
        }
        .price{
          font-size: 16px;
          color: red;
          margin-top: 10px;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
::-webkit-scrollbar{
  width: 0;
}
</style>
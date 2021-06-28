import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: () => import('../views/enter/Index.vue'),
    children: [
      {
        path: '',
        redirect:'/home'
      },
      {
        path: "/home",
        name: "home",
        component:()=>import("@/views/enter/Home.vue")
      },
      {
        path: "/order",
        name: "order",
        component:()=>import("@/views/enter/Order.vue")
      },
      {
        path: "/me",
        name: "me",
        component:()=>import("@/views/enter/Me.vue")
      },
      {
        path: "/address",
        name: "address",
        component:()=>import("@/views/enter/Address.vue")
      },
      {
        path: "/city",
        name: "city",
        component:()=>import("@/views/enter/City.vue")
      },     
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/user/Login.vue')
  },
  {
    path: "/search",
    name: "search",
    component:()=>import("@/views/enter/Search.vue")
  },
  {
    path: "/shop",
    redirect:'/goods',
    component:()=>import("@/views/shops/Shop.vue"),
    children:[
      {
        path: "/goods",
        name: "goods",
        component:()=>import("@/views/shops/Goods.vue")
      },   
      {
        path: "/comments",
        name: "comments",
        component:()=>import("@/views/shops/Comments.vue")
      },   
      {
        path: "/seller",
        name: "seller",
        component:()=>import("@/views/shops/Seller.vue")
      },   
    ]
  },
  {
    path: "/myAddress",
    name: "myAddress",
    component:()=>import("@/views/Order/MyAddress.vue")
  },   
  {
    path: "/addAddress",
    name: "addAddress",
    component:()=>import("@/views/Order/AddAddress.vue")
  },   
  {
    path: "/settlement",
    name: "settlement",
    component:()=>import("@/views/Order/Settlement.vue")
  },  
  {
    path: "/remark",
    name: "remark",
    component:()=>import("@/views/Order/Remark.vue")
  },  
  {
    path: "/pay",
    name: "pay",
    component:()=>import("@/views/Order/Pay.vue")
  }, 
  {
    path: "/orderInfo",
    name: "orderInfo",
    component:()=>import("@/views/Order/OrderInfo.vue")
  }, 
];
const router = new VueRouter({
  mode: '',
  base: process.env.BASE_URL,
  routes
});

// 路由守卫
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.ele_login ? true : false;
  if(to.path == "/login"){
    next();
  }else{
    //是否在登录状态下
    isLogin ? next() : next("/login");
  }
});

export default router

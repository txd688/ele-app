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
      {
        path: "/shop",
        name: "shop",
        component:()=>import("@/views/shops/Shop.vue")
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/user/Login.vue')
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

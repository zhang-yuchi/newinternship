import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/index',
    meta:{
      title:"欢迎来到毕业生实习管理系统"
    }
  },
  {
    path:'/index',
    meta:{
      title:"主页"
    },
    component:()=>import('../views/index/index.vue')
  },
  {
    //学生相关路由
    path: '/student',
    component: () => import('../views/student/index.vue'),
    meta:{
      title:"个人中心"
    },
    children:[
      {
        path:"",
        redirect:"/student/msg",
        meta:{
          title:"个人中心"
        }
      },
      {
        path:"msg",
        component:()=>import('../views/student/msg.vue')
      },
      {
        path:"report",
        component:()=>import('../views/student/report.vue')
      },
      {
        path:"secondreport",
        component:()=>import('../views/student/secondreport.vue')
      },
      {
        path:"submit",
        component:()=>import('../views/student/submit.vue')
      },
      {
        path:"changepsw",
        component:()=>import('../views/student/changepsw.vue')
      },
      {
        path:"binding",
        component:()=>import('../views/student/binding.vue')
      },
    ]
  },
  {
    //老师相关路由
    path:'/teacher',
    component:()=>import('../views/teacher/index.vue'),
    // children:[
    //   {
    //     path:"",
    //     redirect:"/teacher/index"
    //   },
    //   {
    //     path:"index",
    //     component:()=>import('../views/teacher/index.vue')
    //   }
    // ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router

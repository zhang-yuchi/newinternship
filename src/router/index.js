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
        redirect:"/student/profile",
        meta:{
          title:"个人中心"
        }
      },
      {
        path:"profile",
        component:()=>import('../views/student/profile.vue'),
        meta:{
          title:"我的信息"
        },
      },
      {
        path:"modify-profile",
        component:()=>import('../views/student/modify-profile.vue'),
        meta:{
          title:"修改信息"
        }
      },
      {
        path:"enterprise",
        component:()=>import('../views/student/enterprise.vue'),
        meta:{
          title:"我的企业"
        }
      },
      {
        path:"enterprise-modify",
        component:()=>import('../views/student/enterprise-modify.vue'),
        meta:{
          title:"修改企业信息"
        }
      },
      {
        path:"report-check/:state",
        component:()=>import('../views/student/report-check'),
        meta:{
          title:"查看报告册"
        }
      },
      {
        path:"report/:state",
        component:()=>import('../views/student/report'),
        meta:{
          title:"填写报告册"
        }
      },
      {
        path:"decision-check",
        component:()=>import('../views/student/decision-check'),
        meta:{
          title:"查看鉴定表"
        }
      },
      {
        path:"decision",
        component:()=>import('../views/student/decision-table'),
        meta:{
          title:"填写鉴定表"
        }
      }
    ]
  },
  {
    //老师相关路由
    path:'/teacher',
    component:()=>import('../views/teacher/index.vue'),
    children:[
      {
        path:"",
        redirect:"/teacher/stu-list",
        meta:{
          title:'学生信息'
        },
      },
      {
        path:"stu-list",
        component:()=>import('../views/teacher/stu-list'),
        meta:{
          title:'学生信息'
        },
      },
      {
        path:"report-list",
        component:()=>import('../views/teacher/report-list'),
        meta:{
          title:'报告册填写情况'
        },
      },
      {
        path:"decision-list",
        component:()=>import('../views/teacher/decision-list'),
        meta:{
          title:'鉴定表填写情况'
        },
      },
      {
        path:"report-check/:stuNo",
        component:()=>import('../views/teacher/report-check'),
        meta:{
          title:'报告册评价'
        },
      },
      {
        path:"decision-check/:stuNo",
        component:()=>import('../views/teacher/decision-check'),
        meta:{
          title:'鉴定表评价'
        },
      }
    ]
    
  }
]

const router = new VueRouter({
  mode: 'hash',
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

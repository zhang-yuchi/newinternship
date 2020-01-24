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
        component:()=>import('../views/student/msg.vue'),
        meta:{
          title:"我的信息"
        }
      },
      {
        path:"report",
        component:()=>import('../views/student/report.vue'),
        meta:{
          title:"报告册第一阶段填写"
        }
      },
      {
        path:"secondreport",
        component:()=>import('../views/student/secondreport.vue'),
        meta:{
          title:"报告册第二阶段填写"
        }
      },
      {
        path:"submit",
        meta:{
          title:"填写鉴定表"
        },
        component:()=>import('../views/student/submit.vue')
      },
      {
        path:"changepsw",
        meta:{
          title:"修改密码"
        },
        component:()=>import('../views/student/changepsw.vue')
      },
      {
        path:"binding",
        component:()=>import('../views/student/binding.vue'),
        meta:{
          title:"绑定企业"
        }
      },
      {
        path:"checkReport",
        component:()=>import('../views/student/checkReport.vue'),
        meta:{
          title:"查看报告册"
        }
      },
      {
        path:"checkSubmit",
        component:()=>import('../views/student/checkSubmit.vue'),
        meta:{
          title:"查看鉴定表"
        }
      },
      {
        path:"mdfmsg",
        component:()=>import('../views/student/mdfmsg.vue'),
        meta:{
          title:"修改个人信息"
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
        redirect:"/teacher/studentlist"
      },
      {
        path:"studentlist",
        component:()=>import('../views/teacher/studentlist.vue')
      },
      {
        path:"reportlist",
        component:()=>import('../views/teacher/reportlist.vue')
      },
      {
        path:"submitlist",
        component:()=>import('../views/teacher/submitlist.vue')
      }
    ]
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

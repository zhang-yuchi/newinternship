import Vue from 'vue'
import VueRouter from 'vue-router'
import { checkToken } from '../network'
import vm from 'element-ui'
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
      },
      {
        path:"download",
        component:()=>import("../views/student/download"),
        meta:{
          title:"文件下载"
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
        redirect:"/teacher/profile",
      },
      {
        path:"profile",
        component:()=>import('../views/teacher/profile'),
        meta:{
          title:'我的信息'
        },
      },
      {
        path:"modify-profile",
        component:()=>import('../views/teacher/modify-profile')
      },
      {
        path:"stu-list",
        component:()=>import('../views/teacher/stu-list'),
        meta:{
          title:'学生列表'
        },
      },
      {
        path:"report-list1",
        component:()=>import('../views/teacher/report-list1'),
        meta:{
          title:'报告册(一)填写情况',
          keepAlive:true
        },
      },
      {
        path:"report-list2",
        component:()=>import('../views/teacher/report-list2'),
        meta:{
          title:'报告册(二)填写情况',
          keepAlive:true
        },
      },
      {
        path:"decision-list",
        component:()=>import('../views/teacher/decision-list'),
        meta:{
          title:'鉴定表填写情况',
          keepAlive:true
        },
      },
      {
        path:"report-check1/:stuNo",
        component:()=>import('../views/teacher/report-check1'),
        meta:{
          title:'报告册(一)评价'
        },
      },
      {
        path:"report-check2/:stuNo",
        component:()=>import('../views/teacher/report-check2'),
        meta:{
          title:'报告册(二)评价'
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
  // console.log(to);
  if(to.path.match(/^\/student/) || to.path.match(/^\/teacher/)){
    // console.log('123');
    // console.log(to.path.match(/student/));
    checkToken().then(res=>{
      // console.log(res);
      if(res.data.status!==100){
        vm.MessageBox({
          title:"身份验证过期",
          message:"请退出重新登录"
        })
        .finally(()=>{
          router.push('/')
        })
      }
    })
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router

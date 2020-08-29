import axios from 'axios'
import qs from 'qs'
import vm from 'element-ui'
let isDev = process.env.NODE_ENV === 'development'
isDev = false
const baseURL = isDev ? "http://hz.nadev.cn:8255/internship" : "http://sx.cdcas.edu.cn:8890/internship"
const service = axios.create({
  baseURL
})
export const baseUrl = baseURL
service.interceptors.request.use((config) => {
  config.headers = Object.assign({}, config.headers, {
    token: sessionStorage.getItem('token')
  })
  // console.log(config.data);
  // console.log(config);
  if(config.url==="/pdf"&&config.method==="delete"){

  }else if(config.url==="/student/info"&&config.method==="post"){
    config.headers['Content-Type'] = "application/json"
  }
  else{
    config.data = qs.stringify(config.data)
  }
  // console.log(config.data);
  return config
})
service.interceptors.response.use((res) => {
  // console.log(res);
  //做全局处理
  const SUCCESS_STATUS = 200
  if (res.status == SUCCESS_STATUS) {
    // console.log(res);
    if(res.data.status===100||res.data.status===1001){
      return res
    }else{
      vm.Message({
        message:res.data.message,
        type:"error"
      })
    }
  } else {
    errorHandle()
  }
})

function getRandom(url) {
  return url + "?t=" + Math.random()
}
export const errorHandle = () => {
  //当catch到错误时触发
  vm.Message({
    message:"服务器开小差了...",
    type:"error"
  })
}
export const getVerify = () => {
  return axios({
    url: baseURL + getRandom("/auth/verifycode"),
    method: "get",
    responseType: "blob"
  })
}
//-------------------主页------------------------------
//登录
export const login = (params) => {
  return service.post('/auth/token', params)
}
//获取新闻
export const getNewsList = () => {
  return service.get('/news')
}
//获取新闻详情
export const getNewsDetail = (id) => {
  return service.get('/news/' + id)
}
export const modifyPassword = (params)=>{
  return service.post('/auth/password',params)
}
//判断token是否过期
export const checkToken = ()=>{
  return service.get(getRandom('/auth/token/expire'))
}
//------------------学生接口----------------------------
//获取学生本人信息
export const getStudentInfo = () => {
  return service.get(getRandom('/student/info'))
}
//学生获取老师信息
export const getTeacherInfo = () => {
  return service.get(getRandom('/student/teacherInfo'))
}
//获取老师列表
export const selectTeacher = () => {
  return service.get(getRandom('/student/teacher'))
}
export const selectTeacherByNo = (params) => {
  return service.post('/student/teacher', params)
}
//修改学生信息
export const modifySelfInfo = (params) => {
  return service.post('/student/info', params)
}
//修改实习开始和结束
export const modifyReportDate = (params) => {
  return service.post('/student2/report/date', params)
}
//学生内部修改密码
export const modifyPswInner = (params) => {
  return service.post('/student/student/password', params)
}
//学生查看企业信息
export const checkCorp = () => {
  return service.get(getRandom('/student/corp'))
}
//学生修改职位
export const modifyPosition = (params) => {
  return service.post('/student/student/position', params,{headers:{
    'Content-Type':'application/x-www-form-urlencoded'
  }})
}
//企业信息更改
export const modifyCorp = (params) => {
  return service.post('/student/corp',params)
}
//获取学生报告册信息
export const getReportInfo = () => {
  return service.get(getRandom('/student/report'))
}
//填写第一阶段报告册
export const submitReportStage1 = (params) => {
  return service.post('/student/report/stage1', params)
}
//填写第二阶段报告册
export const submitReportStage2 = (params) => {
  return service.post('/student/report/stage2', params)
}
export const submitReportDate = (params)=>{
  return service.post("/student/report/date",params)
}
//查看鉴定表
export const getDecisionTable = () => {
  return service.get('/student/appraisal')
}
//提交鉴定表
export const submitDecision = (params) => {
  return service.post('/student/appraisal', params)
}
//获取当前阶段
export const getStage = () => {
  return service.get(getRandom('/user/reportStage'))
}
//下载报告册
export const download = (params) => {
  return service.post('/pdf/convert',params)
}
export const getTask = () => {
  return ser.get('/pdf')
}
export const getTaskList = () => {
  
  return service.get('/pdf')
}
export const deleteTask = (params)=>{
  return service.delete('/pdf',params)
}

//------------------教师接口----------------------------
//获取老师信息
export const getTeacher = () => {
  return service.get(getRandom('/teacher/info'))
}
//修改老师信息
export const modifyTeacher = (params) => {
  return service.post('/teacher/info',params)
}
//获取所有学生
export const getStudentList = () => {
  return service.get(getRandom('/teacher/student'))
}
//获取某个学生鉴定表
export const getStudentIdentify = (stuNo) => {
  return service.get(getRandom('/teacher/student/' + stuNo+'/appraisal'))
}
//教师填写鉴定表
export const completeDecision = (stuNo,params) => {
  return service.post('/teacher/student/' + stuNo+'/appraisal', params)
}
//获取某个学生报告册
export const getStudentReport = (stuNo) => {
  return service.get(getRandom('/teacher/student/' + stuNo+'/report'))
}
//报告册一阶段打分
export const completeRep1 = (stuNo,params) => {
  return service.post('/teacher/student/' + stuNo+'/report/stage1',params)
}
//报告册二阶段打分
export const completeRep2 = (stuNo,params) => {
  return service.post('/teacher/student/' + stuNo+'/report/stage2',params)
}
//报告册综合评价填写
export const completeRepTotal = (stuNo,params) => {
  return service.post('/teacher/student/' + stuNo+'/report/total',params)
}

import axios from 'axios'
import qs from 'qs'
const baseURL = "http://sx.cdcas.edu.cn:8890/"
const service = axios.create({
    baseURL
})
service.interceptors.request.use((config) => {
    config.headers = Object.assign({}, config.headers, {
        Authorization: sessionStorage.getItem('Authorization')
    })
    config.data = qs.stringify(config.data)
    return config
})
service.interceptors.response.use((res) => {
    //做全局处理
    // console.log(res)
    return res
})
function getRandom(url) {
    return url + "?t=" + Math.random()
}
export const getVerify = () => {
    return axios({
        url: baseURL + getRandom("/user/verifycode"),
        method: "get",
        responseType: "blob"
    })
}
//登录
export const login = (params)=>{
    return service.post('/user/login',params)
}
//获取学生本人信息
export const getStudentInfo = ()=>{
    return service.get(getRandom('/student/selfInfo'))
}
//学生获取老师信息
export const getTeacherInfo = () => {
    return service.get(getRandom('/student/teacherInfo'))
}
//修改学生信息
export const modifySelfInfo = (params)=> {
    return service.post('/student/selfInfo',params)
}
//修改实习开始和结束
export const modifyReportDate = (params)=>{
    return service.post('/student2/report/date',params)
}
//学生内部修改密码
export const modifyPswInner = (params) => {
    return service.post('/student/student/password',params)
}
//学生查看企业信息
export const checkCorp = ()=>{
    return service.get(getRandom('/student/student/corp'))
}
//学生修改职位
export const modifyPosition = (params)=>{
    return service.post('/student/student/position',params)
}
//企业信息更改
export const modifyCorp = (params) => {
    return service.post('/student/student/corp',params)
}
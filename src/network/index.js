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
export const login = (params)=>{
    return service.post('/user/login',params)
}
export const getStudentInfo = ()=>{
    return service.get('/student/selfInfo')
}
export const getTeacherInfo = () => {
    return service.get('/student/teacherInfo')
}
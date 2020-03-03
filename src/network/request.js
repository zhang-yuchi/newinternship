import axios from 'axios'
const baseURL = "http://sx.cdcas.edu.cn:8890/"
const service = axios.create({
    baseURL
})
service.interceptors.request.use((config) => {
    config.headers = Object.assign({}, config.headers, {
        token: sessionStorage.getItem('token')
    })
    return config
})
service.interceptors.response.use((res) => {
    //做全局处理
    console.log(res)
    return res
})
export const getVerify = () => {
    return axios({
        url: baseURL + getRandom("/lab/verifycode"),
        method: "get",
        responseType: "blob"
    })
}
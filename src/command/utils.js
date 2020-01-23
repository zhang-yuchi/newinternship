module.exports = {
    routerCheck(that,url){
        if(that.$route.path.indexOf(url)==-1){
            //不是这个路径,直接跳转
            that.$router.replace(url)
        }else{
            //刷新页面
            // that.$router.go(0)
        }
    }
}
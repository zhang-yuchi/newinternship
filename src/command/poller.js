//轮询器 传入url 可以指定时间进行不断请求 同时自带销毁方法
class Poller {
  constructor(options){
    if(!options.axios){
      throw new Error('需要一个axios对象')
    }
    this.axios = options.axios
    this.success = options.success
    this.fail = options.fail
    this.params = null
    this.timer = null//定时器
  }
  start(time){
    if(this.timer){
      throw new Error('当前轮询对象已经启动')
    }
    this._excuteFunction()

    this.timer = setInterval(()=>{
      // console.log(this);
     this._excuteFunction()
      
    },time)
    
  }
  _excuteFunction(){
    this.axios(this.params).then((res)=>{
      this.success(res)
    })
    .catch((err)=>{
      //如果传入fail则执行
      this.fail&&this.fail(err)
    })
  }
  destroy(){
    clearInterval(this.timer)
    this.timer = null
  }
}

export default Poller 
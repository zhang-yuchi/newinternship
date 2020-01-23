//用于将后端字段和前端字段统一  这里将建立所有需要用到的实体对象  这里会把所有后端数据处理到前端,字段改为前端字段

//这里放的是处理数据
Student.prototype.doneStudent = function (Std){
    Std.sex = "男"
    // console.log(obj)
    return Std
}
//这里放的是输出数据
function Student(obj){
    var Std = new _Student(obj)
    console.log(this)
    Std = this.__proto__.doneStudent(Std)
    return Std
}
//这里放的是前端渲染时用的数据以及字段
function _Student(obj){
    this.id = "123"
    this.name = "张宇弛"
    this.college = "信息工程学院"
    this.phone = "18702896918"
    this.isReportFull = 0
    this.isDecisionFull = 0
    this.isReportFinish = 0//老师是否填写
    this.isDecisionFinish = 0
    this.wechat = "zyc111"
    this.sex = 1,
    this.teacherNo = "11111"
    this.teacherPhone = "123456789"
    this.teacherWx = "kkk123"
    this.identity = "510105199810211271"
}


module.exports = {
    Student,
}
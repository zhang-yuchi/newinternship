<template>
  <div class="report-check">
    <el-card class="box-card" :class="state==0?'big-report':''">
      <div slot="header" >
        <span style="color:rgb(64,158,255);" class="clearfix">{{res.name}}的报告册</span>
      </div>
      <div class="text item twoItem">
        <span class="header-title">学院</span>
        <span class="header-content">{{res.college}}</span>
      </div>
      <div class="text item twoItem">
        <span class="header-title">专业</span>
        <span class="header-content">{{res.major}}</span>
      </div>
      <div class="text item twoItem">
        <span class="header-title">学号</span>
        <span class="header-content">{{res.stuNo}}</span>
      </div>
      <div class="text item twoItem">
        <span class="header-title">学院指导教师工号</span>
        <span class="header-content">{{res.teacherNo}}</span>
      </div>
      <div class="text item twoItem">
        <span class="header-title">实习单位</span>
        <span class="header-content">{{res.corpName}}</span>
      </div>
      <div class="text item twoItem">
        <span class="header-title">实习岗位</span>
        <span class="header-content">{{res.corpPosition}}</span>
      </div>
      <div class="text item">
        <span class="header-title">实习日期</span>
        <span class="header-content">{{res.gemStart}} {{res.gmtEnd}}</span>
      </div>

      <div class="state-title">第一阶段</div>
      <form-item title="第一阶段实习总结" :content="res.stage1Summary"></form-item>
      <form-item title="第一阶段实习指导方式" :content="res.stage1GuideWay" time="暂无"></form-item>
       <el-form
        :model="res"
        status-icon
        :rules="rules"
        ref="res"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top">
        <el-form-item label="教师评语" prop="res.stage1Comment">
          <el-input type="textarea" :rows="5" v-model="res.stage1Comment"></el-input>
        </el-form-item>
      </el-form>
      
    </el-card>
  </div>
</template>

<script>
import formItem from "../../components/content/form-block";
import limit from "../../components/content/limit-number";
export default {
  components:{
    formItem,
    limit
  },
  data(){
    return {
      state:'',
      res:{
        name:'王二',
        college:'加载中',
        major:'加载中',
        stuNo:'加载中',
        teacherNo:'加载中',
        corpName:'加载中',
        corpPosition:'加载中',
        gmtStart:'加载中',
        gmtEnd:'加载中',
        stage1Summary:'加载中',
        stage1GuideWay:'加载中',
        stage1Comment:'厉害厉害好好好'
      },
      rules:{}
    }
  },
  
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.twoItem{
  width: 50%;
  float:left
}
.box-card {
  /* width: 480px; */
  width: 80%;
  transition: none;
}
.header-title,
.header-content {
  display: inline-block;
}
.header-title {
  color: #378f8c;
  margin-right: 8px;
}
.header-content {
  width: 350px;
}
.report-check {
  display: flex;
  justify-content: center;
}
/* .big-report {
  width: 80%; */
/* transition: none; */
/* } */
/* .box-card{
  width: 80%;
} */
.summary {
  margin-left: 20px;
  width: 456px;
}
.Divider {
  padding: 10px 0;
  color: rgb(64, 158, 255);
  /* border-bottom: 1px solid #ddd; */
}
.state-title{
  padding: 10px 0;
  font-weight: 700;

}
</style>
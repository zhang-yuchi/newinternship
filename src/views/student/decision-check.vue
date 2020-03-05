<!--  -->
<template>
  <div class>
    <el-card class="box-card" v-loading="cardLoading">
      <div  class="decision-title">
        <div style="display:inline-block;">我的鉴定表</div>
        <el-button type="primary" style="float:right;" :loading="btnLoading" @click="downloadPdf">下载pdf</el-button>
      </div>

      <div class="Divider">个人实习</div>
      <form-item title="实习内容" :content="decision.sxContent"></form-item>
      <form-item title="实习生自我总结" :content="decision.selfSummary"></form-item>
      <div class="Divider">评价</div>
      <form-item title="实习单位指导老师评语" :content="decision.corpTeacherOpinion" :time="decision.cTODate"></form-item>
      <form-item title="实习单位审核意见" :content="decision.corpOpinion" :time="decision.cODate"></form-item>
      <div class="sub-divider">实习成绩</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <form-item
            title="实习单位指导教师成绩评定"
            timefloat="left"
            :content="decision.corpTeacherGrade"
            :time="decision.ctgdate"
          ></form-item>
        </el-col>
        <el-col :span="12">
          <form-item
            title="学院指导教师成绩评定"
            timefloat="left"
            :content="decision.teacherGrade"
            :time="decision.tgdate"
          ></form-item>
        </el-col>
      </el-row>
      <form-item title="综合实习成绩评定" :content="decision.comprehsvGrade" :time="decision.cGDate"></form-item>
      <form-item
        title="学院实习领导小组意见"
        :content="decision.collegePrincipalOpinion"
        :time="decision.cPODate"
      ></form-item>
      <el-backtop target=".box-card"></el-backtop>
    </el-card>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import formItem from "../../components/content/form-block";
import { getDecisionTable , baseUrl,downloadIdentify} from "../../network";
import { replaceNull, Obj2html } from "../../command/utils";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    formItem
  },
  data() {
    //这里存放数据
    return {
      decision: {
        sxContent: "",
        selfSummary: "",
        corpTeacherOpinion: "", //实习单位指导教师评语
        cTODate: "",
        corpOpinion: "", //实习单位审核意见
        cODate: "",
        corpTeacherGrade: "", //企业老师评价
        ctgdate: "",
        teacherGrade: "", //学校老师意见
        tgdate: "",
        comprehsvGrade: "", //综合
        cGDate: "",
        collegePrincipalOpinion: "", //学校领导小组意见
        cPODate: ""
      },
      cardLoading: false,
      btnLoading:false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getDecision() {
      this.cardLoading = true;
      getDecisionTable()
        .then(res => {
          console.log(res);
          if (res.data.status == 1) {
            let temp = Object.assign({}, res.data.data);
            // console.log(temp.sxContent.indexOf("\n"));
            temp = Obj2html(temp); //将对象中的换行替换为<br /> 方便展示
            // console.log(temp.sxContent);
            temp = replaceNull(temp); //将所有空对象转换为 暂无
            // console.log(temp)
            this.decision = temp;
          }
        })
        .finally(() => {
          this.cardLoading = false;
        });
    },
    downloadPdf(){
      this.btnLoading = true
      downloadIdentify()
      .then(res=>{
        if(res.data.status==1){
          window.open(baseUrl+res.data.data)
        }
      })
      .finally(()=>{
        this.btnLoading = false
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getDecision();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  deactivated() {} //如果有keep-alive缓存功能,当该页面撤销使这个函数会触发
};
</script>
<style scoped>
.el-card {
  width: 80%;
  margin: 0 auto;
}
.decision-title {
  overflow: hidden;
  font-weight: bold;
  padding: 16px 0;
  border-bottom: 1px solid #ddd;
}
.Divider {
  color: rgb(64, 158, 255);
  padding: 8px 0;
}
.sub-divider {
  color: #e4ad84;
  margin-bottom: 16px;
}
.box-card{
  height: 580px;
  overflow-y: scroll;

}
</style>
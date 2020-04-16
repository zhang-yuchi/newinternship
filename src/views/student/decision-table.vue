<!--  -->
<template>
  <div class>
    <el-card v-loading=formLoading>
      <div class="main-header">实习鉴定表填写</div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
        
      >
        <el-form-item label="实习内容"  prop="practiceContent">
          <el-input
            type="textarea"
            v-model="ruleForm.content"
            :rows="15"
            autocomplete="off"
            :disabled="!$store.state.isIdentifyFormStage1Open"
          ></el-input>
          <limit :maxLength="1200" :testString="ruleForm.content"></limit>
        </el-form-item>
        <div class="tip">
          <div class="tip-title">实习自我总结(简明扼要认真填写)</div>
          <div class="p">主要内容包括：</div>
          <div class="p">1.实习目的：要求言简意赅、点名主题。</div>
          <div class="p">2.实习单位及岗位介绍：要求详略得当、重点突出，着重介绍实习岗位。</div>
          <div class="p">3.实习内容及过程：要求内容详实、层次清楚；侧重实际动手能力和技能的培养、锻炼和提高，忌记账式或日记式的简单罗列。</div>
          <div class="p">4.实习总结及体会：要求条理清楚、逻辑性强；着重写出对实习内容的总结、体会和感受，特别是自己所学的专业理论与实践的差距和今后应努力的方向。</div>
        </div>
        <el-form-item label prop="selfSummary">
          <el-input type="textarea" :disabled="!$store.state.isIdentifyFormStage1Open" :rows="10" v-model="ruleForm.summary" autocomplete="off"></el-input>
        </el-form-item>
        <limit :maxLength="1200" :testString="ruleForm.summary"></limit>
        <el-form-item label="实习单位指导教师评语" prop="corpOpinion" >
          <el-input type="textarea" :rows="5" v-model="ruleForm.corpTeacherOpinion" :disabled="!$store.state.isIdentifyFormStage3Open"></el-input>
        </el-form-item>
        <el-form-item label="实习单位审核意见" prop="corpTeacherOpinion">
          <el-input type="textarea" :rows="5" v-model="ruleForm.corpOpinion" :disabled="!$store.state.isIdentifyFormStage3Open"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="btnLoading" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import limit from "../../components/content/limit-number";
import { getDecisionTable, submitDecision } from "../../network";
import {  Obj2html } from "../../command/utils";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    limit
  },
  data() {
    //这里存放数据
    return {
      ruleForm: {
        content: " ",
        summary: " ",
        corpOpinion: " ",
        corpTeacherOpinion: " "
      },
      rules: {},
      btnLoading:false,
      formLoading:false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    submitForm(formName) {
      let summaryValidator = this.ruleForm.summary.length>=800&&this.ruleForm.summary.length<=1200
      let contentValidator = this.ruleForm.content.length>=800&&this.ruleForm.content.length<=1200
      // if(!contentValidator){
      //   this.$message.warning('实习内容字数应该在800-1200字')
      //   return
      // }
      if(!summaryValidator){
        this.$message.warning('个人总结字数应该在800-1200字')
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          let temp = this.ruleForm
          this.btnLoading = true
          submitDecision(temp).then(res => {
            console.log(res);
            if (res.data.status == 100) {
              this.$message.success("提交成功!");
              this.getTable();
            }
          })
          .finally(()=>{
            this.btnLoading = false
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getTable() {
      this.formLoading = true
      getDecisionTable().then(res => {
        console.log(res);
        if (res.data.status == 100) {
          let temp = res.data.data.appraisal;
          // temp = Obj2text(temp);
          this.ruleForm = {
            content: temp.content||" ",
            summary: temp.summary||" ",
            corpOpinion: temp.corpOpinion||" ",
            corpTeacherOpinion: temp.corpTeacherOpinion||" "
          };
          console.log(this.ruleForm);
        }
      })
      .finally(()=>{
        this.formLoading = false
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getTable()
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
  /* width: 80%; */
  margin: 0 auto;
}
.main-header {
  font-weight: bold;
  padding: 10px 0;
}
.tip {
  margin-bottom: 16px;
  color: #5a8394;
}
.p {
  line-height: 20px;
}
.tip-title {
  font-weight: bold;
}
</style>
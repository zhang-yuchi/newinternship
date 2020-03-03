<!-- 写报告册 -->
<template>
  <div class>
    <el-card v-if="state==0">
      <div class="report-title">第一阶段填写报告册</div>
      <el-form
        :model="stage1Form"
        status-icon
        :rules="rules"
        ref="stage1Form"
        label-position="top"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="指导时间段" prop="age">
          <el-date-picker
            v-model="startTime"
            style="cursor:pointer;"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>至
          <el-date-picker v-model="endTime" style="cursor:pointer;" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="指导方式" prop="stageGuideWay">
          <el-input v-model="stage1Form.stage1GuideWay" style="width:600px;" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="实习总结" prop="stageSummary">
          <el-input
            type="textarea"
            :rows="15"
            width="500px;"
            placeholder="请输入内容,不少于1050字"
            v-model="stage1Form.stage1Summary"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <limit-number style="margin-top:-20px;" :testString="stage1Form.stage1Summary" :maxLength="1050"></limit-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('stage1Form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-if="state==1">
      <div class="report-title">第二阶段填写报告册</div>
      <el-form
        :model="stage1Form"
        status-icon
        :rules="rules"
        ref="stage1Form"
        label-position="top"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="指导时间段" prop="endTime">
          <el-date-picker
            v-model="startTime"
            style="cursor:pointer;"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>至
          <el-date-picker v-model="endTime" style="cursor:pointer;" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="指导方式" prop="age">
          <el-input v-model="stage2Form.stage2GuideWay" style="width:600px" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="实习总结" prop="stageSummary">
          <el-input
            type="textarea"
            :show-word-limit="true"
            :rows="15"
            width="500px;"
            placeholder="请输入内容,不少于1050字"
            v-model="stage2Form.stage2Summary"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <limit-number style="margin-top:-20px;" :testString="stage2Form.stage2Summary" :maxLength="1050"></limit-number>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('stage1Form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import limitNumber from "../../components/content/limit-number";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    limitNumber
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    return {
      state: "",
      stage1Form: {
        stage1GuideDate: "",
        stage1GuideWay: "",
        stage1Summary: ""
      },
      stage2Form: {
        stage2GuideDate: "",
        stage2GuideWay: "",
        stage2Summary: ""
      },
      endTime: "",
      startTime: "",
      value1: "",
      rules: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    $route() {
      this.changeState();
    }
  },
  //方法集合
  methods: {
    changeState() {
      switch (this.$route.params.state) {
        case "first-stage":
          this.title = "第一阶段报告册";
          this.state = "0";
          break;
        case "second-stage":
          this.state = "1";
          this.title = "第二阶段报告册";
          break;
        default:
          console.log(404);
          break;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.changeState();
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
  margin: 0 auto;
  width: 80%;
}
.report-title {
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}
</style>
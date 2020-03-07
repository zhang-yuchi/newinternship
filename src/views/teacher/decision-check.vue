<template>
  <div class="report-check">
    <el-card class="box-card">
      <div slot="header">
        <span style="color:rgb(64,158,255);" class="clearfix"
          >{{ res.name }}的报告册</span
        >
      </div>
      <div class="clearfix">
        <div class="text item twoItem">
          <span class="header-title">学院</span>
          <span class="header-content">{{ res.college }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">专业</span>
          <span class="header-content">{{ res.major }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">学号</span>
          <span class="header-content">{{ res.stuNo }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">实习单位</span>
          <span class="header-content">{{ res.corpName }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">实习岗位</span>
          <span class="header-content">{{ res.corpPosition }}</span>
        </div>
      </div>

      <div class="state-title">第一阶段</div>
      <form-item title="实习内容" :content="res.sxContent"></form-item>
      <form-item
        title="自我总结"
        :content="res.selfSummary"
        time="暂无"
      ></form-item>
      <form-item
        title="实习单位指导教师评语"
        :content="res.corpTeacherOpinion"
        time="暂无"
      ></form-item>
      <div class="item-title">成绩评定</div>
      <el-select v-model="res.corpTeacherGrade" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <form-item
        title="实习单位指审核意见"
        :content="res.corpOpinion"
        time="暂无"
      ></form-item>
      <div class="item-title">所在学院指导老师成绩评定</div>
      <el-select v-model="res.teacherGrade" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="block">
        <el-date-picker v-model="res.tgdate" type="date" placeholder="选择日期">
        </el-date-picker>
      </div>
      <form-item
        title="综合实习成绩评定"
        :content="res.comprehsvGrade"
        time="暂无"
      ></form-item>
      <el-form
        :model="res"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="教师评语" prop="res">
          <el-input
            type="textarea"
            :rows="5"
            v-model="res.collegePrincipalOpinion"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitDecision">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import formItem from "../../components/content/form-block";
import limit from "../../components/content/limit-number";
import { Obj2html } from "../../command/utils";
export default {
  components: {
    formItem,
    limit
  },
  data() {
    return {
      res: {
        name: "王二",
        college: "加载中",
        major: "加载中",
        stuNo: "加载中",
        corpName: "加载中",
        corpPosition: "加载中",
        sxContent: "暂无",
        selfSummary: "暂无",
        corpTeacherOpinion: "暂无",
        corpTeacherGrade: "",
        corpOpinion: "暂无",
        teacherGrade: "",
        tgdate: "",
        comprehsvGrade: "暂无",
        collegePrincipalOpinion:"",
      },
      options: [
        {
          value: "优秀",
          label: "优秀"
        },
        {
          value: "良好",
          label: "良好"
        },
        {
          value: "中等",
          label: "中等"
        },
        {
          value: "及格",
          label: "及格"
        },
        {
          value: "不及格",
          label: "不及格"
        }
      ],
      rules:{}
    };
  },
  methods:{
    submitDecision(){
      
    }
  }
};
</script>

<style scoped>
.report-check {
  display: flex;
  justify-content: center;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.twoItem {
  width: 50%;
  float: left;
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
.state-title {
  padding: 20px 0;
  font-weight: 700;
  font-size: 20px;
}
.clearfix::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.item-title {
  line-height: 40px;
}
.block {
  margin: 20px 0;
}
</style>

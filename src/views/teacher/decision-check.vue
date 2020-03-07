<template>
  <div class="report-check">
    <el-card class="box-card">
      <div slot="header">
        <span style="color:rgb(64,158,255);" class="clearfix"
          >{{ info.name }}的报告册</span
        >
      </div>
      <div class="clearfix">
        <div class="text item twoItem">
          <span class="header-title">学院</span>
          <span class="header-content">{{ info.college }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">专业</span>
          <span class="header-content">{{ info.major }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">学号</span>
          <span class="header-content">{{ info.stuNo }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">实习单位</span>
          <span class="header-content">{{ info.corpName }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">实习岗位</span>
          <span class="header-content">{{ info.corpPosition }}</span>
        </div>
      </div>

      <div class="state-title">鉴定表</div>
      <form-item title="实习内容" :content="res.sxContent"></form-item>
      <form-item title="自我总结" :content="res.selfSummary"></form-item>
      <form-item
        title="实习单位指导教师评语"
        :content="res.corpTeacherOpinion"
        time="暂无"
      ></form-item>
      <div class="item-title">成绩评定</div>
      <el-select
        v-model="res.corpTeacherGrade"
        placeholder="请选择"
        :disabled="disabled"
      >
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
      <el-select
        v-model="res.teacherGrade"
        placeholder="请选择"
        :disabled="disabled"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="block">
        <el-date-picker
          v-model="res.TGDate"
          type="date"
          placeholder="选择日期"
          :disabled="disabled"
        >
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
        :disabled="disabled"
      >
        <el-form-item label="所在学院实习领导小组意见" prop="res">
          <el-input
            type="textarea"
            :rows="5"
            v-model="res.collegePrincipalOpinion"
          ></el-input>
          <div class="block">
            <el-date-picker
              v-model="res.CPODate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
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
import {
  getStudentIdentify,
  getStudentInfoById,
  completeDecision
} from "../../network/index";
export default {
  components: {
    formItem,
    limit
  },
  data() {
    return {
      disabled: true,
      info: {
        name: "加载中",
        college: "加载中",
        major: "加载中",
        stuNo: "加载中",
        corpName: "加载中",
        corpPosition: "加载中"
      },
      res: {
        sxContent: "暂无",
        selfSummary: "暂无",
        corpTeacherOpinion: "暂无",
        corpTeacherGrade: "",
        corpOpinion: "暂无",
        teacherGrade: "",
        TGDate: "",
        tGDate: "",
        comprehsvGrade: "暂无",
        collegePrincipalOpinion: "",
        CPODate: ""
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
      rules: {}
    };
  },
  methods: {
    submitDecision() {
      let obj = {
        stuNo: this.info.stuNo,
        corpTeacherGrade: this.info.corpTeacherGrade,
        teacherGrade: this.info.teacherGrade,
        TGDate: this.info.TGDate,
        tGDate: this.info.tGDate,
        CPODate: this.info.CPODate,
        collegePrincipalOpinion: this.info.collegePrincipalOpinion
      };
      completeDecision(obj).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$confirm("确认提交？", "提示", {
            confirmButtonText: "提交",
            cancelButtonText: "取消",
            type: "info"
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "提交成功!"
              });
              this.$router.back();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消提交"
              });
            });
        }
      });
    }
  },
  mounted() {
    let stuNo = this.$route.params.stuNo;
    getStudentInfoById(stuNo).then(res => {
      console.log(res);
      if (res.data.status == 1) {
        this.info = res.data.data;
        getStudentIdentify(stuNo).then(resp => {
          console.log(resp);
          if (resp.data.status == 1) {
            this.res = Obj2html(resp.data.data);
            if (this.res.collegePrincipalOpinion == null) {
              this.res.collegePrincipalOpinion = "";
            }
            this.disabled = !this.$store.state.isReportStage3Open;
          }
        });
      }
    });
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

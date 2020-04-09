<template>
  <div
    class="report-check"
    v-loading="errorLoading"
    element-loading-text="加载失败!"
    element-loading-background="rgba(0, 0, 0, .9)"
    element-loading-spinner="el-icon-circle-close"
  >
    <el-card class="box-card">
      <div slot="header">
        <span style="color: rgb(64, 158, 255);" class="clearfix"
          >{{ info.name }}的鉴定表</span
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
          <span class="header-content">{{ info.stuno }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">实习单位</span>
          <span class="header-content">{{
            info.corp ? info.corp : "未填写"
          }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">实习岗位</span>
          <span class="header-content">{{
            info.position ? info.position : "未填写"
          }}</span>
        </div>
      </div>

      <div class="state-title">鉴定表</div>
      <form-item
        title="实习内容"
        :content="appraisal.content ? appraisal.content : '暂无'"
      ></form-item>
      <form-item
        title="自我总结"
        :content="appraisal.summary ? appraisal.summary : '暂无'"
      ></form-item>
      <form-item
        title="实习单位指导教师评语"
        :content="
          appraisal.corpTeacherOpinion ? appraisal.corpTeacherOpinion : '暂无'
        "
        :time="appraisaldate.corpteacher ? appraisaldate.corpteacher : '暂无'"
      ></form-item>
      <div class="item-title">成绩评定</div>
      <el-select v-model="appraisal.corpTeacherGrade" placeholder="请选择">
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
        :content="appraisal.corpOpinion ? appraisal.corpOpinion : '暂无'"
        :time="appraisaldate.corp ? appraisaldate.corp : '暂无'"
      ></form-item>
      <div class="item-title">所在学院指导老师成绩评定</div>
      <el-select v-model="appraisal.teacherGrade" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <form-item
        title="综合实习成绩评定"
        :content="appraisal.synthGrade ? appraisal.synthGrade : '暂无成绩'"
        :time="appraisaldate.synth ? appraisaldate.synth : '暂无'"
      ></form-item>
      <el-form
        :model="appraisal"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="所在学院实习领导小组意见" prop="appraisal">
          <el-input
            type="textarea"
            :rows="5"
            v-model="appraisal.leaderOpinion"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitDecision" :loading="loading"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import formItem from "../../components/content/form-block";
import limit from "../../components/content/limit-number";
import { Obj2html, date2str } from "../../command/utils";
import { getStudentIdentify, completeDecision } from "../../network/index";
export default {
  components: {
    formItem,
    limit,
  },
  data() {
    return {
      loading: false,
      errorLoading: false,
      info: {
        name: "加载中",
        college: "加载中",
        major: "加载中",
        stuno: "加载中",
        corp: "加载中",
        position: "加载中",
        starttime: "加载中",
        endtime: "加载中",
      },
      appraisaldate: {},
      appraisal: {},
      options: [
        {
          value: "优秀",
          label: "优秀",
        },
        {
          value: "良好",
          label: "良好",
        },
        {
          value: "中等",
          label: "中等",
        },
        {
          value: "及格",
          label: "及格",
        },
        {
          value: "不及格",
          label: "不及格",
        },
      ],
      rules: {},
    };
  },
  methods: {
    submitDecision() {
      let obj = {
        corpTeacherGrade: this.appraisal.corpTeacherGrade,
        teacherGrade: this.appraisal.teacherGrade,
        leaderOpinion: this.appraisal.leaderOpinion,
      };

      console.log(obj);
      this.$confirm("确认提交？", "提示", {
        confirmButtonText: "提交",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.loading = true;
          completeDecision(this.$route.params.stuNo, obj).then((res) => {
            console.log(res);
            if (res.data.status == 100) {
              this.$message({
                type: "success",
                message: "提交成功!",
              });
              this.$router.back();
            } else {
              this.loading = false;
              this.$message({
                type: "error",
                message: "提交失败：" + res.data.message,
              });
            }
          });
        })
        .catch(() => {
          this.loading = false;
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },
  },
  mounted() {
    let stuNo = this.$route.params.stuNo;
    console.log(stuNo)
    getStudentIdentify(stuNo).then((res) => {
      console.log(res.data.data);
      if (res.data.status == 100) {
        this.info = res.data.data.student;
        if (this.info.starttime) {
          this.info.starttime = date2str(this.info.starttime);
        }
        if (this.info.endtime) {
          this.info.endtime = date2str(this.info.endtime);
        }
        if (res.data.data.appraisaldate) {
          this.appraisaldate = res.data.data.appraisaldate;
          if (this.appraisaldate.corpteacher) {
            this.appraisaldate.corpteacher = date2str(
              this.appraisaldate.corpteacher
            );
          }
          if (this.appraisaldate.corp) {
            this.appraisaldate.corp = date2str(this.appraisaldate.corp);
          }
          if (this.appraisaldate.synth) {
            this.appraisaldate.synth = date2str(this.appraisaldate.synth);
          }
          if (this.appraisaldate.leader) {
            this.appraisaldate.leader = date2str(this.appraisaldate.leader);
          }
        }
        this.appraisal = res.data.data.appraisal;
      } else {
        this.errorLoading = true;
      }
    });
  },
};
</script>

<style scoped>
.box-card {
  /* width: 480px; */
  width: 80%;
  transition: none;
}
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
</style>

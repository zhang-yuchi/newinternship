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
        <span style="color: rgb(64, 158, 255);">{{ info.name }}的报告册</span>
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
          <span class="header-title">学院指导教师工号</span>
          <span class="header-content">{{ info.teachno }}</span>
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
        <div class="text item twoItem">
          <span class="header-title">实习日期</span>
          <span class="header-content"
            >{{ info.starttime ? info.starttime : "未填写" }} 至
            {{ info.endtime ? info.endtime : "未填写" }}</span
          >
        </div>
      </div>

      <!-- 二阶段 -->
      <div class="state-title">第二阶段</div>
      <form-item
        title="第二阶段实习总结"
        :content="report.stage2Summary ? report.stage2Summary : '暂无'"
        :time="reportdate.stage2Fill ? reportdate.stage2Fill : '无'"
      ></form-item>
      <form-item
        title="第二阶段实习指导方式"
        :content="report.stage2GuideWay ? report.stage2GuideWay : '未填写'"
        :time="reportdate.stage2Duration ? reportdate.stage2Duration : '无'"
      ></form-item>
      <el-form
        :model="report"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="教师评语" prop="report">
          <el-input
            type="textarea"
            :rows="5"
            v-model="report.stage2Comment"
          ></el-input>
          <limit :maxLength="500" :testString="report.stage2Comment"></limit>
        </el-form-item>
        <div class="item-title">成绩评定</div>
        <el-form-item>
          <el-select v-model="report.stage2Grade" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="state-title">总评</div>
      <el-form
        :model="report"
        status-icon
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="评语" prop="report">
          <el-input
            type="textarea"
            :rows="5"
            v-model="report.totalEval"
          ></el-input>
          <limit :maxLength="500" :testString="report.totalEval"></limit>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitReport2" :loading="loading"
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
import {
  getStudentReport,
  completeRep2,
  completeRepTotal
} from "../../network/index";
export default {
  name: "Report-check2",
  components: {
    formItem,
    limit
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
        teachno: "加载中",
        corp: "加载中",
        position: "加载中",
        starttime: "加载中",
        endtime: "加载中"
      },
      reportdate: {
        stage2Duration: "",
        stage2Fill: ""
      },
      report: {
        stage2GuideWay: "加载中",
        stage2Summary: "加载中",
        stage2Comment: "",
        totalEval: ""
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
  mounted() {
    let stuNo = this.$route.params.stuNo;
    getStudentReport(stuNo).then(res => {
      // console.log(res);
      if (res.data.status == 100) {
        this.info = res.data.data.student;
        if (this.info.starttime) {
          this.info.starttime = date2str(this.info.starttime);
        }
        if (this.info.endtime) {
          this.info.endtime = date2str(this.info.endtime);
        }
        if (res.data.data.reportdate) {
          this.reportdate = res.data.data.reportdate;
          if (this.reportdate.stage2Fill) {
            this.reportdate.stage2Fill = date2str(this.reportdate.stage2Fill);
          }
        }
        this.report.stage2Summary = Obj2html({
          str: this.report.stage2Summary
        }).str;
        this.report = res.data.data.report;
      } else {
        this.errorLoading = true;
      }
    });
  },
  methods: {
    submitReport2() {
      this.$confirm("确认提交？", "提示", {
        confirmButtonText: "提交",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.loading = true;
          if (
            !this.report.stage2Comment ||
            this.report.stage2Comment.length < 60
          ) {
            this.$alert("二阶段评语不能低于60字", "提交失败", {
              confirmButtonText: "确定"
            });
            throw "false";
          }
          if (!this.report.totalEval || this.report.totalEval.length < 60) {
            this.$alert("总评不能低于60字", "提交失败", {
              confirmButtonText: "确定"
            });
            throw "false";
          }
          let obj = {};
          obj.stage2Grade = this.report.stage2Grade
            ? this.report.stage2Grade
            : "";
          obj.stage2Comment = this.report.stage2Comment;
          console.log(this.report.totalEval);
          console.log(obj);
          Promise.all([
            completeRep2(this.$route.params.stuNo, obj),
            completeRepTotal(this.$route.params.stuNo, {
              total_eval: this.report.totalEval
            })
          ])
            .then(res => {
              console.log(res);
              if (res[0].data.status == 100 && res[1].data.status == 100) {
                this.$message({
                  type: "success",
                  message: "提交成功!"
                });
                this.$router.back();
              } else {
                this.loading = false;
                this.$message({
                  type: "info",
                  message:
                    "提交失败：" + res[0].data.status !== 100
                      ? res[0].data.message
                      : res[1].data.message
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.loading = false;
          this.$message({
            type: "info",
            message: "已取消提交"
          });
        });
    }
  }
};
</script>
<style scoped>
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
.box-card {
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
.summary {
  margin-left: 20px;
  width: 456px;
}
.Divider {
  padding: 10px 0;
  color: rgb(64, 158, 255);
  /* border-bottom: 1px solid #ddd; */
}
.state-title {
  padding: 20px 0;
  font-weight: 700;
  font-size: 20px;
}
.item-title {
  line-height: 40px;
}
.clearfix::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>

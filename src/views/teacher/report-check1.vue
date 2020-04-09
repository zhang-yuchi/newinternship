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
          <span class="header-content">{{
            info.college ? info.college : "未填写"
          }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">专业</span>
          <span class="header-content">{{
            info.major ? info.major : "未填写"
          }}</span>
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

      <div class="state-title">第一阶段</div>
      <form-item
        title="第一阶段实习总结"
        :content="report.stage1Summary ? report.stage1Summary : '暂无'"
        :time="reportdate.stage1Fill?reportdate.stage1Fill:'无'"
      ></form-item>
      <form-item
        title="第一阶段实习指导方式"
        :content="report.stage1GuideWay ? report.stage1GuideWay : '未填写'"
        :time="reportdate.stage1Duration ? reportdate.stage1Duration : '无'"
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
            v-model="report.stage1Comment"
          ></el-input>
          <limit :maxLength="500" :testString="report.stage1Comment"></limit>
        </el-form-item>
        <div class="item-title">成绩评定</div>
        <el-form-item>
          <el-select v-model="report.stage1Grade" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitReport1" :loading="loading"
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
import { getStudentReport, completeRep1 } from "../../network/index";
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
        teachno: "加载中",
        corp: "加载中",
        position: "加载中",
        starttime: "加载中",
        endtime: "加载中",
      },
      reportdate: {
        stage1Duration: "",
        stage1Fill: "",
      },
      report: {
        stage1GuideWay: "加载中",
        stage1Summary: "加载中",
        stage1Comment: "",
        stage1Grade: "",
      },
      rules: {},
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
    };
  },
  methods: {
    submitReport1() {
      this.$confirm("确认提交？", "提示", {
        confirmButtonText: "提交",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          // console.log(this.res);
          this.loading = true;
          if (this.report.stage1Comment.length < 60) {
            this.$alert("一阶段评语不能低于60字", "提交失败", {
              confirmButtonText: "确定",
            });
            this.loading = false;
            throw "false";
          }
          let obj = {};
          obj.stage1Comment = this.report.stage1Comment;
          obj.stage1Grade = this.report.stage1Grade;
          console.log(obj);
          completeRep1(this.$route.params.stuNo, obj).then((res) => {
            console.log(res);
            if (res.data.status == 100) {
              this.$message({
                type: "success",
                message: "提交成功!",
              });
              this.$router.back();
            } else {
              this.$message({
                type: "error",
                message: "提交失败：" + res.data.message,
              });
              this.loading = false;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },
  },
  mounted() {
    let stuNo = this.$route.params.stuNo;
    getStudentReport(stuNo).then((res) => {
      console.log(res);
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
          if (this.reportdate.stage1Fill) {
            this.reportdate.stage1Fill = date2str(this.reportdate.stage1Fill);
          }
        }
        this.report.stage1Summary = Obj2html({
          str: this.report.stage1Summary,
        }).str;
        this.report = res.data.data.report;
      } else {
        this.errorLoading = true;
      }
    });
  },
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

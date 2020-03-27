<!--  -->
<template>
  <div class="report-check" v-loading="pageLoading">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="overflow:hidden">
          <span style="color:rgb(64,158,255);">{{title}}</span>
        </div>
        <div class="text item">
          <span class="header-title">指导时间</span>
          <span class="header-content">{{showContent.stageGuideDate}}</span>
        </div>
        <div class="text item">
          <span class="header-title">指导方式</span>
          <span class="header-content">{{showContent.stageGuideWay}}</span>
        </div>
        <form-block
          title="实习总结"
          :content="showContent.stageSummary"
          :time="showContent.stageGradeDate"
        ></form-block>
        <form-block
          title="学院实习指导教师评语"
          :content="showContent.stageComment"
          :time="showContent.stageGradeDate"
        ></form-block>
        <form-block
          title="实习成绩评定"
          :content="showContent.stageGrade"
          :time="showContent.stageGradeDate"
        ></form-block>
        <div class="state2" v-if="state==1">
          <div class="Divider">学院实习指导教师总评及成绩评定</div>
          <form-block title="评语" :content="showContent.totalGrade"></form-block>
          <div class="text item">
            <span class="header-title">实习成绩</span>
            <span class="header-content">{{showContent.totalScore}}</span>
          </div>
        </div>
      </el-card>

    <el-backtop target=".box-card"></el-backtop>
  </div>
</template>


<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import formBlock from "../../components/content/form-block";
import { getReportInfo, baseUrl } from "../../network";
import { Obj2html, replaceNull } from "../../command/utils";
import axios from 'axios'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    formBlock
  },
  data() {
    //这里存放数据
    return {
      title: "",
      state: "",
      btnLoading: false,
      showContent: {
        stageGuideDate: "",
        stageGuideWay: "",
        stageSummary: "",
        stageGradeDate: "",
        stageGrade: "",
        stageComment: "",
        totalGrade: "",
        totalScore: ""
      },
      pageLoading: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    $route(newValue) {
      this.changeState();
      this.getContent();
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
    getContent() {
      this.pageLoading = true;
      getReportInfo()
        .then(res => {
          console.log(res);
          let data = res.data.data.report;
          data = Obj2html(data);
          data = replaceNull(data);

          if (this.state == 0) {
            this.showContent = {
              stageGuideDate: res.data.data.reportdate.stage1Duration,
              stageGuideWay: data.stage1GuideWay,
              stageSummary: data.stage1Summary,
              stageGradeDate: data.stage1GradeDate,
              stageGrade: data.stage1Grade,
              stageComment: data.stage1Comment
            };
          } else if (this.state == 1) {
            this.showContent = {
              stageGuideDate: res.data.data.reportdate.stage2Duration,
              stageGuideWay: data.stage2GuideWay,
              stageSummary: data.stage2Summary,
              stageGradeDate: data.stage2GradeDate,
              stageGrade: data.stage2Grade,
              stageComment: data.stage2Comment,
              totalGrade: data.totalGrade,
              totalScore: data.totalEval
            };
          }
        })
        .finally(() => {
          this.pageLoading = false;
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(this.$route.params.state);
    this.changeState();
    this.getContent();
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
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.box-card {
  /* width: 480px; */
  width: 80%;
  overflow-y: scroll;
  height: 580px;
  transition: none;
  margin: 0 auto;
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
  vertical-align: top;
}
.report-check {
  display: flex;
  /* overflow-y: scroll; */
  /* height: 300px; */
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
</style>
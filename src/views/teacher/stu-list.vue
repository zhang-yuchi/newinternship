<template>
  <div>
    <el-table
      :data="data[currentPage - 1]"
      border
      height="628"
      v-loading="loading"
      element-loading-text="加 载 中"
      style="width: 100%"
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column prop="idcard" label="学号" width="180" fixed>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150" fixed>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="150"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="150"> </el-table-column>
      <el-table-column prop="college" label="学院" width="200">
      </el-table-column>
      <el-table-column prop="major" label="专业" width="200"> </el-table-column>
      <el-table-column prop="corp" label="实习企业" width="200">
      </el-table-column>
      <el-table-column prop="position" label="实习岗位" width="200">
      </el-table-column>
      <el-table-column
        prop="corpTeacherNo"
        label="校外指导老师工号"
        width="200"
      >
      </el-table-column>
      <el-table-column prop="phone" label="联系电话" width="200">
      </el-table-column>
      <el-table-column prop="qq" label="联系QQ" width="200"> </el-table-column>
      <el-table-column prop="wechat" label="联系微信" width="200">
      </el-table-column>

      <el-table-column fixed="right" label="报告册(一)" width="100">
        <template slot-scope="scope">
          <el-button @click="reportCheck1(scope.row)" type="text" size="small"
            >评价</el-button
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="报告册((二)" width="100">
        <template slot-scope="scope">
          <el-button @click="reportCheck2(scope.row)" type="text" size="small"
            >评价</el-button
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="鉴定表" width="100">
        <template slot-scope="scope">
          <el-button @click="decisionCheck(scope.row)" type="text" size="small"
            >评价</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      id="fenye"
      background
      layout="prev, pager, next"
      :total="arrlength"
      :current-page="currentPage"
      :page-size="pageSize"
      @prev-click="prevClick()"
      @next-click="nextClick()"
      @current-change="pageChange"
    >
    </el-pagination>
    <fillfilter @filter-click="filterClick"></fillfilter>
  </div>
</template>

<script>
import { getStudentList } from "../../network/index";
import fillfilter from "../../components/content/Filter";
import { one2arr } from "../../command/utils";
export default {
  components: {
    fillfilter
  },
  data() {
    return {
      tableData: [],
      data: [],
      currentPage: 1,
      pageSize: 10,
      loading: true,
      arrlength: 0
    };
  },
  methods: {
    reportCheck1(item) {
      this.$router.push("/teacher/report-check1/" + item.stuno);
    },
    reportCheck2(item) {
      this.$router.push("/teacher/report-check2/" + item.stuno);
    },
    decisionCheck(item) {
      this.$router.push("/teacher/decision-check/" + item.stuno);
    },
    prevClick() {
      this.currentPage--;
    },
    nextClick() {
      this.currentPage++;
    },
    pageChange(e) {
      this.currentPage = e;
      console.log(this.currentPage);
    },
    filterClick(e) {
      let arr = [];
      this.currentPage = 1;
      if (e == 3) {
        // 全部
        for (let item of this.tableData) {
          arr.push(item);
        }
      } else if (e == 2) {
        //已填完
        for (let item of this.tableData) {
          if (
            item.reportStage1Summary &&
            item.reportStage2Summary &&
            item.appraisalContent &&
            item.appraisalSummary
          ) {
            arr.push(item);
          }
        }
      } else {
        //未填完
        for (let item of this.tableData) {
          if (
            !item.reportStage1Summary ||
            !item.reportStage2Summary ||
            !item.appraisalContent ||
            !item.appraisalSummary
          ) {
            arr.push(item);
          }
        }
      }
      this.arrlength = arr.length;
      this.data = one2arr(arr, this.pageSize);
    }
  },
  created() {
    getStudentList()
      .then(res => {
        if (res.data.status == 100) {
          console.log(res);
          this.tableData = res.data.data;
          this.arrlength = this.tableData.length;
          this.data = one2arr(this.tableData, this.pageSize);
          console.log(this.data);
        } else if (res.data.status == -100) {
          // this.$alert('无法获取到您的信息，请重新登陆','身份失效',{
          //   confirmButtonText: '确定',
          //   callback: action => {
          //     if(action == 'confirm'){
          //       this.$router.push('/')
          //     }
          //   }
          // })
        }
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {}
};
</script>

<style scoped>
#fenye {
  position: absolute;
  right: 0;
  top: 640px;
}
</style>

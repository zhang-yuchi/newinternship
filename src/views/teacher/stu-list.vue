<template>
  <div>
    <el-table :data="data[currentPage - 1]" border height="628">
      <el-table-column prop="stuNo" label="学号" width="150" fixed>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150" fixed>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="200"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="200"> </el-table-column>
      <el-table-column prop="college" label="学院" width="200">
      </el-table-column>
      <el-table-column prop="major" label="专业" width="200"> </el-table-column>
      <el-table-column prop="corpName" label="实习企业" width="200">
      </el-table-column>
      <el-table-column prop="corpPosition" label="实习岗位" width="200">
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
      <el-table-column fixed="right" label="报告册" width="100">
        <template slot-scope="scope">
          <el-button @click="reportCheck(scope.row)" type="text" size="small"
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
      :total="tableData['length']"
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
      pageSize: 10
    };
  },
  methods: {
    reportCheck(item) {
      this.$router.push("/teacher/report-check/" + item.stuNo);
    },
    decisionCheck(item) {
      this.$router.push("/teacher/decision-check/" + item.stuNo);
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
      console.log("父组件拿到：" + e);
      let arr = [];
      if (e == 3) {
        // 全部
        for (let item of this.tableData) {
          arr.push(item);
        }
      } else if (e == 2) {
        //已填完
        for (let item of this.tableData) {
          if (item.reportFilledFlag == 2 && item.identifyFilledFlag == 2) {
            arr.push(item);
          }
        }
      } else {
        //未填完
        for (let item of this.tableData) {
          if (item.reportFilledFlag !== 2 || item.identifyFilledFlag !== 2) {
            arr.push(item);
          }
        }
      }
      this.data = one2arr(arr, this.pageSize);
    }
  },
  mounted() {
    getStudentList().then(res => {
      if (res.data.status == 1) {
        console.log(res);
        this.tableData = res.data.data;
        this.data = one2arr(this.tableData, this.pageSize);
        console.log(this.data);
      }
    });
  }
};
</script>

<style scoped>
#fenye {
  position: absolute;
  right: 0;
  top: 640px;
}
</style>

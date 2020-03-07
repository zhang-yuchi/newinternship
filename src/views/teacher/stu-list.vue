<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="stuNo" label="学号" width="200" fixed>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="200" fixed>
    </el-table-column>
    <el-table-column prop="sex" label="性别" width="200"> </el-table-column>
    <el-table-column prop="age" label="年龄" width="200"> </el-table-column>
    <el-table-column prop="college" label="学院" width="200"> </el-table-column>
    <el-table-column prop="major" label="专业" width="200"> </el-table-column>
    <el-table-column prop="corpName" label="实习企业" width="200">
    </el-table-column>
    <el-table-column prop="corpPosition" label="实习岗位" width="200">
    </el-table-column>
    <el-table-column prop="corpTeacherNo" label="校外指导老师工号" width="200">
    </el-table-column>
    <el-table-column prop="phone" label="联系电话" width="200">
    </el-table-column>
    <el-table-column prop="qq" label="联系QQ" width="200"> </el-table-column>
    <el-table-column prop="wechat" label="联系微信" width="200"> </el-table-column>
    <el-table-column fixed="right" label="报告册" width="100">
      <template slot-scope="scope">
        <el-button @click="reportCheck(scope.row)" type="text" size="small"
          >评价</el-button
        >
        <!-- <el-button type="text" size="small">编辑</el-button> -->
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="鉴定表" width="100">
      <template slot-scope="scope">
        <el-button @click="decisionCheck(scope.row)" type="text" size="small"
          >评价</el-button
        >
        <!-- <el-button type="text" size="small">编辑</el-button> -->
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {getStudentList} from '../../network/index';
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    reportCheck(item) {
      this.$router.push("/teacher/report-check/" + item.stuNo);
    },
    decisionCheck(item) {
      // this.$router.push("/teacher/decision-check");
    }
  },
  mounted() {
    getStudentList().then(res => {
      if (res.data.status == 1) {
        console.log(res);
        this.tableData = res.data.data
      }
    });
  }
};
</script>

<style scoped></style>

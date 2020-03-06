<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
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
    <el-table-column prop="stuWrite" fixed="right" label="学生填写" width="100">
    </el-table-column>
    <el-table-column prop="teaWrite" fixed="right" label="教师填写" width="100">
    </el-table-column>
    <el-table-column fixed="right" label="报告册" width="100">
      <template slot-scope="scope">
        <el-button @click="reportCheck(scope.row)" type="text" size="small"
          >评价</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>
import {getStudentList} from '../../network/index'
export default {
  methods: {
    reportCheck(item) {
      this.$router.push("/teacher/report-check");
    },
    tableRowClassName({ row, rowIndex }) {
      if (this.tableData[rowIndex].reportFlag === 2) {
        return "success-row";
      } else if (rowIndex === 1) {
        return "warning-row";
      }
      return "";
    }
  },
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
     getStudentList().then(res => {
      if (res.data.status == 1) {
        console.log(res);
        this.tableData = res.data.data
        if(tableData.length){
          for(let item of tableData){
            if(item.reportFlag ==2){
              item.teaWrite = "已评价完"
            }else if(item.reportFlag == 1 && item.reportFileFlag != 1){
              item.teaWrite = '未评价'
            }
          }
        }
      }
    });
  }
};
</script>

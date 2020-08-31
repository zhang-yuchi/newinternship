<template>
  <div>
    <div class="search">
      <el-input
        placeholder="输入搜索内容"
        v-model="searchValue"
        @input="computedSearch"
        class="input-with-select"
      >
        <el-select
          v-model="searchField"
          slot="prepend"
          @change="changeSearchFiled"
        >
          <el-option label="学号" value="stuno"></el-option>
          <el-option label="姓名" value="name"></el-option>
          <el-option label="学院" value="college"></el-option>
        </el-select>
      </el-input>
      <fillfilter @filter-click="filterClick"></fillfilter>
    </div>

    <el-table
      :data="searchedData2[currentPage - 1]"
      :row-class-name="tableRowClassName"
      border
      style="width: 100%"
      v-loading="loading"
      element-loading-text="加 载 中"
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column prop="stuno" label="学号" width="180" fixed>
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
      <el-table-column
        prop="stuWrite"
        fixed="right"
        label="学生填写"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="teaWrite"
        fixed="right"
        label="教师填写"
        width="100"
      >
      </el-table-column>
      <el-table-column fixed="right" label="报告册(二)" width="100">
        <template slot-scope="scope">
          <el-button @click="reportCheck2(scope.row)" type="text" size="small"
            >评价</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      id="fenye"
      background
      layout="prev, pager, next"
      :total="searchedData.length"
      :current-page="currentPage"
      :page-size="pageSize"
      @prev-click="prevClick()"
      @next-click="nextClick()"
      @current-change="pageChange"
    >
    </el-pagination>
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
      currentPage: 1,
      pageSize: 9,
      loading: true,
      searchField: "stuno",
      searchValue: "",
      searchedData: [],
      filterIndex: 3,
    };
  },
  computed: {
    searchedData2() {
      return one2arr(this.searchedData, this.pageSize);
    },
  },
  methods: {
     changeSearchFiled() {
      this.filterClick(this.filterIndex);
    },
    computedSearch() {
      this.filterClick(this.filterIndex);
    },
    reportCheck2(item) {
      this.$router.push("/teacher/report-check2/" + item.stuno);
    },
    tableRowClassName({ row, rowIndex }) {
      let item = this.searchedData2[this.currentPage - 1][rowIndex]
      if (!item.reportStage2Comment || !item.reportStage2Grade || !item.reportTotalEval) {
        return "warning-row";
      }
      return "";
    },
    prevClick() {
      this.currentPage--;
    },
    nextClick() {
      this.currentPage++;
    },
    pageChange(e) {
      this.currentPage = e;
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
          if (item.reportStage2Summary) {
            arr.push(item);
          }
        }
      } else {
        //未填完
        for (let item of this.tableData) {
          if (!item.reportStage2Summary) {
            arr.push(item);
          }
        }
      }
      this.filterIndex = e;
      if (!this.searchValue) {
        this.searchedData = arr;
      } else {
        this.searchedData = arr.filter((item) => {
          return item[this.searchField]
            .toLowerCase()
            .includes(this.searchValue.toLowerCase());
        });
      }
    }
  },
  mounted() {
    getStudentList().then(res => {
      if (res.data.status == 100) {
        // console.log(res);
        this.tableData = res.data.data;
        this.searchedData = this.tableData;
        if (this.tableData.length) {
          for (let item of this.tableData) {
            if (item.reportStage2Comment && item.reportStage2Grade && item.reportTotalEval) {
              item.teaWrite = "已评价完";
            } else {
              item.teaWrite = "未评价完";
            } 
            if (item.reportStage2Summary) {
              item.stuWrite = "已填完";
            } else {
              item.stuWrite = "未填完";
            }
          }
        }
      }
      this.loading = false;
    });
  }
};
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
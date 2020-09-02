<template>
  <div>
    <div class="search">
      <el-input
        placeholder="输入搜索内容"
        @input="computedSearch"
        v-model="searchValue"
        class="input-with-select"
      >
        <el-select
          style="width=200px"
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
      border
      v-loading="loading"
      element-loading-text="加 载 中"
      style="width: 100%"
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
    fillfilter,
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
    setStore(item) {
      let index = this.$store.state.stuNo.indexOf(item.stuno);
      this.$store.commit("setIndex", index);
    },
    reportCheck1(item) {
      this.setStore(item);
      this.$router.push("/teacher/report-check1/" + item.stuno);
    },
    reportCheck2(item) {
      this.setStore(item);
      this.$router.push("/teacher/report-check2/" + item.stuno);
    },
    decisionCheck(item) {
      this.setStore(item);
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
    },
  },
  created() {
    getStudentList().then((res) => {
      if (res.data.status == 100) {
        // console.log(res);
        this.tableData = res.data.data;
        this.searchedData = this.tableData;
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
    });
  },
  mounted() {},
};
</script>

<style scoped>
.el-input--suffix {
  width: 200px;
}
</style>

<!-- 
  author:张宇弛
  page:学生下载页面
  function:学生下载鉴定表和报告册
 -->
<template>
  <div class="download">
    <div class="load-title">文件下载</div>
    <el-alert title="列表中的文件为历史文件,若要下载最新的文件请先点击加入队列按钮,等待转换完成后再进行下载!" style="margin:20px 0;" :closable="false" type="warning"></el-alert>
    <el-button type="primary" @click="downloadFile(true)" size="mini">加入报告册到队列</el-button>
    <el-button type="warning" @click="downloadFile(false)" size="mini">加入鉴定表到队列</el-button>
    <el-button
      type="danger"
      size="mini"
      @click="DeleteSelected"
      :disabled="multipleSelection.length<=0"
    >删除所选项</el-button>
    <el-button icon="el-icon-refresh" size="mini" @click="getList">刷新列表</el-button>
    <el-table
      ref="multipleTable"
      :data="nowList"
      v-loading="tableLoading"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="创建时间" width="100">
        <template slot-scope="scope">{{ scope.row.created }}</template>
      </el-table-column>
      <el-table-column prop="name" label="类型" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.report?'primary':'warning'">{{scope.row.report?"报告册":"鉴定表"}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag
            v-if="!scope.row.failed"
            :type="scope.row.converting?'warning':'success'"
          >{{scope.row.converting?"转换中":"转换完成"}}</el-tag>
          <el-tag v-if="scope.row.failed" :type="'danger'">转换失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="结果" width="120">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.failed" type="danger">失败</el-tag>
          <el-tag v-else-if="!scope.row.converting" type="success">成功</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleDownload(scope.$index, scope.row)"
            :disabled="scope.row.failed"
          >下载</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="pageChange"
      hide-on-single-page
      background
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="tableData.length"
    ></el-pagination>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import moment from "moment";
import Poller from "../../command/poller";
import { download, getTask, getTaskList, deleteTask } from "../../network";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tableData: [],
      multipleSelection: [],
      reportMsg: "",
      appiMsg: "",
      currentPage: 0,
      pageSize: 7,
      tableLoading: false,
      poller: null
    };
  },
  //监听属性 类似于data概念
  computed: {
    nowList() {
      //用于分页
      return this.tableData.slice(
        this.currentPage * this.pageSize,
        this.currentPage * this.pageSize + this.pageSize
      );
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    downloadFile(isReport) {
      download({
        report: isReport,
        token: sessionStorage.getItem("token")
      })
        .then(res => {
          // console.log(res);
          if (res.data.status === 100) {
            this.$message.success("请等待后刷新");
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.getList();
          }, 1000);
        });
    },
    pageChange(size) {
      // console.log(size);
      this.currentPage = size - 1;
    },
    getList() {
      this.tableLoading = true;
      getTaskList()
        .then(res => {
          // console.log(res);
          this.tableData = res.data.data.map(item => {
            // console.log(item);
            item.created = moment(item.created).format("YYYY-MM-DD HH:mm:ss");
            return item;
          });
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    handleDelete(index, item) {
      // console.log(item);
      deleteTask({ data: [item.id] }).then(res => {
        // console.log(res);
        if (res.data.status === 100) {
          this.$message.success("删除成功");
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    DeleteSelected() {
      // console.log(this.multipleSelection);
      const idList = this.multipleSelection.map(item => {
        return item.id;
      });
      deleteTask({ data: idList }).then(res => {
        // console.log(res);
        if (res.data.status === 100) {
          this.$message.success(res.data.data);
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    handleDownload(index, item) {
      // console.log();
      // console.log(item);
      window.open("http://" + item.url);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getList();
    this.poller = new Poller({
      axios: getTaskList,
      success: res => {
        // console.log(res);
        // console.log(this.tableData);
        let flag = false; //表格未改变
        this.tableData.map((item, index) => {
          res.data.data.map((data, i) => {
            if (index === i && item.id !== data.id) {
              //此时判断数组不相同
              // console.log("数组不同了");

              flag = true;
            }
          });
        });
        // this.reportMsg = res.data.data.report
        // this.appiMsg = res.data.data.appraisal
        if (flag) {
          this.tableData = res.data.data.map(item => {
            // console.log(item);
            item.created = moment(item.created).format("YYYY-MM-DD HH:mm:ss");
            return item;
          });
        }
      }
    });
    this.poller.start(3000);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
    this.poller.destroy();
  }, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  deactivated() {} //如果有keep-alive缓存功能,当该页面撤销使这个函数会触发
};
</script>
<style lang="less" scoped>
.download {
  padding: 20px;
  .el-table {
    margin-top: 20px;
  }
  .load-title {
    font-weight: bold;

    font-size: 18px;
  }
  .el-pagination {
    text-align: right;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .target {
    padding: 15px 0;
    span {
      margin-right: 18px;
    }
  }
}
</style>
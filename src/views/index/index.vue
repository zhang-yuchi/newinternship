<!--  -->
<template>
  <div class>
    <el-image
      style="width:70%;height:100%;display:block;margin:0 auto;"
      fit="scale-down"
      class="sm-hidden"
      :src="img"
    ></el-image>
    <div class="title">毕业生实习管理系统</div>
    <el-row :gutter="20" class="mainpage">
      <el-col class="hidden-xs-only">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div class="text item">公告</div>
            <div class="news-content">
              <div class="news" v-for="(item,index) in news" :key="index">
                <el-link
                  type="warning"
                  style="display:inline-block;width:100%;"
                  :data-id="index"
                  @click="todetails"
                >
                  <span style="width:75%;display:inline-block;">{{item.title}}</span>
                  <span
                    style="width:25%;text-align:right;display:inline-block;vertical-align:bottom;"
                  >{{item.gmtModified}}</span>
                </el-link>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col class="hidden-md-and-down">
        <el-card class="box-card" shadow="hover">
          <div class="text item">资料下载</div>
        </el-card>
      </el-col>
      <el-col>
        <div class="grid-content bg-purple">
          <login />
        </div>
      </el-col>
    </el-row>
    <el-dialog :title="detail.title" :visible.sync="showDetail">
      <div v-html="detail.content"></div>
      <div class="publisher">{{detail.publisher}}</div>
      <div class="time">{{detail.gmtModified}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showDetail = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import login from "./login.vue";
import { getNewsList, getNewsDetail } from "../../network";
import moment from "moment";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    login
  },
  data() {
    //这里存放数据
    return {
      img: require("../../assets/img/logo.jpg"),
      news: [],
      showDetail: false,
      detail: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    todetails(e) {
      const index = e.currentTarget.dataset.id;
      this.detail = this.news[index];
      this.showDetail = true;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    getNewsList().then(res => {
      console.log(res);
      let arr = [];
      for (let i = res.data.data.length - 1; i >= 0; i--) {
        let item = res.data.data[i];
        item.gmtModified = moment(item.gmtModified).format("YYYY-MM-DD");
        arr.push(item);
      }
      console.log(arr);
      this.news = arr;
    });
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
.mainpage {
  width: 90%;
  margin: 20px auto !important;
  display: flex;
}
.title {
  margin: 30px auto;
  font-size: 30px;
  color: #606266;
  font-weight: bold;
  text-align: center;
}
.box-card {
  min-height: 400px;
}
.news-content {
  height: 300px;
  overflow-y: auto;
}
.news:first-of-type {
  margin-top: 18px;
}
.news {
  margin: 10px 0;
}
.publisher{
  margin-top: 10px;
}
.publisher,.time{
  font-size: 14px;
  color: #606266;
  text-align: right;
}
</style>
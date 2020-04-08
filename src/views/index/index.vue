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
            <div class="news-content" v-loading=newsLoading>
              <div class="news" v-for="(item,index) in news" :key="item.id">
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
      <div class="publisher"><span style="display:inline-block;margin-right:20px;">已读:{{detail.readnum}}</span>{{detail.publisher}}</div>
      <div class="time">{{detail.gmtModified}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showDetail = false">确 定</el-button>
      </div>
    </el-dialog>
  <div class="footer">
    Copyright ©2019 成都文理学院教务处 | WhyStudio制作,All rights reserved.
  </div>
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
      detail: {},
      newsLoading:false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    todetails(e) {
      // console.log(index);
      const tar = e.currentTarget.dataset.id;
      // console.log(tar);
      this.detail = this.news[tar];
      this.showDetail = true;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.newsLoading = true
    getNewsList()
      .then(res => {
        console.log(res.data.data);
        let arr = [];
        
        for (let i = res.data.data.length - 1; i >= 0; i--) {
          let item = res.data.data[i];
          item.gmtModified = moment(item.modified).format("YYYY-MM-DD");
          arr.push(item);
        }
        // console.log(arr);
        this.news = arr.reverse();
      })
      .finally(()=>{
        this.newsLoading = false
      })
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
  padding: 1vw 0;
  font-size: 30px;
  color: #606266;
  font-weight: bold;
  text-align: center;
  
}
@media screen and (min-width: 600px) {
  .title{
    border-top: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
    box-shadow: 0 1px 3px 2px #f1f1f1;
  }
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
.publisher {
  margin-top: 10px;
}
.publisher,
.time {
  font-size: 14px;
  color: #606266;
  text-align: right;
}
.footer{
  /* position:fixed; */
  width: 100%;
  padding: 1vw 0;
  border-top: 1px solid #f1f1f1;
  bottom: 0;
  text-align: center;
  color: #606266;
}
</style>
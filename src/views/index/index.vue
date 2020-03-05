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
    <el-row :gutter="20" class="mainpage hidden-sm-and-down">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div class="text item">公告</div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div class="text item">资料下载</div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <login />
        </div>
      </el-col>
    </el-row>
    <!-- 针对平板 -->
    <el-row :gutter="20" class="mainpage md-hidden">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div class="text item">公告</div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <login />
        </div>
      </el-col>
    </el-row>
    <!-- 手机端 只保留登录功能 -->
    <el-row class="mainpage hidden-sm-and-up">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <login />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import login from "./login.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    login
  },
  data() {
    //这里存放数据
    return {
      dates: new Date(),
      img: require("../../assets/img/logo.jpg")
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
}
.title {
  margin: 30px auto;
  font-size: 30px;
  color: #606266;
  font-weight: bold;
  text-align: center;
}
</style>
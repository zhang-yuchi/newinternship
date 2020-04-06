<!-- 布局 -->
<template>
  <div class="layout">
    <el-row>
      <el-col :xs="24" :sm="24" :lg="24" :xl="24">
        <el-header>
          <el-image style="width:70%;height:100%;" fit="scale-down" class="hidden-sm-and-down" :src="img" ></el-image>
          <logout></logout>
          <slot name="add-nav" class="xs-hidden"></slot>
        </el-header>
      </el-col>
    </el-row>
    <el-row :style="{minHeight:$store.state.screenHeight-$store.state.bannerHeight+'px'}">
      <el-col
        :xl="4"
        :lg="4"
        :xs="4"
        :sm="4"
        class="hidden-xs-and-down hidden-xs-only"
        style="100%"
      >
        <el-aside width="100%">
          <slot class="navs" name="nav"></slot>
        </el-aside>
      </el-col>
      <el-col :xl="20" :lg="20" :xs="24" :sm="20">
        <el-main style="width:100%;">
          <router-view></router-view>
        </el-main>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import logout from "./logout";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    logout
  },
  props: {},
  data() {
    //这里存放数据
    return {
      img: require("../../assets/img/logo.jpg")
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    $route(newVal) {
      // console.log(newVal);
      this.calcHeight()
    }
  },
  //方法集合
  methods: {
    calcHeight() {
      this.$store.commit("changeScreenHeight", window.innerHeight);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.calcHeight()
    
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

.el-header {
  background-color: #b3c0d1;
  color: #333;
  height: 10vw !important;
  background-color: white;
  border-bottom: 1px solid #ddd;
  position: relative;
}

.el-aside {
  /* overflow-y: auto; */
  background-color: white;
  color: #333;
  float: left;
  /* height: 100%; */
  text-align: center;
  line-height: 200px;
  height: 100%;
  width: 100%;
}

.el-main {
  width: 100%;
  background-color: white;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
  float: left;
  padding: 0;
}

.el-container {
  min-height: 100%;
  /* overflow-y:scroll; */
}
.navs {
  height: 100%;
}

</style>
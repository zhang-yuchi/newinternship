<!--  -->
<template>
  <div id="main">
    <layout>
      <div slot="add-nav" class="xs-hidden">
        <el-button @click.prevent="toastPhone">
          <i class="el-icon-menu"></i>
        </el-button>
        <el-menu
          v-if="isphone"
          :default-active="activeNav"
          class="el-menu-vertical-demo phone-menu"
          :collapse="true"
          :router="true"
          style="z-index:1000"
          menu-trigger="click"
          :unique-opened="true"
          @select="hiddenMenu"
          :collapse-transition="false"
          background-color="#545c64"
          active-text-color="#ffd04b"
          text-color="#fff"
          mode="horizontal"
        >
          <el-menu-item index="/teacher/profile">
            <i class="el-icon-user"></i>我的信息
          </el-menu-item>
          <el-menu-item index="/teacher/stu-list">
              <i class="el-icon-s-order"></i>学生列表
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-edit"></i>报告册
            </template>
            <el-menu-item-group>
              <el-menu-item index="/teacher/report-list1">一阶段</el-menu-item>
              <el-menu-item index="/teacher/report-list2">二阶段</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/teacher/decision-list">
            <i class="el-icon-edit"></i>鉴定表
          </el-menu-item>
        </el-menu>
      </div>

      <el-col slot="nav" style="height:100%;">
        <el-menu :default-active="activeNav" :router="true">
          <el-menu-item index="/teacher/profile">
            <i class="el-icon-user"></i>我的信息
          </el-menu-item>
          <el-menu-item index="/teacher/stu-list">
            <template slot="title">
              <i class="el-icon-s-order"></i>学生列表
            </template>
          </el-menu-item>
          <el-submenu index="">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span slot="title">报告册</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/teacher/report-list1">一阶段</el-menu-item>
              <el-menu-item index="/teacher/report-list2">二阶段</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/teacher/decision-list">
            <i class="el-icon-edit"></i>鉴定表
          </el-menu-item>
        </el-menu>
      </el-col>
    </layout>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import layout from "../../components/content/layout";
import { getStage } from "../../network";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    layout,
  },
  data() {
    //这里存放数据
    return {
      activeNav: "stu-list",
      isphone: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    $route(newc, cur) {
      this.activeNav = newc.path;
    },
  },
  //方法集合
  methods: {
    toastPhone() {
      this.isphone = !this.isphone;
    },
    hiddenMenu() {
      this.isphone = false;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.activeNav = this.$router.history.current.path;
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  deactivated() {}, //如果有keep-alive缓存功能,当该页面撤销使这个函数会触发
};
</script>
<style scoped>
#main {
  height: 100%;
  min-width: 1000px;
}
.el-menu {
  height: 100%;
  text-align: left;
}
.el-submenu {
  text-align: left !important;
}
.el-submenu .el-menu-item {
  min-width: 0;
}
.xs-hidden {
  display: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
}
@media screen and (max-width: 768px) {
  .xs-hidden {
    display: block !important;
  }
}
.phone-menu {
  position: absolute;
  background-color: white !important;
}
.phone-menu .el-submenu ,.phone-menu .el-menu-item{
  width: 150px;
  max-width: 150px;
  background-color: white;
}
</style>
<style>
#fenye {
  display: flex;
  justify-content: flex-end;
}
.search {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.input-with-select {
  width: 400px;
}
.el-select .el-input__inner{
  width: 90px;
}
</style>

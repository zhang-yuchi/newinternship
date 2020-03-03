<!--  -->
<template>
  <div class="main">
    <layout>
      <el-col slot="nav" style="height:100%;" :span="24">
        <el-menu :default-active="activeNav" :router="true" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>我的</span>
            </template>
            <el-menu-item-group>
              <template slot="title">个人信息</template>
              <el-menu-item index="/student/profile">我的信息</el-menu-item>
              <el-menu-item index="/student/modify-profile">修改信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-cooperation"></i>
              <span>我的企业</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/student/enterprise">查看企业</el-menu-item>
              <el-menu-item index="/student/enterprise-modify">修改企业信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>我的报告册</span>
            </template>
            <el-menu-item-group>
              <template slot="title">第一阶段</template>
              <el-menu-item index="/student/report-check/first-stage">查看报告册</el-menu-item>
              <el-menu-item index="/student/report/first-stage">填写报告册</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">第二阶段</template>
              <el-menu-item index="/student/report-check/second-stage">查看报告册</el-menu-item>
              <el-menu-item index="/student/report/second-stage">填写报告册</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>我的鉴定表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/student/decision-check">查看鉴定表</el-menu-item>
              <el-menu-item index="/student/decision">填写鉴定表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </layout>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import layout from "../../components/content/layout.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    layout
  },
  data() {
    //这里存放数据
    return {
      activeNav: "profile"
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    $route(newc, cur) {
      this.activeNav = newc.path;
    }
  },
  //方法集合
  methods: {},
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
  deactivated() {} //如果有keep-alive缓存功能,当该页面撤销使这个函数会触发
};
</script>
<style scoped>
.main {
  height: 100%;
}
.el-menu {
  height: 100%;
  text-align: left;
}
.el-submenu {
  text-align: left !important;
}
</style>
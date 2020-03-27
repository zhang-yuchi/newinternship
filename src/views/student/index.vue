<!--  -->
<template>
  <div class="main">
    <layout>
      <div slot="add-nav" class="xs-hidden">
        <el-button @click.prevent="toastPhone">
          <i class="el-icon-menu"></i>
        </el-button>
        <el-menu
          v-if="isphone"
          :default-active="activeNav"
          class="el-menu-vertical-demo phone-menu"
          mode="horizontal"
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
        >
          <el-submenu index="1">
            <template slot="title">我的</template>
            <el-menu-item index="/student/profile">我的信息</el-menu-item>
            <el-menu-item index="/student/modify-profile">修改信息</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">我的企业</template>
            <el-menu-item index="/student/enterprise">查看企业</el-menu-item>
            <el-menu-item index="/student/enterprise-modify">修改企业信息</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">我的报告册</template>
            <el-menu-item index="/student/report-check/first-stage">第一阶段查看</el-menu-item>
            <el-menu-item index="/student/report/first-stage">第一阶段填写</el-menu-item>
            <el-menu-item index="/student/report-check/second-stage">第二阶段查看</el-menu-item>
            <el-menu-item index="/student/report/second-stage">第二阶段填写</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">我的鉴定表</template>
            <el-menu-item index="/student/decision-check">第一阶段查看</el-menu-item>
            <el-menu-item index="/student/decision">第一阶段填写</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">文件下载</template>
            <el-menu-item index="/student/download">查看队列</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
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
              <el-menu-item
                index="/student/report/first-stage"
                :disabled="!$store.state.isReportStage1Open"
              >填写报告册</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">第二阶段</template>
              <el-menu-item index="/student/report-check/second-stage">查看报告册</el-menu-item>
              <el-menu-item
                index="/student/report/second-stage"
                :disabled="!$store.state.isReportStage2Open"
              >填写报告册</el-menu-item>
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
          <el-menu-item index="/student/download">
            <i class="el-icon-setting"></i>
            <span slot="title">文件下载</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </layout>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import layout from "../../components/content/layout.vue";
import { getStage } from "../../network";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    layout
  },
  data() {
    //这里存放数据
    return {
      activeNav: "profile",
      isphone: false
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
  methods: {
    toastPhone() {
      this.isphone = !this.isphone;
    },
    hiddenMenu() {
      this.isphone = false;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.activeNav = this.$router.history.current.path;
    // getStage().then(res => {
    //   // console.log(res);
    //   if (res.data.status == 1) {
    //     const states = res.data.data;
    //     this.$store.commit("changeReportStage1", states.isReportStage1Open);
    //     this.$store.commit("changeReportStage2", states.isReportStage2Open);
    //     this.$store.commit("changeReportStage3", states.isReportStage3Open);
    //     this.$store.commit(
    //       "changeIdentifyStage1",
    //       states.isIdentifyFormStage1Open
    //     );
    //     this.$store.commit(
    //       "changeIdentifyStage2",
    //       states.isIdentifyFormStage2Open
    //     );
    //     this.$store.commit(
    //       "changeIdentifyStage3",
    //       states.isIdentifyFormStage3Open
    //     );
    //   }
    // }).
    // catch(()=>{
    //   this.$message.error("阶段控制接口出错!请检测网络或告知管理员!!")
    // })
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
  /* transition: none; */
  position: absolute;
  /* top: 10px; */
  /* z-index: 1000; */

  background-color: white !important;
}
.phone-menu .el-submenu {
  width: 150px;
  max-width: 150px;
  background-color: white;
  /* border: 1px solid black; */
}
</style>
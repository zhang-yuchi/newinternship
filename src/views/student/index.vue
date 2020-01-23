<!--  -->
<template>
  <div class="main">
    <layout>
      <stunav slot="aside">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu :default-active="activeNav" class="el-menu-vertical-demo">
              <el-menu-item index="1" @click="tomsg">
                <i class="el-icon-user"></i>
                <span slot="title">个人信息</span>
              </el-menu-item>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-user"></i>
                  <span>修改信息</span>
                </template>
                <el-menu-item-group>
                  <!-- <template slot="title">阶段</template> -->
                  <el-menu-item index="4-1" @click="changepsw">修改密码</el-menu-item>
                  <el-menu-item index="4-2" @click="binding">绑定企业</el-menu-item>
                  <el-menu-item index="4-3" @click="mdfmsg">修改个人信息</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>报告册填写</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">阶段</template>
                  <el-menu-item index="2-1" @click="toFirstReport" disabled>第一阶段填写</el-menu-item>
                  <el-menu-item index="2-2" @click="toSecondReport">第二阶段填写</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="3" @click="toSubmit">
                <i class="el-icon-document"></i>
                <span slot="title">实习表填写</span>
              </el-menu-item>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>我的填写</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">报告册</template>
                  <el-menu-item index="5-1" @click="toCheckReport">查看</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <template slot="title">鉴定表</template>
                  <el-menu-item index="5-2" @click="toCheckSubmit">查看</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </stunav>
    </layout>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import stunav from "../../components/content/nav.vue";
import utils from "../../command/utils.js";
import layout from "../../components/content/layout.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    stunav,
    layout
  },
  data() {
    //这里存放数据
    return {
      activeNav: "1"
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //路由跳转
    tomsg() {
      utils.routerCheck(this, "/student/msg");
    },
    toFirstReport() {
      utils.routerCheck(this, "/student/report");
    },
    toSecondReport() {
      utils.routerCheck(this, "/student/secondreport");
    },
    toSubmit() {
      utils.routerCheck(this, "/student/submit");
    },
    changepsw() {
      utils.routerCheck(this, "/student/changepsw");
    },
    binding() {
      utils.routerCheck(this, "/student/binding");
    },
    toCheckReport() {
      utils.routerCheck(this, "/student/checkReport");
    },
    toCheckSubmit() {
      utils.routerCheck(this, "/student/checkSubmit");
    },
    mdfmsg(){
      utils.routerCheck(this, "/student/mdfmsg");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    if (this.$route.path.indexOf("msg") !== -1) {
      this.activeNav = "1";
    } else if (this.$route.path.indexOf("secondreport") !== -1) {
      this.activeNav = "2-2";
    } else if (this.$route.path.indexOf("submit") !== -1) {
      this.activeNav = "3";
    } else if (this.$route.path.indexOf("report") !== -1) {
      this.activeNav = "2-1";
    } else if (this.$route.path.indexOf("changepsw") !== -1) {
      this.activeNav = "4-1";
    } else if (this.$route.path.indexOf("binding") !== -1) {
      this.activeNav = "4-2";
    } else if (this.$route.path.indexOf("mdfmsg") !== -1) {
      this.activeNav = "4-3";
    } else if (this.$route.path.indexOf("checkReport") !== -1) {
      this.activeNav = "5-1";
    } else if (this.$route.path.indexOf("checkSubmit") !== -1) {
      this.activeNav = "5-2";
    }
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
@import "../../assets/css/nav.css";
.el-col{
  width: 300px;
}
</style>
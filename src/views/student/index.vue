<!--  -->
<template>
  <div class="main">
    <stunav>
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
          >
            <el-menu-item index="1" @click='tomsg'>
              <i class="el-icon-user"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
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
          </el-menu>
        </el-col>
      </el-row>
    </stunav>
    <router-view/>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import stunav from "../../components/content/nav.vue";
import utils from '../../command/utils.js'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    stunav
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    tomsg(){
        utils.routerCheck(this,'/student/msg')
    },
    toFirstReport(){
        
    },
    toSecondReport(){

    },
    toSubmit(){

    }

  },
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
.main {
  width: 400px;
}
</style>
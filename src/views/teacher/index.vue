<!--  -->
<template>
  <div class>
    <layout>
      <el-tabs class="select-menu" v-model="activeName" slot="select" @tab-click="handleClick">
        <el-tab-pane label="全部学生" name="first"></el-tab-pane>
        <el-tab-pane label="已填写鉴定表" name="second"></el-tab-pane>
        <el-tab-pane label="已填写报告册一阶段" name="third"></el-tab-pane>
        <el-tab-pane label="已填写报告册二阶段" name="fourth"></el-tab-pane>
      </el-tabs>
      <stunav slot="aside">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu :default-active="activeNav" class="el-menu-vertical-demo">
              <el-menu-item index="1" @click="tostulist">
                <i class="el-icon-user"></i>
                <span slot="title">学生列表</span>
              </el-menu-item>
              <el-menu-item index="2" @click="toreportlist">
                <i class="el-icon-document"></i>
                <span slot="title">报告册查看</span>
              </el-menu-item>

              <el-menu-item index="3" @click="tosubmitlist">
                <i class="el-icon-document"></i>
                <span slot="title">鉴定表查看</span>
              </el-menu-item>
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
import layout from "../../components/content/layout.vue";
import stunav from "../../components/content/nav";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    layout,
    stunav
  },
  data() {
    //这里存放数据
    return {
      activeName: "first",
      activeNav: "1"
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    tostulist() {},
    toreportlist() {},
    tosubmitlist() {}
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
.select-menu{
  display: inline-block;
  vertical-align: top;
  margin-right: 30px;
}
</style>
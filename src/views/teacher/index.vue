<!--  -->
<template>
  <div class>
    <layout>
      <el-select slot="select" v-model="value" placeholder="请选择查看学生" class="select-menu">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
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
import utils from "../../command/utils";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    layout,
    stunav
  },
  data() {
    //这里存放数据
    return {
      activeNav: "1",
      options: [
        {
          value: "ALL",
          label: "全部"
        },
        {
          value: "NOT",
          label: "尚未填写"
        },
        {
          value: "FIRST",
          label: "已填写报告册一阶段"
        },
        {
          value: "SECOND",
          label: "已填写报告册二阶段"
        },
        {
          value: "DECISION",
          label: "已填写鉴定表"
        },
        {
          value: "FINISH",
          label: "已全部填写"
        }
      ],
      value: ""
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
    tostulist() {
      utils.routerCheck(this, "/teacher/studentlist");
    },
    toreportlist() {
      utils.routerCheck(this, "/teacher/reportlist");
    },
    tosubmitlist() {
      utils.routerCheck(this, "/teacher/submitlist");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    if(this.$route.path.indexOf('/studentlist')!==-1){
      this.activeNav = "1"
    }else if(this.$route.path.indexOf('/reportlist')!==-1){
      this.activeNav = "2"
    }else if(this.$route.path.indexOf('/submitlist')!==-1){
      this.activeNav = "3"
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
.select-menu {
  display: inline-block;
  vertical-align: top;
  margin-right: 30px;
}
.el-col {
  width: 300px;
}
</style>
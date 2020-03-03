<!--  -->
<template>
  <div class>
    <el-card>
      <div class="decision-title">我的鉴定表</div>
      <div class="Divider">个人实习</div>
      <form-item title="实习内容" content="暂无"></form-item>
      <form-item title="实习生自我总结" content="暂无"></form-item>
      <div class="Divider">评价</div>
      <form-item title="实习单位指导老师评语" content="暂无" time="暂无"></form-item>
      <div class="sub-divider">实习成绩</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <form-item title="实习单位指导教师成绩评定" timefloat="left" content="暂无" time="暂无"></form-item>
        </el-col>
        <el-col :span="12">
          <form-item title="学院指导教师成绩评定" timefloat="left" content="暂无" time="暂无"></form-item>
        </el-col>
      </el-row>
      <form-item title="综合实习成绩评定" content="暂无" time="暂无"></form-item>
      <form-item title="学院实习领导小组意见" content="暂无" time="暂无"></form-item>
    </el-card>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import formItem from "../../components/content/form-block";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    formItem
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
.el-card {
  width: 80%;
  margin: 0 auto;
}
.decision-title {
  font-weight: bold;
  padding: 16px 0;
  border-bottom: 1px solid #ddd;
}
.Divider {
  color: rgb(64, 158, 255);
  padding: 8px 0;
}
.sub-divider{
    color: #e4ad84;
    margin-bottom: 16px;
}
</style>
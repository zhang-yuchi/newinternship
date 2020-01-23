<!--  -->
<template>
  <div class="msg">
    <el-row :gutter="0">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="text item title">个人信息</div>
            <div class="text item">姓名: {{Std.name}}</div>
            <div class="text item">性别: {{Std.sex}}</div>
            <div class="text item">学号: {{Std.id}}</div>
            <div class="text item">学院: {{Std.college}}</div>
            <div class="text item">身份证: {{Std.identity}}</div>
            <div class="text item">手机号: {{Std.phone}}</div>
            <div class="text item">微信号: {{Std.wechat}}</div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="text item title">企业信息</div>
            <div class="text item">企业名: </div>
            <div class="text item">企业号: </div>
            <div class="text item">法人: </div>
            <div class="text item">上市时间: </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" >
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="text item title">导师信息</div>
            <div class="text item">姓名: </div>
            <div class="text item">工号: </div>
            <div class="text item">微信号: </div>
            <div class="text item">手机号: </div>
          </el-card>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import entity from "../../command/entity/student";

export default {
  //import引入的组件需要注入到对象中才能使用

  components: {},
  data() {
    //这里存放数据
    return {
      Std: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let obj = {
      name: "zc"
    };
    let Std = new entity.Student(obj);
    console.log(Std);
    this.Std = Std;
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    document.title = "个人中心";
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
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
.el-row:nth-of-type(2){
  margin-top: 30px;
}
.title{
  font-weight: bold;
  font-size: 20px;
}
</style>
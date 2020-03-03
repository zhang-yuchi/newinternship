<!--  -->
<template>
  <div class>
    <el-card class="box-card">
      <div class="card-title">个人信息</div>
      <!-- <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div> -->
      <el-row>
        <el-col :span="12">
          <div class="text item">
            <span class="item-title">姓名</span>
            <span class="item-content">张三</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <span class="item-title">学号</span>
            <span class="item-content">1234567890</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="text item">
            <span class="item-title">微信</span>
            <span class="item-content">ruankun521</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <span class="item-title">年龄</span>
            <span class="item-content">25</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="text item">
            <span class="item-title">电话</span>
            <span class="item-content">18783551223</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <span class="item-title">专业</span>
            <span class="item-content">计算机科学与技术</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="text item">
            <span class="item-title">实习岗位</span>
            <span class="item-content">java实习</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <span class="item-title">实习企业</span>
            <span class="item-content">腾讯</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="text item">
            <span class="item-title">qq</span>
            <span class="item-content">2669327287</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <span class="item-title">学院</span>
            <span class="item-content">信息工程学院</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="text item">
            <span class="item-title">实习开始时间</span>
            <span class="item-content">2020-02-02</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <span class="item-title">实习结束时间</span>
            <span class="item-content">2020-01-01</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="text item">
            <span class="item-title">身份证号</span>
            <span class="item-content">510105199810211271</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
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
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
.card-title {
  font-weight: bold;
  color: #333;
  padding: 10px 0;
  border-bottom: 1px solid #dddddd;
}
.item-title,
.item-content {
  display: inline-block;
}
.item-content{
    width: 150px;
    word-break: break-word;
}
.item-title {
    width: 60px;
    /* text-align: right; */
    vertical-align: top;
  /* font-weight: bold; */
  color: rgb(97, 113, 139);
  margin-right: 10px;
}
</style>
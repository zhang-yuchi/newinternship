<!--  -->
<template>
  <div class="main">
    <layout>
      <el-col slot="nav" style="height:100%;" :span="24">
        <el-menu default-active="1-1" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>我的</span>
            </template>
            <el-menu-item-group>
              <template slot="title">个人信息</template>
              <el-menu-item index="1-1">我的信息</el-menu-item>
              <el-menu-item index="1-2">修改信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">我的企业</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-edit"></i>
            <span slot="title">我的报告册</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-edit"></i>
            <span slot="title">我的鉴定表</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </layout>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import layout from '../../components/content/layout'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    layout
},
data() {
//这里存放数据
return {

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

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
deactivated() {}, //如果有keep-alive缓存功能,当该页面撤销使这个函数会触发
}
</script>
<style scoped>
.main{
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
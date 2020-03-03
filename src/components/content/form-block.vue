<!--  -->
<template>
<div class='block-item'>
    <div class="block-title">{{title}}</div>
    <div class="block-content">
        {{content}}
    </div>
    <div class="block-time">时间 {{time}}</div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props:{
    title:String,
    content:String,
    time:String
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
.block-title{
    font-size: 14px;
    color: #378f8c;
    padding: 6px 0;
    border-bottom: 1px solid #dddddd;
}
.block-content{
    font-size: 14px;
    line-height: 22px;
    padding: 5px 0;
}
.block-time{
    font-size: 14px;
    color: #9a9999;
    margin-top: 10px;
    text-align: right;
}
.block-item{
    
    margin-bottom: 18px;
    
}
</style>
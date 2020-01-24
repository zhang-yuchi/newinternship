<!--  -->
<template>
<el-card class="box-card login" shadow="hover">
<div class="title">登录</div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="60px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="身份">
        <el-radio-group v-model="form.identify">
          <el-radio label="学生"></el-radio>
          <el-radio label="教师"></el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="controls">
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </div>
      <!-- <el-button type="primary">主要按钮</el-button> -->
    </el-form>
</el-card>


    

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }else{
        this.$refs.ruleForm.validateField("checkAge");
        callback()
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };


    //这里存放数据
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        username: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: checkAge, trigger: "blur" }]
      },
      form: {
        username: "",
        passowrd: "",
        identify: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onSubmit() {
      console.log(this.ruleForm);
      if (this.form.identify == "学生") {
        this.$router.push("/student");
      } else if (this.form.identify == "教师") {
        this.$router.push("/teacher");
      } else {
        this.$alert("您还没有选择身份", "提示", {
          confirmButtonText: "确定"
        });
      }
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
.login {
  /* border: 1px solid #cdc8c8; */
  float: right;
  width: 80%;
  padding: 20px;
  margin: 0 auto;
  /* text-align: center; */
}
.title {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  color: #303133;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid #DCDFE6;
}
.controls{
  text-align: center;
}
</style>
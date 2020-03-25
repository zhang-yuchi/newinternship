<!--  -->
<template>
  <div>
    <el-card class="box-card login sm-hidden" shadow="hover">
      <div class="log" v-if="islog">
        <div class="title">登录</div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="60px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input type="text" v-model="ruleForm.code" autocomplete="off"></el-input>
            <img class="checkimg" @click="repeatImg" :src="checkUrl" alt />
          </el-form-item>
          <el-form-item label="身份" prop="identify">
            <el-radio-group v-model="form.identify">
              <el-radio label="学生"></el-radio>
              <el-radio label="教师"></el-radio>
            </el-radio-group>
            <el-link class="margin" type="primary" :underline="false" v-on:click="changePsw">忘记密码</el-link>
          </el-form-item>

          <div class="controls">
            <el-button type="primary" @click="onSubmit('ruleForm')" :loading="loginLoading">登录</el-button>
          </div>
          <!-- <el-button type="primary">主要按钮</el-button> -->

          <el-link class="email" :underline="false" type="warning">网络功能异常反馈:qkmc@outlook.com</el-link>
        </el-form>
      </div>
      <div class="change" v-if="!islog">
        <div class="title">修改密码</div>
        <el-form
          :model="forgetForm"
          status-icon
          :rules="rules"
          ref="forgetForm"
          label-width="100px"
          class="demo-forgetForm"
        >
          <el-form-item label="账号">
            <el-input v-model.number="forgetForm.account"></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model.number="forgetForm.identify"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="forgetForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input type="text" v-model="forgetForm.code" autocomplete="off"></el-input>
            <img class="checkimg" @click="repeatImg" :src="checkUrl" alt />
          </el-form-item>
          <el-form-item label="身份" style="margin-top:-10px;">
            <el-radio-group v-model="forgetForm.typeField">
              <el-radio label="学生"></el-radio>
              <el-radio label="老师"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('forgetForm')">提交</el-button>
            <el-button @click="resetForm">返回</el-button>
          </el-form-item>
          <!-- <el-button type="primary">主要按钮</el-button> -->
        </el-form>
      </div>
    </el-card>

    <!-- 手机版 -->
    <el-card class="box-card login hidden-sm-and-up" shadow="hover">
      <div class="log" v-if="islog">
        <div class="title">登录</div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-position="top"
          label-width="60px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input type="text" v-model="ruleForm.code" autocomplete="off"></el-input>
            <img class="checkimg" @click="repeatImg" :src="checkUrl" alt />
          </el-form-item>
          <el-form-item label="身份">
            <el-radio-group v-model="form.identify">
              <el-radio label="学生"></el-radio>
              <el-radio label="教师"></el-radio>
            </el-radio-group>
            <el-link class="margin" type="primary" :underline="false" v-on:click="changePsw">忘记密码</el-link>
          </el-form-item>

          <div class="controls">
            <el-button type="primary" @click="onSubmit('ruleForm')">登录</el-button>
          </div>
          <!-- <el-button type="primary">主要按钮</el-button> -->

          <el-link class="email" :underline="false" type="warning">网络功能异常反馈:qkmc@outlook.com</el-link>
        </el-form>
      </div>
      <div class="change" v-if="!islog">
        <div class="title">修改密码</div>
        <el-form
          :model="forgetForm"
          status-icon
          :rules="rules"
          ref="forgetForm"
          label-width="100px"
          label-position="top"
          class="demo-ruleForm"
        >
          <el-form-item label="账号">
            <el-input v-model.number="forgetForm.account"></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model.number="forgetForm.identify"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="forgetForm.password1" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input type="text" v-model="forgetForm.code" autocomplete="off"></el-input>
            <img class="checkimg" @click="repeatImg" :src="checkUrl" alt />
          </el-form-item>
          <el-form-item label="身份" style="margin-top:-10px;">
            <el-radio-group v-model="forgetForm.typeField">
              <el-radio label="学生"></el-radio>
              <el-radio label="老师"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('forgetForm')">提交</el-button>
            <el-button @click="resetForm">返回</el-button>
          </el-form-item>

          <!-- <el-button type="primary">主要按钮</el-button> -->
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getVerify, login, modifyPassword } from "../../network";

// import validator from 'validator'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        this.$refs.ruleForm.validateField("checkAge");
        callback();
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
    var checkVerify = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if (value.length !== 4) {
        return callback(new Error("请输入正确的验证码"));
      } else {
        this.$refs.ruleForm.validateField("checkVerify");
        callback();
      }
    };
    //这里存放数据
    return {
      ruleForm: {
        password: "",
        checkPass: "",
        account: "",
        code: ""
      },
      forgetForm: {
        account: "",
        pass: "",
        checkPass: "",
        identify: "",
        type: ""
      },
      loginLoading: false,
      checkUrl: "",
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        account: [{ validator: checkAge, trigger: "blur" }],
        code: [{ validator: checkVerify, trigger: "blur" }]
      },
      islog: true,
      form: {
        account: "",
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
    getLogin(type, callback) {
      let loginType = "";
      switch (type) {
        case "学生":
          loginType = "student";
          break;
        case "教师":
          loginType = "teacher";
          break;
        default:
          break;
      }
      if (!loginType) {
        this.$message.error("身份错误");
        return;
      }
      this.loginLoading = true;
      login({
        username: this.ruleForm.account,
        verifyCode: this.ruleForm.code,
        password: this.ruleForm.password,
        type: loginType
      })
        .then(res => {
          if (res.data.status === 1001) {
            sessionStorage.setItem("token", res.data.data);
            callback();
          } else {
            var reg = /username/;
            let errorMsg = reg.test(res.data.message)
              ? "用户名或密码错误!"
              : res.data.message;
            this.$message.error(errorMsg);
          }
        })
        .finally(() => {
          this.getVerifyImg();
          this.loginLoading = false;
        });
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(111)
          // console.log(this.form.identify);
          if (!this.form.identify) {
            this.$message.error("您还没有选择身份");
            return;
          }
          this.getLogin(this.form.identify, () => {
            // console.log(this.form.identify);
            if (this.form.identify === "学生") {
              this.$router.push("/student");
            } else if (this.form.identify === "教师") {
              this.$router.push("/teacher");
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    changePsw() {
      this.islog = false;
    },
    getVerifyImg() {
      getVerify().then(res => {
        // console.log(res);
        let blob = res.data;
        let src = window.URL.createObjectURL(blob);
        this.checkUrl = src;
      });
    },
    repeatImg() {
      this.getVerifyImg();
    },
    resetForm() {
      this.islog = true;
    },
    submitForm(formName) {
      const { account, pass, typeField, code, identify } = this.forgetForm;
      if (!account) {
        this.$message.warning("请输入账号");
        return;
      }
      if (!pass) {
        this.$message.warning("请输入密码");
        return;
      }
      if (!identify) {
        this.$message.warning("请输入身份证");
        return;
      }
      if (!typeField) {
        this.$message.warning("请输入身份");
        return;
      }
      if (!code || code.length !== 4) {
        this.$message.warning("请输入正确的验证码");
        return;
      }
      this.forgetForm.type =
        this.forgetForm.typeField === "学生" ? "student" : "teacher";
      this.forgetForm = Object.assign({}, this.forgetForm, {
        password: pass,
        idcard: identify,
        username: account,
        verifyCode: code
      });
      console.log(this.forgetForm);
      modifyPassword(this.forgetForm).then(res => {
        console.log(res);
        if (res.data.status < 0) {
          this.$message.error(res.data.message);
          this.getVerifyImg();
        } else if (res.data.status == 100) {
          this.getVerifyImg();
          this.$message.success("修改成功!");
          this.islog = true;
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getVerifyImg();
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
  border-bottom: 1px solid #dcdfe6;
}
.controls {
  text-align: center;
}
.margin {
  margin-left: 20px;
  margin-top: -2px;
}
.email {
  text-align: center;
  width: 100%;
  margin-top: 20px;
}
.checkimg {
  position: absolute;
  right: 25px;
  top: 5px;
  width: 100px;
  cursor: pointer;
}
</style>
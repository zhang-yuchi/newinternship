<!--  -->
<template>
  <div class>
    <layout>
      <div slot="header" class="clearfix">
        <span class="header-title">信息修改</span>
        <el-button style="float: right; padding: 3px 0" @click="showTime" type="text">修改实习时间</el-button>
        <el-button style="float: right; padding: 3px 0" @click="changePsw" type="text">修改密码</el-button>
      </div>

      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="电话" prop="phone">
          <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="wechat">
          <el-input type="text" v-model="ruleForm.wechat" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="qq">
          <el-input v-model.number="ruleForm.qq"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="校外导师工号" prop="corpTeacherNo">
          <el-input v-model.number="ruleForm.corpTeacherNo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleForm)">修改</el-button>
        </el-form-item>
      </el-form>
    </layout>
    <!-- 修改密码弹窗 -->
    <el-dialog
      title="修改密码"
      :visible.sync="pswBoxVisible"
      :show-close="false"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="pswForm"
        status-icon
        :rules="rules"
        ref="pswForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="pswForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="pswForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pswBoxVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPsw('pswForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改实习时间弹窗 -->
    <el-dialog
      title="修改实习时间"
      :visible.sync="timeVisible"
      width="30%"
      :before-close="handleClose"
      :show-close="false"
    >
      <el-form
        :model="timeForm"
        status-icon
        :rules="rules"
        ref="timeForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="实习开始时间" placeholder="选择日期" prop="gmtStart">
          <el-date-picker type="date" v-model="timeForm.gmtStart" autocomplete="off"></el-date-picker>
        </el-form-item>
        <el-form-item label="实习结束时间" placeholder="选择日期" prop="gmtEnd">
          <el-date-picker type="date" v-model="timeForm.gmtEnd" autocomplete="off"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="timeVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTime('timeForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import layout from "../../components/content/form-layout";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    layout
  },
  data() {
    var checkNumber = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    var checkNull = (rule, value, callback) => {
      if (!value) {
        callback(new Error("必传项不能为空!"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      setTimeout(() => {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }, 1000);
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        age: "",
        corpTeacherNo: "",
        phone: "",
        qq: "",
        wechat: ""
      },
      pswForm: {
        pass: "",
        checkPass: ""
      },
      timeForm: {
        gmtEnd: "",
        gmtStart: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        age: [{ validator: checkNumber, trigger: ["blur"] }],
        qq: [{ validator: checkNumber, trigger: ["blur"] }],
        corpTeacherNo: [{ validator: checkNumber, trigger: ["blur"] }],
        gmtStart: [{ validator: checkNull, trigger: ["blur"] }],
        gmtEnd: [{ validator: checkNull, trigger: ["blur"] }]
      },
      pswBoxVisible: false,
      timeVisible: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(done) {},
    changePsw() {
      this.pswBoxVisible = true;
    },
    submitPsw(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        //   alert("submit!");
          this.pswBoxVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      
    },
    showTime() {
      this.timeVisible = true;
    },
    submitTime(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        //   alert("submit!");
          this.timeVisible = false
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
.el-card .el-input {
  width: 50%;
}
.clearfix {
  border-bottom: #dddddd;
  margin-bottom: 16px;
}
.header-title {
  font-weight: bold;
}
.el-button {
  margin-right: 15px;
}
</style>
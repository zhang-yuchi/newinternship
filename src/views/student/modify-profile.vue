<!--  -->
<template>
  <div class>
    <layout v-loading="formLoading">
      <div slot="header" class="clearfix">
        <span class="header-title">信息修改</span>
        <!-- <el-button style="float: right; padding: 3px 0" @click="showTime" type="text">修改实习时间</el-button>
        <el-button style="float: right; padding: 3px 0" @click="changePsw" type="text">修改密码</el-button>-->
      </div>

      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        label-position="left"
      >
      <el-form-item label="导师工号" prop="teachno">
          <el-input type="text" v-model="ruleForm.teachno" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="实习岗位" prop="position">
          <el-input type="text" v-model="ruleForm.position" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="实习开始时间" placeholder="选择日期" >
          <el-date-picker type="date" v-model="ruleForm.starttime" autocomplete="off"></el-date-picker>
        </el-form-item>
        <el-form-item label="实习结束时间" placeholder="选择日期" >
          <el-date-picker type="date" v-model="ruleForm.endtime" autocomplete="off"></el-date-picker>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="微信" >
          <el-input type="text" v-model="ruleForm.wechat" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="QQ" >
          <el-input v-model.number="ruleForm.qq"></el-input>
        </el-form-item>
        <el-form-item label="年龄" >
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <!-- <el-form-item label="校外导师工号" prop="age">
          <el-input v-model.number="ruleForm.corpTeacherNo"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" :loading="btnLoading" @click="submitForm('ruleForm')">修改</el-button>
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
      class="hidden-sm-and-down"
    >
      <el-form
        :model="pswForm"
        status-icon
        :rules="rules"
        ref="pswForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" :show-message="true" :error="originError" prop="oldPsw">
          <el-input type="password" v-model="pswForm.oldPsw" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :show-message="true" :error="newError" prop="pass">
          <el-input type="password" v-model="pswForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="pswForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pswBoxVisible = false">取 消</el-button>
        <el-button type="primary" :loading="pswLoading" @click="submitPsw('pswForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 手机版 -->
    <el-dialog
      title
      :visible.sync="pswBoxVisible"
      :show-close="false"
      width="300px"
      height="400px"
      :before-close="handleClose"
      :modal="false"
      class="hidden-sm-and-up"
    >
      <el-form
        :model="pswForm"
        status-icon
        :rules="rules"
        ref="pswForm"
        label-position="top"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" :show-message="true" :error="originError" prop="oldPsw">
          <el-input type="password" v-model="pswForm.oldPsw" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :show-message="true" :error="newError" prop="pass">
          <el-input type="password" v-model="pswForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="pswForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pswBoxVisible = false">取 消</el-button>
        <el-button type="primary" :loading="pswLoading" @click="submitPsw('pswForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import layout from "../../components/content/form-layout";
import moment from "moment";
import {
  getStudentInfo,
  modifySelfInfo,
  modifyReportDate,
  modifyPswInner
} from "../../network";
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
      });
    };
    var checkNull = (rule, value, callback) => {
      // console.log(value)
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
      });
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
      } else if (value !== this.pswForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        age: "",
        // corpTeacherNo: "",
        phone: "",
        qq: "",
        wechat: "",
        position:"",
        starttime:"",
        endtime:"",
        teachno:"",
      },
      pswForm: {
        oldPsw: "",
        pass: "",
        checkPass: ""
      },
      timeForm: {
        gmtEnd: "",
        gmtStart: ""
      },
      timeBtnLoading: false,
      formLoading: false,
      rules: {
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        position:[{ required: true, validator: checkNull, trigger: "blur" }],
        oldPsw: [{ required: true, validator: checkNull, trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        age: [{ required: true, validator: checkNumber, trigger: ["blur"] }],
        qq: [{ required: true, validator: checkNumber, trigger: ["blur"] }],
        corpTeacherNo: [
          { required: true, validator: checkNumber, trigger: ["blur"] }
        ],
        gmtStart: [{ required: true, validator: checkNull, trigger: ["blur"] }],
        gmtEnd: [{ required: true, validator: checkNull, trigger: ["blur"] }],
        wechat: [{ required: true, trigger: ["blur"] }]
      },
      pswBoxVisible: false,
      timeVisible: false,
      originError: "",
      newError: "",
      btnLoading: false,
      pswLoading: false
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
          // alert("submit!");
          this.btnLoading = true;
          // console.log(this.ruleForm);
          let hasStartTime = !!this.ruleForm.starttime
          let hasEndTime = !!this.ruleForm.endtime
          hasStartTime&&formatTime(this.ruleForm,"starttime")
          hasEndTime&&formatTime(this.ruleForm,"endtime")
          // console.log(this.ruleForm);
          modifySelfInfo(this.ruleForm)
            .then(res => {
              // console.log(res);
              if (res.data.status == 100) {
                this.$message.success("修改成功!");
                this.getInfo();
              }
            })
            .finally(() => {
              this.btnLoading = false;
            });
        } else {
          // console.log("error submit!!");

          return false;
        }
      });
      function formatTime(data,key){
        data[key] = moment(data[key]).format("YYYY-MM-DD HH:mm:ss")
      }
    },

    handleClose(done) {},
    changePsw() {
      this.pswBoxVisible = true;
    },
    submitPsw(formName) {
      this.originError = "";
      this.newError = "";
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   alert("submit!");
          this.pswLoading = true;
          modifyPswInner({
            newPassword: this.pswForm.pass,
            oldPassword: this.pswForm.oldPsw
          })
            .then(res => {
              // console.log(res);
              if (res.data.status == 1) {
                // this.originError = "";
                // this.newError = "";
                this.$message.success("密码修改成功!");
                this.pswBoxVisible = false;
              } else {
                // console.log(111)
                const origin = /^原密码/;
                const newErr = /^密码/;
                if (origin.test(res.data.message)) {
                  this.originError = res.data.message;
                  // console.log(this.originError)
                  // this.newError = "";
                } else {
                  // this.originError = "";
                  this.newError = res.data.message;
                  // console.log(this.newError)
                }
              }
            })
            .finally(() => {
              this.pswLoading = false;
            });
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
      this.timeBtnLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   alert("submit!");
          this.timeForm.gmtStart = moment(this.timeForm.gmtStart).format(
            "YYYY-MM-DD"
          );
          this.timeForm.gmtEnd = moment(this.timeForm.gmtEnd).format(
            "YYYY-MM-DD"
          );
          modifyReportDate(this.timeForm)
            .then(res => {
              console.log(res);
              if (res.data.status == 1) {
                this.$message.success("更新成功!");
                this.timeVisible = false;
                this.getInfo();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .finally(() => {
              this.timeBtnLoading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getInfo() {
      this.formLoading = true;
      getStudentInfo()
        .then(res => {
          console.log(res);
          let {qq,age,phone,wechat,position,starttime,endtime,teachno} = res.data.data
          this.ruleForm = {qq,age,phone,wechat,position,starttime,endtime,teachno};
          console.log(this.ruleForm);
          this.timeForm.gmtStart = res.data.data.gmtStart;
          this.timeForm.gmtEnd = res.data.data.gmtEnd;
        })
        .finally(() => {
          this.formLoading = false;
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getInfo();
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
.el-date-editor.el-input {
  width: 100%;
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
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
        <el-form-item label="年龄">
          <el-input type="number" v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="ruleForm.sex">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="btnLoading"
            @click="submitForm('ruleForm')"
            >修改</el-button
          >
        </el-form-item>
      </el-form>
    </layout>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import layout from "../../components/content/form-layout";
import { getTeacher, modifyTeacher } from "../../network/index";
export default {
  name:"Modify-profile",
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
    return {
      ruleForm: {
        age: "",
        sex: ""
      },
      formLoading: false,
      rules: {
        sex: [{ required: true, validator: checkNull, trigger: "blur" }],
        age: [{ required: true, validator: checkNumber, trigger: ["blur"] }]
      },
      btnLoading: false,
      options:['男','女']
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
          this.btnLoading = true;
          console.log(this.ruleForm);
          modifyTeacher(this.ruleForm)
            .then(res => {
              // console.log(res);
              if (res.data.status == 100) {
                this.$message.success("修改成功!");
                this.$router.back()
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
    },

    handleClose(done) {},
    getInfo() {
      this.formLoading = true;
      getTeacher()
        .then(res => {
          console.log(res);
          let { sex, age } = res.data.data;
          this.ruleForm = {
            sex,
            age
          };
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

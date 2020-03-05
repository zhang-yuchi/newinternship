<!-- 查看企业 -->
<template>
  <div class>
    <el-card class="box-card" v-loading="cardLoading">
      <div slot="header" class="clearfix">
        <span style="font-weight:bold;">我的企业</span>
        <el-button
          style="float: right; padding: 3px 0"
          @click="dialogVisible = true"
          type="text"
        >绑定实习岗位</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="text item">
            <span class="header-title">企业名称</span>
            <span class="header-content">{{corp.corpName}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <span class="header-title">类型</span>
            <span class="header-content">{{corp.type}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="text item">
            <span class="header-title">法人</span>
            <span class="header-content">{{corp.legalPerson}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <span class="header-title">注册资本</span>
            <span class="header-content">{{corp.registerCapita}}万元</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="text item">
            <span class="header-title">企业注册号</span>
            <span class="header-content">{{corp.regCode}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <span class="header-title">创建日期</span>
            <span class="header-content">{{corp.createDate}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="text item">
            <span class="header-title">开始营业日期</span>
            <span class="header-content">{{corp.startBusiness}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <span class="header-title">营业期限截止日期</span>
            <span class="header-content">{{corp.endBusiness}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="text item">
            <span class="header-title">工商信息登记机关</span>
            <span class="header-content">{{corp.regAuthority}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <span class="header-title">核准日期</span>
            <span class="header-content">{{corp.approvalDate}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="text item">
            <span class="header-title">登记状态</span>
            <span class="header-content">{{corp.regStatus}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <span class="header-title">住所地址</span>
            <span class="header-content">{{corp.address}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="text item">
            <span class="header-title">营业范围</span>
            <span class="header-content">{{corp.businessScope}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <span class="header-title">统一社会信用代码</span>
            <span class="header-content">{{corp.creditCode}}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- 修改实习岗位 -->
    <el-dialog title="修改实习岗位" :visible.sync="dialogVisible" width="30%" class="hidden-sm-and-down">
      <el-form
        :model="Form"
        status-icon
        :rules="rules"
        ref="Form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="实习岗位" prop="position">
          <el-input type="text" v-model="Form.position" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('Form')">提交</el-button>
      </span>
    </el-dialog>
    <!-- 修改实习岗位手机版 -->
    <el-dialog
      title
      :visible.sync="dialogVisible"
      width="300px"
      class="hidden-sm-and-up"
      :modal="false"
    >
      <el-form
        :model="Form"
        status-icon
        :rules="rules"
        ref="Form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="实习岗位" prop="position">
          <el-input type="text" v-model="Form.position" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('Form')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { checkCorp, getStudentInfo, modifyPosition } from "../../network";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    var checkNull = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("岗位不能为空"));
      } else {
        callback();
      }
    };
    //这里存放数据
    return {
      dialogVisible: false,
      Form: {
        position: ""
      },
      rules: {
        position: [
          {
            validator: checkNull,
            trigger: "blur"
          }
        ]
      },
      corp: {},
      cardLoading: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    submitForm(formName) {
      // console.log(1)
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          modifyPosition(this.Form).then(res => {
            // console.log(res)
            if (res.data.status == 1) {
              //修改成功
              this.$message.success("修改成功!");
              this.dialogVisible = false;
              this.getCorp();
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    getCorp() {
      this.cardLoading = true;
      checkCorp()
        .then(res => {
          // console.log(res);
          if (res.data.status == 1) {
            this.corp = res.data.data;
          }
        })
        .then(() => {
          getStudentInfo().then(res => {
            // console.log(res);
            if (res.data.status == 1) {
              this.Form.position = res.data.data.corpPosition;
            }
          });
        })
        .finally(() => {
          this.cardLoading = false;
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getCorp();
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
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin: 0 auto;
  /* width: 70%; */
}
.header-title {
  /* margin-right: 8px; */
  width: 80px;
  color: rgb(97, 113, 139);
}
.header-title,
.header-content {
  line-height: 20px;
  vertical-align: top;
  display: inline-block;
}
.header-content {
  width: 300px;
}
</style>
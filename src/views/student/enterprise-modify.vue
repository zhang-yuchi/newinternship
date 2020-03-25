<!-- 修改企业信息 -->
<template>
  <div class>
    <form-layout v-loading="formLoading">
      <div slot="header" class="form-header">企业信息填写</div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm hidden-sm"
        size="small"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="企业名称" prop="corpName">
              <el-input type="text" v-model="ruleForm.corpname" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-input type="text" v-model="ruleForm.type" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="法人" prop="legalPerson">
              <el-input type="text" v-model="ruleForm.legalperson" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册资本" prop="registerCapita">
              <el-input type="text" v-model="ruleForm.registercapital" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="创建时间" prop="createDate">
              <el-input type="text" v-model="ruleForm.createdate" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始营业时间" prop="startBusiness">
              <el-input type="text" v-model="ruleForm.startbusiness" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="营业期限截止日期" prop="endBusiness">
              <el-input type="text" v-model="ruleForm.endbusiness" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工商信息等级机关" prop="regAuthority">
              <el-input type="text" v-model="ruleForm.regauthority" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="核准日期" prop="approvalDate">
              <el-input type="text" v-model="ruleForm.approvaldate" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登记状态" prop="regStatus">
              <el-input type="text" v-model="ruleForm.regstatus" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="住所地址" prop="address">
              <el-input type="text" v-model="ruleForm.address" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经营范围" prop="businessScope">
              <el-input type="text" v-model="ruleForm.businessScope" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="统一社会信用代码" prop="creditCode">
              <el-input type="text" v-model="ruleForm.creditcode" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业注册号" prop="regCode">
              <el-input
                type="text"
                v-model="ruleForm.regcode"
                placeholder="若企业有注册号则必填"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" :loading="btnLoading" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>

      <!-- 手机版 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm hidden-sm-and-up"
        size="small"
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="企业名称" prop="corpname">
              <el-input type="text" v-model="ruleForm.corpname" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="类型" prop="type">
              <el-input type="text" v-model="ruleForm.type" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="法人" prop="legalperson">
              <el-input type="text" v-model="ruleForm.legalperson" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="注册资本" prop="registercapital">
              <el-input type="text" v-model="ruleForm.registercapital" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="创建时间" prop="createdate">
              <el-input type="text" v-model="ruleForm.createdate" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="开始营业时间" prop="startbusiness">
              <el-input type="text" v-model="ruleForm.startbusiness" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="营业期限截止日期" prop="endbusiness">
              <el-input type="text" v-model="ruleForm.endbusiness" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="工商信息等级机关" prop="regauthority">
              <el-input type="text" v-model="ruleForm.regauthority" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="核准日期" prop="approvaldate">
              <el-input type="text" v-model="ruleForm.approvaldate" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="登记状态" prop="regstatus">
              <el-input type="text" v-model="ruleForm.regstatus" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="住所地址" prop="address">
              <el-input type="text" v-model="ruleForm.address" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="经营范围" prop="businessScope">
              <el-input type="text" v-model="ruleForm.businessScope" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="统一社会信用代码" prop="creditcode">
              <el-input type="text" v-model="ruleForm.creditcode" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="企业注册号" prop="regcode">
              <el-input
                type="text"
                v-model="ruleForm.regcode"
                placeholder="若企业有注册号则必填"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" :loading="btnLoading" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </form-layout>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import formLayout from "../../components/content/form-layout";
import { checkCorp ,modifyCorp } from "../../network";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    formLayout
  },
  data() {
    var checkNull = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("必填不能为空"));
      }else{
        callback()
      }

    };
    //这里存放数据
    return {
      ruleForm: {
        address: "",
        approvalDate: "",
        businessScope: "",
        corpName: "",
        createDate: "",
        creditCode: "",
        endBushiness: "",
        id: "",
        isCorpChecked: "",
        legalPerson: "",
        regAuthority: "",
        regCode: "",
        regStatus: "",
        registerCapita: "",
        startBusiness: "",
        stuNo: "",
        type: ""
      },
      btnLoading:false,
      rules: {
        corpName: [
          {
            validator: checkNull,
            required: true,
            trigger: "blur"
          }
        ],
        legalPerson: [
          {
            validator: checkNull,
            required: true,
            trigger: "blur"
          }
        ]
      },
      formLoading: false
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
          this.btnLoading = true
          modifyCorp(this.ruleForm)
          .then(res=>{
            console.log(res)
            if(res.data.status==1){
              this.$message.success('修改成功!')
              this.getCorp()
              
            }
          })
          .finally(()=>{
            this.btnLoading = false
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getCorp() {
      this.formLoading = true;
      checkCorp()
        .then(res => {
          // console.log(res);
          if (res.data.status == 1) {
            this.ruleForm = Object.assign({}, res.data.data, {});
          }
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
.el-form-item {
  line-height: 18px !important;
}
.form-header {
  font-weight: bold;
  margin-bottom: 16px;
}
.hidden-sm{
  display: none;
}
@media screen and (min-width:768px) {
  .hidden-sm{
    display: block !important;
  }
}
</style>
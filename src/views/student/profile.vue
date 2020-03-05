<!--  -->
<template>
  <div class="profile-main">
    <el-row>
      <el-col :xs="24" :sm="24" :md="15" :lg="14" :xl="14">
        <el-card class="box-card" v-loading="studentLoading">
          <div class="card-title">个人信息</div>
          <el-row>
            <el-col :span="12">
              <div class="text item">
                <span class="item-title">姓名</span>
                <span class="item-content">{{studentInfo.name}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="text item">
                <span class="item-title">学号</span>
                <span class="item-content">{{studentInfo.stuNo}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="text item">
                <span class="item-title">微信</span>
                <span class="item-content">{{studentInfo.wechat}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="text item">
                <span class="item-title">年龄</span>
                <span class="item-content">{{studentInfo.age}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="text item">
                <span class="item-title">电话</span>
                <span class="item-content">{{studentInfo.phone}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="text item">
                <span class="item-title">专业</span>
                <span class="item-content">{{studentInfo.major}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="text item">
                <span class="item-title">实习岗位</span>
                <span class="item-content">{{studentInfo.corpPosition}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="text item">
                <span class="item-title">实习企业</span>
                <span class="item-content">{{studentInfo.corpName}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="text item">
                <span class="item-title">qq</span>
                <span class="item-content">{{studentInfo.qq}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="text item">
                <span class="item-title">学院</span>
                <span class="item-content">{{studentInfo.college}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="text item">
                <span class="item-title">实习开始时间</span>
                <span class="item-content">{{studentInfo.gmtStart}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="text item">
                <span class="item-title">实习结束时间</span>
                <span class="item-content">{{studentInfo.gmtEnd}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="text item">
                <span class="item-title">身份证号</span>
                <span class="item-content">{{studentInfo.idCard}}</span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col class="hidden-sm-and-down" :sm="24" :md="9" :lg="9" :offset="1" :xl="9">
        <el-card class="box-card" v-if="hasTeacher" v-loading="teacherLoading">
          <div class="card-title">导师信息</div>
          <div class="text item">
            <span class="item-title">姓名</span>
            <span class="item-content">{{teacherInfo.name}}</span>
          </div>

          <div class="text item">
            <span class="item-title">工号</span>
            <span class="item-content">{{teacherInfo.teacherNo}}</span>
          </div>
          <div class="text item">
            <span class="item-title">性别</span>
            <span class="item-content">{{teacherInfo.sex}}</span>
          </div>
          <div class="text item">
            <span class="item-title">年龄</span>
            <span class="item-content">{{teacherInfo.age}}</span>
          </div>
          <div class="text item">
            <span class="item-title">院校</span>
            <span class="item-content">{{teacherInfo.college}}</span>
          </div>
        </el-card>

        <el-card class="box-card" v-if="!hasTeacher" v-loading="teacherLoading">
          <div class="card-title" style="margin-bottom:18px;">选择导师</div>
          <el-select v-model="teacherNo" placeholder="请选择导师">
            <el-option
              v-for="item in teachers"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
          <div style="margin-top:18px;">
            <el-button type="primary" @click="selectTeacher">提交</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  getStudentInfo,
  getTeacherInfo,
  selectTeacher,
  selectTeacherByNo
} from "../../network";
import { replaceNull } from "../../command/utils";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      studentInfo: {},
      teacherInfo: {},
      teacherLoading: false,
      studentLoading: false,
      hasTeacher: true,
      teachers: [],
      teacherNo: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getInfo() {
      this.studentLoading = true;
      this.teacherLoading = true;
      getStudentInfo()
        .then(res => {
          console.log(res);
          this.studentInfo = Object.assign({}, res.data.data, {});
          this.studentInfo = replaceNull(this.studentInfo);
          // console.log(this.studentInfo)
        })
        .catch(() => {
          this.$message.error("获取信息失败!请重试");
        })
        .finally(() => {
          this.studentLoading = false;
        })
        .then(() => {
          console.log(this.studentInfo.teacherNo);
          if (this.studentInfo.teacherNo !== "暂无") {
            getTeacherInfo().then(res => {
              console.log(res);
              this.hasTeacher = true;
              this.teacherInfo = Object.assign({}, res.data.data, {});
              this.teacherInfo = replaceNull(this.teacherInfo);
              // console.log(this.teacherInfo)
            });
          } else {
            // console.log(111)
            selectTeacher().then(res => {
              // console.log(res)
              this.hasTeacher = false;
              if (res.data.status == 1) {
                this.teachers = [];
                res.data.data.map(item => {
                  this.teachers.push({
                    value: item.teacherNo,
                    label: item.name
                  });
                });
              }
            });
          }
        })
        .catch(() => {
          this.$message.error("获取教师信息失败!请重试");
        })
        .finally(() => {
          this.teacherLoading = false;
        });
    },
    selectTeacher() {
      // console.log(11)
      if (!this.teacherNo) {
        this.$message.error("请先选择导师!");
        return;
      }
      this.$confirm("确定你的选择", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          selectTeacherByNo({ tNo: this.teacherNo }).then(res => {
            // console.log(res)
            if (res.data.status == 1) {
              this.$message.success("提交成功!");
              this.getInfo();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getInfo();
    selectTeacher().then(res => {
      // console.log(res);
    });
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
  padding: 18px 0;
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
.item-content {
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
.profile-main > .el-row {
  display: flex;
  justify-content: center;
}
</style>
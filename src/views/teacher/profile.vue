<template>
  <div class="profile">
    <el-container>
      <el-main class="main">
        <el-card>
          <div>
            <div class="card">
              <span class="card-title">个人信息</span>
               <el-button size="medium" @click="changeInfo">修改信息</el-button>
            </div>
            <div class="text item">
              <span class="item-title">姓名</span>
              <span class="item-content">{{
                teacherInfo ? teacherInfo.name : "无"
              }}</span>
            </div>

            <div class="text item">
              <span class="item-title">工号</span>
              <span class="item-content">{{ teacherInfo.teachno }}</span>
            </div>
            <div class="text item">
              <span class="item-title">性别</span>
              <span class="item-content">{{ teacherInfo.sex }}</span>
            </div>
            <div class="text item">
              <span class="item-title">年龄</span>
              <span class="item-content">{{ teacherInfo.age }}</span>
            </div>
            <div class="text item">
              <span class="item-title">学院</span>
              <span class="item-content">{{ teacherInfo.college }}</span>
            </div>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { getTeacher } from "../../network/index";
export default {
  name: "Profile",
  comments: {},
  data() {
    return {
      teacherInfo: {}
    };
  },
  created() {
    getTeacher().then(res => {
      this.teacherInfo = res.data.data;
    });
  },
  methods: {
    changeInfo(){
      this.$router.push('modify-profile')
    }
  },
};
</script>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.card {
  padding: 10px 0;
  border-bottom: 1px solid #dddddd;
  display: flex;
  justify-content: space-between;
}
.card-title {
  font-weight: bold;
  color: #333;
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
</style>

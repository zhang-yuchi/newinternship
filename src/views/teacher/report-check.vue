<template>
  <div>
    <!-- 一阶段 -->
    <div class="report-check" v-if="isReport1Open">
      <el-card class="box-card" :class="state == 0 ? 'big-report' : ''">
        <div slot="header">
          <span style="color:rgb(64,158,255);" class="clearfix"
            >{{ res.name }}的报告册</span
          >
        </div>
        <div class="text item twoItem">
          <span class="header-title">学院</span>
          <span class="header-content">{{ res.college }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">专业</span>
          <span class="header-content">{{ res.major }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">学号</span>
          <span class="header-content">{{ res.stuNo }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">学院指导教师工号</span>
          <span class="header-content">{{ res.teacherNo }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">实习单位</span>
          <span class="header-content">{{ res.corpName }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">实习岗位</span>
          <span class="header-content">{{ res.corpPosition }}</span>
        </div>
        <div class="text item">
          <span class="header-title">实习日期</span>
          <span class="header-content"
            >{{ res.gemStart }} {{ res.gmtEnd }}</span
          >
        </div>

        <div class="state-title">第一阶段</div>
        <form-item
          title="第一阶段实习总结"
          :content="res.stage1Summary"
        ></form-item>
        <form-item
          title="第一阶段实习指导方式"
          :content="res.stage1GuideWay"
          time="暂无"
        ></form-item>
        <el-form
          :model="res"
          status-icon
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
          label-position="top"
        >
          <el-form-item label="教师评语" prop="res">
            <el-input
              type="textarea"
              :rows="5"
              v-model="res.stage1Comment"
            ></el-input>
            <limit :maxLength="500" :testString="res.stage1Comment"></limit>
          </el-form-item>
          <div class="block">
            <el-date-picker v-model="date1" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="item-title">成绩评定</div>
          <el-select v-model="res.stage1Grade" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form>
        <!-- 二阶段 -->
        <div class="state-title">第二阶段</div>
        <form-item
          title="第二阶段实习总结"
          :content="res.stage1Summary"
        ></form-item>
        <form-item
          title="第二阶段实习指导方式"
          :content="res.stage1GuideWay"
          time="暂无"
        ></form-item>
        <el-form
          :model="res"
          status-icon
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
          label-position="top"
        >
          <el-form-item label="教师评语" prop="res">
            <el-input
              type="textarea"
              :rows="5"
              v-model="res.stage1Comment"
            ></el-input>
            <limit :maxLength="500" :testString="res.stage2Comment"></limit>
          </el-form-item>
          <div class="block">
            <el-date-picker v-model="date1" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
          <el-form-item label="成绩评定" prop="res">
            <el-input
              type="textarea"
              :rows="5"
              v-model="res.stage2Grade"
            ></el-input>
          </el-form-item>
          <div class="block">
            <el-date-picker v-model="date1" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form>

        <div class="state-title">总评</div>
        <el-form
          :model="res"
          status-icon
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
          label-position="top"
        >
          <el-form-item label="评语" prop="res">
            <el-input
              type="textarea"
              :rows="5"
              v-model="res.totalComment"
            ></el-input>
          </el-form-item>
        
          <div class="item-title">成绩</div>
          <el-form-item>
            <el-select v-model="res.totalGrade" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          </el-form-item>
          
          
          <el-form-item>
            <el-button type="primary" @click="submitReport">提交</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import formItem from "../../components/content/form-block";
import limit from "../../components/content/limit-number";
import { Obj2html } from "../../command/utils";
export default {
  components: {
    formItem,
    limit
  },
  data() {
    return {
      state: "",
      isReport1Open: true,
      isReport2Open: true,
      res: {
        name: "王二",
        college: "加载中",
        major: "加载中",
        stuNo: "加载中",
        teacherNo: "加载中",
        corpName: "加载中",
        corpPosition: "加载中",
        gmtStart: "加载中",
        gmtEnd: "加载中",
        stage1Summary: "加载中",
        stage1GuideWay: "加载中",
        stage1Comment: "厉害厉害好好好",
        stage1Grade: "",
        stage2Summary: "加载中",
        stage2GuideWay: "加载中",
        stage2Comment: "不错不错",
        stage2Grade: "",
        totalGrade: "",
        totalComment: ""
      },
      rules: {},
      date1: new Date(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      options: [
        {
          value: "优秀",
          label: "优秀"
        },
        {
          value: "良好",
          label: "良好"
        },
        {
          value: "中等",
          label: "中等"
        },
        {
          value: "及格",
          label: "及格"
        },
        {
          value: "不及格",
          label: "不及格"
        }
      ]
    };
  },
  methods:{
    submitReport(){
      
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.twoItem {
  width: 50%;
  float: left;
}
.box-card {
  /* width: 480px; */
  width: 80%;
  transition: none;
}
.header-title,
.header-content {
  display: inline-block;
}
.header-title {
  color: #378f8c;
  margin-right: 8px;
}
.header-content {
  width: 350px;
}
.report-check {
  display: flex;
  justify-content: center;
}
/* .big-report {
  width: 80%; */
/* transition: none; */
/* } */
/* .box-card{
  width: 80%;
} */
.summary {
  margin-left: 20px;
  width: 456px;
}
.Divider {
  padding: 10px 0;
  color: rgb(64, 158, 255);
  /* border-bottom: 1px solid #ddd; */
}
.state-title {
  padding: 20px 0;
  font-weight: 700;
  font-size: 20px;
}
.item-title {
  line-height: 40px;
}
</style>

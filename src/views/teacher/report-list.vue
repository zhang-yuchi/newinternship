<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="stuNo"
      label="学号"
      width="200"
      fixed>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="200"
      fixed>
    </el-table-column>
    <el-table-column
      prop="gender"
      label="性别"
      width="200">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      width="200">
    </el-table-column>
    <el-table-column
      prop="college"
      label="学院"
      width="200">
    </el-table-column>
    <el-table-column
      prop="major"
      label="专业"
      width="200">
    </el-table-column>
    <el-table-column
      prop="corp"
      label="实习企业"
      width="200">
    </el-table-column>
    <el-table-column
      prop="corpPosition"
      label="实习岗位"
      width="200">
    </el-table-column>
    <el-table-column
      prop="corpTeaNo"
      label="校外指导老师工号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="联系电话"
      width="200">
    </el-table-column>
    <el-table-column
      prop="qq"
      label="联系QQ"
      width="200">
    </el-table-column>
    <el-table-column
      prop="wx"
      label="联系微信"
      width="200">
    </el-table-column>
    <el-table-column
      prop='stuWrite'
      fixed="right"
      label="学生填写"
      width="100">
    </el-table-column>
    <el-table-column
      prop="teaWrite"
      fixed="right"
      label="教师填写"
      width="100">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="报告册"
      width="100">
      <template slot-scope="scope">
        <el-button @click="reportCheck(scope.row)" type="text" size="small">评价</el-button>
        <!-- <el-button type="text" size="small">编辑</el-button> -->
      </template>
    </el-table-column>

  </el-table>
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
  export default {
    methods: {
      reportCheck(item){
        this.$router.push('/teacher/report-check')
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    },
    data() {
      return {
        tableData: [{
          stuNo: '20160502',
          name: '王大',
          gender:'男',
          age:'23',
          college:'大华科技学院',
          major:"唱歌",
          corp:"WhyStudio76号",
          corpPosition:'java全栈',
          corpTeaNo:"888",
          wx:'ruankun521',
          qq:'1234567890',
          phone:'18783551223',
          stuWrite:'未填写',
          teaWrite:'未评价'
        },{
          stuNo: '20160502',
          name: '王大',
          gender:'男',
          age:'23',
          college:'大华科技学院',
          major:"唱歌",
          corp:"WhyStudio76号",
          corpPosition:'java全栈',
          corpTeaNo:"888",
          wx:'ruankun521',
          qq:'1234567890',
          phone:'18783551223',
          stuWrite:'已填写',
          teaWrite:'未评价'
        },{
          stuNo: '20160502',
          name: '王大',
          gender:'男',
          age:'23',
          college:'大华科技学院',
          major:"唱歌",
          corp:"WhyStudio76号",
          corpPosition:'java全栈',
          corpTeaNo:"888",
          wx:'ruankun521',
          qq:'1234567890',
          phone:'18783551223',
          stuWrite:'未填写',
          teaWrite:'未评价'
        },{
          stuNo: '20160502',
          name: '王大',
          gender:'男',
          age:'23',
          college:'大华科技学院',
          major:"唱歌",
          corp:"WhyStudio76号",
          corpPosition:'java全栈',
          corpTeaNo:"888",
          wx:'ruankun521',
          qq:'1234567890',
          phone:'18783551223',
          stuWrite:'已填写',
          teaWrite:'已评价'
        },{
          stuNo: '20160502',
          name: '王大',
          gender:'男',
          age:'23',
          college:'大华科技学院',
          major:"唱歌",
          corp:"WhyStudio76号",
          corpPosition:'java全栈',
          corpTeaNo:"888",
          wx:'ruankun521',
          qq:'1234567890',
          phone:'18783551223',
          stuWrite:'未填写',
          teaWrite:'未评价'
        },{
          stuNo: '20160502',
          name: '王大',
          gender:'男',
          age:'23',
          college:'大华科技学院',
          major:"唱歌",
          corp:"WhyStudio76号",
          corpPosition:'java全栈',
          corpTeaNo:"888",
          wx:'ruankun521',
          qq:'1234567890',
          phone:'18783551223',
          stuWrite:'未填写',
          teaWrite:'未评价'
        },{
          stuNo: '20160502',
          name: '王大',
          gender:'男',
          age:'23',
          college:'大华科技学院',
          major:"唱歌",
          corp:"WhyStudio76号",
          corpPosition:'java全栈',
          corpTeaNo:"888",
          wx:'ruankun521',
          qq:'1234567890',
          phone:'18783551223',
          stuWrite:'未填写',
          teaWrite:'未评价'
        },{
          stuNo: '20160502',
          name: '王大',
          gender:'男',
          age:'23',
          college:'大华科技学院',
          major:"唱歌",
          corp:"WhyStudio76号",
          corpPosition:'java全栈',
          corpTeaNo:"888",
          wx:'ruankun521',
          qq:'1234567890',
          phone:'18783551223',
          stuWrite:'未填写',
          teaWrite:'未评价'
        },{
          stuNo: '20160502',
          name: '王大',
          gender:'男',
          age:'23',
          college:'大华科技学院',
          major:"唱歌",
          corp:"WhyStudio76号",
          corpPosition:'java全栈',
          corpTeaNo:"888",
          wx:'ruankun521',
          qq:'1234567890',
          phone:'18783551223',
          stuWrite:'未填写',
          teaWrite:'未评价'
        },{
          stuNo: '20160502',
          name: '王大',
          gender:'男',
          age:'23',
          college:'大华科技学院',
          major:"唱歌",
          corp:"WhyStudio76号",
          corpPosition:'java全栈',
          corpTeaNo:"888",
          wx:'ruankun521',
          qq:'1234567890',
          phone:'18783551223',
          stuWrite:'未填写',
          teaWrite:'未评价'
        },{
          stuNo: '20160502',
          name: '王大',
          gender:'男',
          age:'23',
          college:'大华科技学院',
          major:"唱歌",
          corp:"WhyStudio76号",
          corpPosition:'java全栈',
          corpTeaNo:"888",
          wx:'ruankun521',
          qq:'1234567890',
          phone:'18783551223',
          stuWrite:'未填写',
          teaWrite:'未评价'
        },{
          stuNo: '20160502',
          name: '王大',
          gender:'男',
          age:'23',
          college:'大华科技学院',
          major:"唱歌",
          corp:"WhyStudio76号",
          corpPosition:'java全栈',
          corpTeaNo:"888",
          wx:'ruankun521',
          qq:'1234567890',
          phone:'18783551223',
          stuWrite:'未填写',
          teaWrite:'未评价'
        },{
          stuNo: '20160502',
          name: '王大',
          gender:'男',
          age:'23',
          college:'大华科技学院',
          major:"唱歌",
          corp:"WhyStudio76号",
          corpPosition:'java全栈',
          corpTeaNo:"888",
          wx:'ruankun521',
          qq:'1234567890',
          phone:'18783551223',
          stuWrite:'未填写',
          teaWrite:'未评价'
        },{
          stuNo: '20160502',
          name: '王大',
          gender:'男',
          age:'23',
          college:'大华科技学院',
          major:"唱歌",
          corp:"WhyStudio76号",
          corpPosition:'java全栈',
          corpTeaNo:"888",
          wx:'ruankun521',
          qq:'1234567890',
          phone:'18783551223',
          stuWrite:'未填写',
          teaWrite:'未评价'
        },]
      }
    }
  }
</script>
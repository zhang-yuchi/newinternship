<template>
  <div>
    <el-radio-group v-model="radio" id="fillFilter" @change="change">
      <el-radio :label="3">全部</el-radio>
      <el-radio :label="2">已填完</el-radio>
      <el-radio :label="1">未填完</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 3
    };
  },
  methods: {
    change(e) {
      // console.log(e);
      this.$emit('filter-click',e)
    }
  }
};
</script>

<style scoped>
#fillFilter {
  position: absolute;
  right: 18px;
  top: -20px;
  cursor: pointer;
}
</style>

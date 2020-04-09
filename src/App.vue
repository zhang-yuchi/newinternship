<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  @import './assets/css/normalize.css';
  body,html{
    /* height: 100%; */
    overflow: auto !important;
  }
  #app{
    height: 100%;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
</style>

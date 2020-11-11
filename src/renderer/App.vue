<template>
  <div id="app">
<!--    <el-button>测试</el-button>-->
    <router-view></router-view>
  </div>
</template>

<script type="module">
  export default {
      name: 'MyProject',
  };
</script>

<style>
  /* CSS */
body{margin: 0}
.m-header-title{
    color: #fff;
    display: inline;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
}
    ul{
        padding: 0;
        margin: 0;
    }
</style>

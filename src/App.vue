<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
  #app {
    width: 100vw;
    height: 100vh;
    background-color: #292a2d;
    // background-image: url('/src/assets/images/homePicture.png');
    // background-size:100% 100%;
    // background-repeat: no-repeat
  }
</style>

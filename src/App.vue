<template>
  <div id="app">
    <router-view/>
   <main-tab-bar></main-tab-bar>
  </div>
</template>
<script>
// 底部导航栏
import MainTabBar from './components/content/mainTabbar/MainTabBar';

export default {
  name: "app",
  components: {
    MainTabBar
  }
}
</script>

<style lang="less">

</style>

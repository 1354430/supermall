<template>
   <div class="tab-bar-item" @click="itemClick">
       <div v-if="!isActive"><slot name="item-icon"></slot></div>
       <div v-else><slot name="item-icon-active"></slot></div>
       <div :style="activeStyle"><slot name="item-text"></slot></div>
   </div>
</template>

<script>
export default {
  name: "TabBarItem",
  // 由用户点击对应的tabBarItem组件页面,动态传递参数
  props:{
    path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
  },
  data() {
    return {}
  },
  computed:{
    isActive(){
      // 检查路由是否处于活跃状态
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      // 处于活跃的路由对其进行样式添加
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      // 不向用户进行返回操作使用 replace .想用户进行返回操作使用 push
      this.$router.replace(this.path)
    }
  }
}
</script>

<style lang="less">
.tab-bar-item {
  background-color: #f6f6f6;
  text-align: center;
  // line-height: 49px;
  height: 49px;
  flex: 1;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 2px;
}
</style>


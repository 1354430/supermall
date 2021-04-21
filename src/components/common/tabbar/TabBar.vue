<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style lang="less">
#tab-bar {
    position: absolute;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -2px 0 rgba(110, 110, 110, .1);
} 
</style>
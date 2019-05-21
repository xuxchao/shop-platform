<template>
  <el-container>
    <left-nav></left-nav>
    <el-container class="is-vertical">
      <v-head></v-head>
      <router-view style="padding: 20px;" />
    </el-container>
  </el-container>
</template>

<script>
import leftNav from '@/components/Left'
import vHead from '@/components/Head'
export default {
  name: 'backPage',
  components: { vHead, leftNav }
}
</script>
<style lang="stylus" scope>
  .el-header {
    padding: 0;
    height: auto;
  }
</style>

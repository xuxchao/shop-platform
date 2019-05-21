<template>
  <el-aside width="auto">
    <h3 class="title">{{isCollapse ? '数据大屏后台管理' : '后台'}}</h3>
    <el-menu :default-active="active" class="el-menu-vertical-demo" :collapse="!isCollapse" text-color="#fff" background-color="#2d3a4b" router>
      <template v-for="(item, index) in menu">
        <el-menu-item :index="item.path" :key="index" v-if="!item.children">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.name}}</span>
        </el-menu-item>
         <el-submenu :index="item.path" :key="index" v-else>
           <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.meta.name}}</span>
            </template>
           <el-menu-item-group>
             <template v-for="(it, i) in item.children">
              <el-menu-item :index="it.path" :key="i">
                <i :class="it.meta.icon"></i>
                <span slot="title">{{it.meta.name}}</span>
              </el-menu-item>
             </template>
            </el-menu-item-group>
         </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import router from '@/plugins/router'
export default {
  data () {
    return {
      isCollapse: true,
      menu: router.options.routes[0].children || [],
      active: ''
    }
  },
  methods: {
    init () {
      this.isCollapse = this.$store.state.isCollapse
    }
  },
  created () {
    this.active = JSON.parse(this.$store.state.getPath).path
  },
  watch: {
    '$store.state.isCollapse' () {
      this.init()
    },
    '$store.state.getPath' () {
      this.active = JSON.parse(this.$store.state.getPath).path
    }
  }
}
</script>

<style lang="stylus" scoped>
  h3 {
    text-align: center;
    color: white;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .el-menu {
    border-right: none;
  }
  .el-aside {
    min-height: 100vh;
    background: #2d3a4b;
    padding-top: 20px;
  }
</style>

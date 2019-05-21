<template>
  <div class="head">
    <div class="card_box el-card is-always-shadow">
      <div class="head_left">
        <i class="el-icon-s-operation" @click="tab"></i>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>{{activeObj.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="head_right">
        <div style="cursor: pointer;">
          <i class="icon_full" @click="handleFullScreen" :style="bigOrsmall"></i>
          <el-dropdown>
            <span class="el-dropdown-link"><i class="icon_user"></i>
              {{userInfo.UserName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="goOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- head navs -->
      <el-tabs v-model="activeObj.path" type="card" closable @tab-remove="removeTab" @tab-click="goTab" class="sasas" @contextmenu.native="handleContextmenu">
        <el-tab-pane v-for="item in editableTabs" :key="item.path" :label="item.name" :name="item.path">
        </el-tab-pane>
      </el-tabs>
      <div class="contextmenu" v-if="$store.state.rightMenuState" :style="{left: contentmenuX, top: contentmenuY}">
        <div class="contextmenu_item" v-for="item in menuList" :key="item.value" @click="menuItemClick(item.value)">
          <i :class="item.icon"></i>
          <span style="margin-left: 10px">{{item.title}}</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editableTabs: [],
      activeObj: {},
      fullscreen: false,
      userInfo: {},
      menuList: [{
        title: '关闭左侧',
        value: 'left',
        icon: 'el-icon-back'
      }, {
        title: '关闭右侧',
        value: 'right',
        icon: 'el-icon-right'
      }, {
        title: '关闭其他',
        value: 'other',
        icon: 'el-icon-close'
      }]
    }
  },
  computed: {
    bigOrsmall () {
      return this.fullscreen ? `background-image: url(${require('../assets/img/small.png')})` : `background-image: url(${require('../assets/img/big.png')})`
    }
  },
  methods: {
    menuItemClick (val) {
      for (var i = 0, index, arr = [...this.editableTabs], obj; i < arr.length; i++) {
        if (arr[i].path === this.menuCloseActive) {
          index = i
          obj = arr[i]
          break
        }
      }
      if (val === 'left') {
        arr.splice(0, index)
      } else if (val === 'right') {
        arr.splice(index + 1, arr.length - 1)
      } else if (val === 'other') {
        arr = []
        arr.push(obj)
      }
      arr.map(item => {
        if (item.path === this.activeObj.path) {
          obj = this.activeObj
        }
      })
      setTimeout(() => {
        this.goTab()
      }, 200)
      this.$store.commit('setHistoryPath', JSON.stringify(arr))
      this.$store.commit('setPath', JSON.stringify(obj))
    },
    handleContextmenu (event) {
      let target = event.target
      let flag = false
      if (target.className.indexOf('el-tabs__item') > -1) flag = true
      else if (target.parentNode.className.indexOf('el-tabs__item') > -1) {
        target = target.parentNode
        flag = true
      }
      if (flag) {
        event.preventDefault()
        event.stopPropagation()
        this.contentmenuX = event.clientX + 'px'
        this.contentmenuY = event.clientY + 'px'
        this.menuCloseActive = target.id.slice(4)
        this.$store.commit('setRightMenuState', true)
      }
    },
    handleFullScreen () {
      let element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    },
    goOut () {
      this.$confirm('您确定退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.replace('/')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    tab () {
      this.$store.commit('setIsCollapse', !this.$store.state.isCollapse)
    },
    goTab () {
      this.$router.push(this.activeObj.path)
    },
    removeTab (targetName) {
      if (this.editableTabs.length <= 1 || targetName === '/user') return false
      let tabs = this.editableTabs
      let activeName = this.activeObj
      if (activeName.path === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.path === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab
            }
          }
        })
      }
      let editableTabs = tabs.filter(tab => tab.path !== targetName)
      setTimeout(() => {
        this.goTab()
      }, 200)
      this.$store.commit('setHistoryPath', JSON.stringify(editableTabs))
      this.$store.commit('setPath', JSON.stringify(activeName))
    }
  },
  created () {
    this.activeObj = JSON.parse(this.$store.state.getPath)
    this.editableTabs = JSON.parse(this.$store.state.historyPath)
    this.userInfo = this.$store.state.userInfo
  },
  watch: {
    '$store.state.getPath' () {
      this.activeObj = JSON.parse(this.$store.state.getPath)
    },
    '$store.state.historyPath' () {
      this.editableTabs = JSON.parse(this.$store.state.historyPath)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .icon {
    width: 16px;
    height: 16px;
    background-size: cover;
    display: inline-block;
    background-repeat: no-repeat;
  }
  .head {
    .card_box {
      height: 60px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .head_left {
        display: flex;
        align-items: center;
        .el-icon-s-operation {
          font-size: 24px;
          cursor: pointer;
          margin-right: 10px;
        }
      }
      .head_right{
        .icon_full {
          margin-right: 30px;
          @extend .icon
        }
        .icon_user {
          background: url(../assets/img/user.png) no-repeat;
          @extend .icon
        }
      }
    }
    .contextmenu {
      position: absolute;
      padding: 5px 0;
      z-index: 2018;
      background: #FFF;
      border: 1px solid #cfd7e5;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      .contextmenu_item {
        padding: 8px 20px 8px 15px;
        font-size: 14px;
        color: #606266;
        cursor: pointer;
        &:hover{
          background: #ecf5ff;
          color: #66b1ff;
        }
      }
    }
  }
</style>

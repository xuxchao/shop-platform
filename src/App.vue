<template>
  <div id="app" @click="hideRightMenu">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    // 保证单击任意位置都能隐藏右键菜单
    hideRightMenu () {
      if (!this.$store.state.rightMenuState) return false
      this.$store.commit('setRightMenuState', false)
    }
  }
}
</script>

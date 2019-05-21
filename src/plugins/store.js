import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  token: sessionStorage.getItem('token'),
  isCollapse: false || sessionStorage.getItem('isCollapse'),
  getPath: sessionStorage.getItem('getPath') || '{"name":"用户管理","path":"/user"}',
  historyPath: sessionStorage.getItem('historyPath') || '[{"name":"用户管理","path":"/user"}]',
  userInfo: sessionStorage.getItem('userInfo') || {},
  rightMenuState: false
}

const mutations = {
  setToken (state, opt) {
    state.token = opt
    sessionStorage.setItem('token', opt)
  },
  // 设置左侧菜单是否开启
  setIsCollapse (state, opt) {
    state.isCollapse = opt
    sessionStorage.setItem('isCollapse', opt)
  },
  setPath (state, opt) {
    state.getPath = opt
    sessionStorage.setItem('getPath', opt)
  },
  setHistoryPath (state, opt) {
    state.historyPath = opt
    sessionStorage.setItem('historyPath', opt)
  },
  setUserInfo (state, opt) {
    state.userInfo = opt
    sessionStorage.setItem('userInfo', opt)
  },
  setRightMenuState (state, opt) {
    state.rightMenuState = opt
  }
}

export default new Vuex.Store({
  state, mutations
})

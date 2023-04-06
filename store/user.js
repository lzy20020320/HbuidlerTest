export default {
  namespaced: true,

  state: () => ({
    //记录用户是否登录
    denglu: [],
    token: uni.getStorageSync('token') || '',
    //用户的信息对象
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
  }),

  mutations: {
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    updateToken(state, token) {
      state.token = token
      this.commit('m_user/saveTokenToStorage')
    },
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },

  },

  getters: {},
}

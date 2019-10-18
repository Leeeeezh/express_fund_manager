import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  dialogVisible: false,
  dialogFormVisible: false,
  dialogDeleteVisible: false,
  dialogEditVisible: false,
  isAuthenticated: false,
  activeIndex: '1',
  user: {

  }
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user,
  activeIndex: state => state.activeIndex,
  dialogVisible: state => state.dialogVisible,
  dialogFormVisible: state => state.dialogFormVisible,
  dialogDeleteVisible: state => state.dialogDeleteVisible,
  dialogEditVisible: state => state.dialogEditVisible,
}

const mutations = {
  'SET_AUTHENTICATED'(state, isAuthenticated) {
    if (isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    } else {
      state.isAuthenticated = false
    }
  },
  'SET_USER'(state, user) {
    if (user) {
      state.user = user
    } else {
      state.user = {}
    }
  },
  'SET_DIALOG_VISIBLE'(state, dialogVisible) {
    state.dialogVisible = dialogVisible
  },
  'SET_DIALOG_FORM_VISIBLE'(state, dialogFormVisible) {
    state.dialogFormVisible = dialogFormVisible
  },
  'SET_DIALOG_DELETE_VISIBLE'(state, dialogDeleteVisible) {
    state.dialogDeleteVisible = dialogDeleteVisible
  },
  'SET_DIALOG_EDIT_VISIBLE'(state, dialogEditVisible) {
    state.dialogEditVisible = dialogEditVisible
  },
  'SET_ACTIVE_INDEX'(state, activeIndex) {
    state.activeIndex = activeIndex
  }
}

const actions = {
  setAuthenticated: ({
    commit
  }, isAuthenticated) => {
    commit('SET_AUTHENTICATED', isAuthenticated)
  },
  setUser: ({
    commit
  }, user) => {
    commit('SET_USER', user)
  },
  setDialogVisible: ({
    commit
  }, dialogVisible) => {
    commit('SET_DIALOG_VISIBLE', dialogVisible)
  },
  setDialogFormVisible: ({
    commit
  }, dialogFormVisible) => {
    commit('SET_DIALOG_FORM_VISIBLE', dialogFormVisible)
  },
  setDialogDeleteVisible: ({
    commit
  }, dialogDeleteVisible) => {
    commit('SET_DIALOG_DELETE_VISIBLE', dialogDeleteVisible)
  },
  setDialogEditVisible: ({
    commit
  }, dialogEditVisible) => {
    commit('SET_DIALOG_EDIT_VISIBLE', dialogEditVisible)
  },
  setActiveIndex: ({
    commit
  }, activeIndex) => {
    commit('SET_ACTIVE_INDEX', activeIndex)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
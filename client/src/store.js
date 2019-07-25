import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import AuthService from './AuthService'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {},
    comments: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, board){
      state.activeBoard = board
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setTasks(state, taskData) {
      Vue.set(state.tasks, taskData.listId, taskData.tasks)
    },
    setComments(state, commentData) {
      Vue.set(state.comments, commentData.taskId, commentData.comments)
    },
    resetState(state, user) {
      state.user = {}
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout()
        if (!success) { }
        commit('resetState')
        router.push({ name: "login" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    getActiveBoard({commit,dispatch}, payload){
      api.get('boards/' + payload)
        .then(res =>{
          commit("setActiveBoard", res.data)
      })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, delId) {
      api.delete('boards/' + delId)
        .then(res => {
          dispatch('getBoards')
        })
    },
    getLists({ commit, dispatch }, payload) {
      api.get('boards/' + payload + '/lists')
      .then(res => {
        console.log(res.data)
        commit('setLists', res.data)
      })
    },
    addList({ commit, dispatch }, listData) {
      api.post('lists', listData)
        .then(serverList => {
          dispatch('getLists', listData.boardId)
        })
    },
    deleteList({ commit, dispatch }, payload) {
      api.delete('lists/' + payload._id)
        .then(res => {
          dispatch('getLists', payload.boardId)
        })
    },
    getTasks({ commit, dispatch }, payload) {
      api.get('lists/' + payload + '/tasks')
      .then(res => {
        commit('setTasks', {tasks: res.data, listId: payload})
      })
    },
    addTask({ commit, dispatch }, taskData) {
      api.post('tasks', taskData)
        .then(serverList => {
          dispatch('getTasks', taskData.listId)
        })
    },
    deleteTask({ commit, dispatch }, payload) {
      api.delete('tasks/' + payload._id)
        .then(res => {
          dispatch('getTasks', payload.listId)
        })
    },
    getComments({ commit, dispatch }, payload) {
      api.get('tasks/' + payload + '/comments')
      .then(res => {
        commit('setComments', {comments: res.data, taskId: payload})
      })
    },
    addComment({ commit, dispatch }, commentData) {
      api.post('comments', commentData)
        .then(serverList => {
          dispatch('getComments', commentData.taskId)
        })
    },
    deleteComment({ commit, dispatch }, payload) {
      api.delete('comments/' + payload._id)
        .then(res => {
          dispatch('getComments', payload.taskId)
        })
    },
    moveTask({ commit, dispatch }, payload) {
      api.put('tasks/' + payload.task._id, {listId: payload.listId})
        .then(res => {
          dispatch('getTasks', payload.listId)
          dispatch('getTasks', payload.task.listId)
        })
    }
    //#endregion


    //#region -- LISTS --



    //#endregion
  }
})

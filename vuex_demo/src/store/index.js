import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'// 异步获取list.json文件内容

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    // 所有任务列表
    list: [],
    //  输入框字符串
    inputValue: '',
    // 下一个id
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    add (state) {
      state.count++
    },
    addN (state, step) {
      state.count += step
    },
    sub (state) {
      state.count--
    },
    subN (state, step) {
      state.count -= step
    },
    // 初始化list列表
    initList (state, list) {
      state.list = list
    },
    // 动态修改inputValue的值
    setInputValue (state, val) {
      state.inputValue = val
    },
    // 添加列表项
    addItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 删除列表项
    removeItem (state, id) {
      // 根据id查找对应项索引
      const i = state.list.findIndex(x => x.id === id)
      // 根据索引，删除对应的元素
      if (id !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 修改列表项状态
    changeStatus (state, param) {
      const index = state.list.findIndex(x => x.id === param.id)
      if (index !== -1) {
        state.list[index].done = param.status
      }
    },
    // 清除 已完成列表项
    cleanDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 修改视图的关键字
    changeViewKey (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    addAsync (context) {
      setTimeout(() => {
        context.commit('add')
      }, 1000)
    },
    addNAsync (context, step) {
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    },
    subAsync (context) {
      setTimeout(() => {
        context.commit('sub')
      }, 1000)
    },
    subNAsync (context, step) {
      setTimeout(() => {
        context.commit('subN', step)
      }, 1000)
    },
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  getters: {
    showNum (state) {
      return '当前最新的数量是【' + state.count + '】'
    },
    // 统计未完成任务条数
    unDoneLength (state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList (state) {
      if (state.viewKey === 'all') {
        return state.list
      } else if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      } else if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      } else {
        return state.list
      }
    }
  }
})

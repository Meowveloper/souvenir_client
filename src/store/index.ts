import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {}, 
    token: '', 
    headerHeight: 0,

  },
  getters: {
    storage_user: (state) => state.user, 
    storage_token: (state) => state.token, 
    checkLoginFromStorage: (state) => (state.token === '' || state.token === null) ? false : true, 

    headerHeight: (state) => state.headerHeight
  
  },
  mutations: {
  },
  actions: {
    setStorageUser : ({ state }, userData) => {
      state.user = userData;
    }, 

    setStorageToken: ({ state }, tokenData) => {
      state.token = tokenData;
    }, 

    setHeaderHeight: ({state}, value) => {
      state.headerHeight = value;
    }


  },
  modules: {
  }
})

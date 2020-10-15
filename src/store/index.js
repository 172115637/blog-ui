import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selectTag: null,
        isAdmin: false
    },
    mutations: {
        setSelectTag(state, val) {
            state.selectTag = val;
        },
        setIsAdmin(state, val) {
            state.isAdmin = val;
        }
    },
    actions: {},
    modules: {}
})

import * as types from '../mutation-types'

// initial state
const state = {
    error: false,
    loading: true,
    pages: null
}

// mutations
const mutations = {
    [types.SET_PAGES] (state, pages, error) {
        state.pages = pages
        state.loading = false
    },
    [types.PAGES_ERROR] (state) {
        state.error = true
        state.loading = false
    }
}

export default {
    state,
    mutations
}

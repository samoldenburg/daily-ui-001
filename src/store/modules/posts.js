import * as types from '../mutation-types'

// initial state
const state = {
    error: false,
    loading: true,
    posts: null
}

// mutations
const mutations = {
    [types.SET_POSTS] (state, posts, error) {
        state.posts = posts
        state.loading = false
    },
    [types.POSTS_ERROR] (state) {
        state.error = true
        state.loading = false
    }
}

export default {
    state,
    mutations
}

import * as types from '../mutation-types'

// initial state
const state = {
    bar: {
        displayed: false,
        progress: 0
    },
    spinner: {
        displayed: true
    }
}

// mutations
const mutations = {
    [types.SHOW_SPINNER] (state) {
        state.spinner.displayed = true
    },

    [types.HIDE_SPINNER] (state) {
        state.spinner.displayed = false
    },

    [types.SHOW_LOADER] (state) {
        state.bar.displayed = true
    },

    [types.HIDE_LOADER] (state) {
        state.bar.displayed = false
    },

    [types.LOADER_PROGRESS] (state, progress) {
        state.bar.progress = progress
    }
}

export default {
    state,
    mutations
}

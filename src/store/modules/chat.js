import * as types from '../mutation-types'

// initial state
const state = {
    error: false,
    serverReplying: true,
    messages: []
}

// mutations
const mutations = {
    [types.SEND_CHAT_MESSAGE] (state, payload) {
        state.messages.push({
            message: payload.message,
            time: new Date(),
            user: payload.user
        })
    },

    [types.SERVER_REPLYING] (state) {
        state.serverReplying = true
    },

    [types.SERVER_NOT_REPLYING] (state) {
        state.serverReplying = false
    },
}

export default {
    state,
    mutations
}

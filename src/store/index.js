import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import chat from './modules/chat'
import ChatServer from '../lib/server'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        chat
    },
    strict: debug,
    plugins: debug ? [ChatServer] : [ChatServer]
})

 /**
 * NOTE: This file contains vuex ACTIONS. Actions differ from mutations in that they cannot directly mutate the state,
 * but they can be called from one place, perform async actions, and then commit a mutation to the state from there.
 * Mutations CANNOT be async.
 *
 * Actions should generally only be used for store events that require more complex app manipulations than single state changes.
 *
 * Also look into using `import { MapActions } from 'vuex'` to easily bind events.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import $ from 'jquery'

export const userSendMessage = ({ commit }) => {
    let $ti = $('#text-input');
    let message = $ti.val()
    if (!message.length) {
        return false
    }
    $ti.val('')
    commit(types.SEND_CHAT_MESSAGE, {
        user: 'user',
        message: message
    })

    $('#chat-output').animate({
        scrollTop: $('#chat-output').innerHeight() + 100 + 'px'
    }, 150)
}

export const serverSendMessage = ({ commit }, message) => {
    commit(types.SEND_CHAT_MESSAGE, {
        user: 'server',
        message: message
    })

    $('#chat-output').animate({
        scrollTop: $('#chat-output').innerHeight() + 100 + 'px'
    }, 150)
}

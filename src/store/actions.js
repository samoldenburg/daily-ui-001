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

export const openChat = ({ commit }) => {
    // commit(types.OPEN_MENU)
}

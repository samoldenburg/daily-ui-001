import * as types from '../mutation-types'

// initial state
const state = {
    mobileMenuOpen: true,
    color: 'purple',
    menus: {
        primary: null
    }
}

// mutations
const mutations = {
    [types.OPEN_MENU] (state) {
        state.mobileMenuOpen = true
    },

    [types.CLOSE_MENU] (state) {
        state.mobileMenuOpen = false
    },

    [types.TOGGLE_MENU] (state) {
        state.mobileMenuOpen = !state.mobileMenuOpen
    },

    [types.SET_PRIMARY_MENU] (state, menu) {
        state.menus.primary = menu
    },

    [types.COLOR_MENU_WHITE] (state, menu) {
        state.color = 'white'
    },

    [types.COLOR_MENU_PURPLE] (state, menu) {
        state.color = '#4C12A0'
    }
}

export default {
    state,
    mutations
}

// import cookie from 'cookie'
// import {setAuthToken, resetAuthToken} from '~/utils/auth'

export const state = () => ({
  sidebar: false
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}

export const actions = {
  nuxtServerInit ({ dispatch }) {
    console.log('nuxtServerInit')
    // dispatch('auth/set_token')
  }
}

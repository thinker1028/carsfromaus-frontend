import api from '~/api'
import {setAuthToken, resetAuthToken} from '~/utils/auth'
import cookies from 'js-cookie'

export const state = () => ({
  user: null
})

export const mutations = {
  set_user (store, data) {
    store.user = data
  },
  reset_user (store) {
    store.user = null
  }
}

export const actions = {
  fetch ({commit}) {
    return api.auth.profile({Authorization: 'Bearer ' + cookies.get('x-access-token')})
      .then(response => {
        console.log('fetch', response.data)
        commit('set_user', response.data)
        return response
      })
      .catch(error => {
        commit('reset_user')
        return error
      })
  },
  login ({commit}, data) {
    return api.auth.login(data)
      .then(response => {
        console.log(response.data)
        commit('set_user', response.data)
        setAuthToken(response.data.access_token)
        cookies.set('x-access-token', response.data.access_token, {expires: 7})
        return response
      })
  },
  signup ({commit}, data) {
    return api.auth.signup(data)
      .then(response => {
        commit('set_user', response.data)
        setAuthToken(response.data.access_token)
        cookies.set('x-access-token', response.data.access_token, {expires: 7})
        return response
      })
  },
  // login_google ({commit}, token) {
  //   return api.auth.google({token})
  //     .then(response => {
  //       commit('set_user', response.data.user)
  //       setAuthToken(response.data.token)
  //       cookies.set('x-access-token', response.data.token, {expires: 7})
  //       return response
  //     })
  // },
  reset ({commit}) {
    commit('reset_user')
    resetAuthToken()
    cookies.remove('x-access-token')
    return Promise.resolve()
  }
}

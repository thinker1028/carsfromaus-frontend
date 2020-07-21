import api from '~/api'
import {setAuthToken, resetAuthToken} from '~/utils/auth'
import cookies from 'js-cookie'

const state = () => ({
  user: null,
  token: ''
})

const mutations = {
  set_user (store, data) {
    store.user = data
  },
  reset_user (store) {
    store.user = null
  },
  set_token (store) {
    store.token = cookies.getJSON('x-access-token')
    console.log('store.token', store.token)
  }
}
const getters = {
  get_token (state) {
    console.log('state', state)
    return cookies.getJSON('x-access-token')
  }
}

const actions = {
  signup ({commit}, reqdata) {
    resetAuthToken()
    return api.auth.signup(reqdata)
      .then(response => {
        console.log(response)
        /*
        - Response: `Auth Token`
        - Status Code:
            + Signup success: `201`
            + Bad request: `400`
            + Internal server error: `500`
        Ex.
          status: 201
          data: {
            "access_token": "XXX.XXX.XXX",
            "refresh_token": "XXX.XXX.XXX"
          }
        */
        switch (response.status) {
          case 201:
            /* cookies.set('x-access-token', response.data.access_token, {expires: 7})
            cookies.set('x-refresh-token', response.data.refresh_token, {expires: 7})
            setAuthToken(response.data.access_token) */
            break
          case 400:
            break
          case 500:
            break
        }
        return response
      })
  },
  signin ({commit}, reqdata) {
    return api.auth.signin(reqdata)
      .then(response => {
        /*
        - Response: `Auth Token`
        - Status Code:
            + Signin success: `200`
            + Bad request: `400`
            + Internal server error: `500`
        Ex.
          status: 200
          data: {
            "access_token": "XXX.XXX.XXX",
            "refresh_token": "XXX.XXX.XXX"
          }
        */
        switch (response.status) {
          case 200:
            console.log('signin', response)
            cookies.set('x-access-token', response.data.access_token, {expires: 7})
            cookies.set('x-refresh-token', response.data.refresh_token, {expires: 7})
            setAuthToken(response.data.access_token)
            commit('set_user', reqdata)
            break
          case 400:
            break
          case 500:
            break
        }
        return response
      })
  },
  profile ({commit}) {
    return api.profile.profile({Authorization: 'Bearer ' + cookies.get('x-access-token')})
      .then(response => {
        console.log('profile', response.data)
        commit('set_user', response.data)
        return response
      })
      .catch(error => {
        commit('reset_user')
        return error
      })
  },
  passwordreset ({commit}, reqdata) {
    return api.profile.passwordreset({Authorization: 'Bearer ' + cookies.get('x-access-token')}, reqdata)
      .then(response => {
        console.log('passwordreset', response.data)
        commit('set_user', response.data)
        return response
      })
      .catch(error => {
        commit('reset_user')
        return error
      })
  },
  updateprofile ({commit}, reqdata) {
    console.log('updateprofile', cookies.get('x-access-token'))
    return api.profile.updateprofile({Authorization: 'Bearer ' + cookies.get('x-access-token')}, reqdata)
      .then(response => {
        console.log('updateprofile', response.data)
        commit('set_user', response.data)
        return response
      })
      .catch(error => {
        commit('reset_user')
        return error
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
export default {
  state,
  getters,
  actions,
  mutations
}

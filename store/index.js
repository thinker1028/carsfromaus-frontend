import cookie from 'cookie'
import {setAuthToken, resetAuthToken} from '~/utils/auth'

export const state = () => ({
  sidebar: false
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}

export const actions = {
  nuxtServerInit ({dispatch}, context) {
    console.log('nuxtServerInit', context)
    return new Promise((resolve, reject) => {
      console.log('context.req.headers.cookie', context.req.headers.cookie)
      const cookies = cookie.parse(context.req.headers.cookie || '')
      if (cookies.hasOwnProperty('x-access-token')) {
        setAuthToken(cookies['x-access-token'])
        dispatch('auth/profile')
          .then(result => {
            resolve(true)
          })
          .catch(error => {
            console.log('fetch user error', error)
            resetAuthToken()
            resolve(false)
          })
      } else {
        resetAuthToken()
        resolve(false)
      }
    })
  }
}

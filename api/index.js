import axios from 'axios'

export default {
  auth: {
    signup: (data) => axios.post('auth/sign-up', data),
    signin: (data) => axios.post('auth/sign-in', data)
  },
  profile: {
    profile: (authData) => axios.get('profile', {headers: authData}),
    updateprofile: (authData, data) => axios.put('profile', data, {headers: authData}),
    passwordreset: (authData, data) => axios.put('profile/password-reset', data, {headers: authData})
  }
}

import axios from 'axios'

export default {
  auth: {
    profile: (authData) => axios.get('profile', {headers: authData}),
    signup: (data) => axios.post('auth/sign-up', data),
    signin: (data) => axios.post('auth/sign-in', data)
  }
}

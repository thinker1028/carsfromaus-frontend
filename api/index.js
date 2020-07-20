import axios from 'axios'

export default {
  auth: {
    profile: (authData) => axios.get('profile', {headers: authData}),
    login: (data) => axios.post('auth/sign-in', data),
    signup: (data) => axios.post('auth/sign-up', data)
  }
}

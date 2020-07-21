<template>
  <v-layout justify-center align-center>
    <v-card class="elevation-10 pa-2" style="flex: 0 1 400px">
      <v-card-title class="headline">Log In</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-alert v-if="alert" :type="alert.type" value="true">{{alert.message}}</v-alert>
          <v-text-field label="Email" v-model="email" class="leading-4"></v-text-field>
          <v-text-field label="Password" v-model="password" class="leading-4" type="password"></v-text-field>
          <!-- <a href='/forgotpassword'>Forgot Password?</a> -->
          <v-btn type="submit" :loading="loading" :disabled="loading" class="w-full mb-8" color="error">Log In</v-btn>
        </v-form>
        <div class="justify-center d-flex align-center flex-col">
          <span class='text-gray-700 text-sm'>Don't have an account?</span>
          <a class="mt-1 text-base" href="/signup">Sign up</a>
        </div>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
// import {googleClientId} from '~/config'
import {mapGetters} from 'vuex'
export default {
  layout: 'fullscreen',
  data () {
    return {
      email: '',
      password: '',
      alert: null,
      loading: false
      // ,
      // google_loading: false,
      // google_ready: false
    }
  },
  computed: {
    ...mapGetters('auth', ['get_token'])
  },
  mounted () {
    // window.gapiOnLoadCallback = () => {
    //   window.gapi.load('auth2', () => {
    //     window.google_auth2 = window.gapi.auth2.init({
    //       client_id: googleClientId,
    //       fetch_basic_profile: false,
    //       scope: 'profile email'
    //     })
    //   })
    //   this.google_ready = true
    // }
    // const installGoogleSdkScript = (d, s, id) => {
    //   if (d.getElementById(id)) {
    //     this.google_ready = true
    //     return
    //   }
    //   let fjs = d.getElementsByTagName(s)[0]
    //   let js = d.createElement(s)
    //   js.id = id
    //   js.src = 'https://apis.google.com/js/platform.js?onload=gapiOnLoadCallback'
    //   fjs.parentNode.insertBefore(js, fjs)
    // }
    // installGoogleSdkScript(document, 'script', 'google-jssdk')
  },
  methods: {
    submit () {
      this.alert = null
      this.loading = true
      this.$store.dispatch('auth/signin', {
        email: this.email,
        password: this.password
      }).then(result => {
        this.loading = false
        if (result.status >= 200 && result.status < 300) {
          this.alert = {type: 'success', message: result.data.message ? result.data.message : 'Signin Success'}
          this.$router.push('/admin')
        } else {
          this.alert = {type: 'error', message: result.data.message ? result.data.message : 'Signin Failed'}
        }
      }).catch(error => {
        this.loading = false
        if (error.response && error.response.data) {
          this.alert = {type: 'error', message: error.response.data.message || error.response.status}
        }
      })
    }
    // ,
    // google_submit () {
    //   if (!this.google_ready) return
    //   this.alert = null
    //   this.google_loading = true
    //   window.google_auth2.signIn()
    //     .then(() => this.$store.dispatch('auth/login_google', window.google_auth2.currentUser.get().Zi.access_token))
    //     .then(result => {
    //       this.alert = {type: 'success', message: result.data.message}
    //       this.google_loading = false
    //       this.$router.push('/admin')
    //     })
    //     .catch(error => {
    //       this.google_loading = false
    //       if (error.response && error.response.data) {
    //         this.alert = {type: 'error', message: error.response.data.message || error.response.status}
    //       }
    //     })
    // }
  }
}
</script>

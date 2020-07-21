<template>
  <v-layout justify-center align-center>
    <v-card class="elevation-10" style="flex: 0 1 400px">
      <v-card-title class="headline">Sign Up</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-alert v-if="alert" :type="alert.type">{{alert.message}}</v-alert>
          <v-text-field label="First Name" v-model="first_name"></v-text-field>
          <v-text-field label="Last Name" v-model="last_name"></v-text-field>
          <v-text-field label="Email" v-model="email"></v-text-field>
          <v-text-field label="Password" v-model="password" type="password"></v-text-field>
          <v-btn type="submit" :loading="loading" :disabled="loading">SIGN UP</v-btn>
        </v-form>
      </v-card-text>
      <a href='/signin'>Back to login form</a>
    </v-card>
  </v-layout>
</template>

<script>

export default {
  layout: 'fullscreen',
  data () {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      alert: null,
      loading: false
    }
  },
  mounted () {

  },
  methods: {
    submit () {
      this.alert = null
      this.loading = true
      this.$store.dispatch('auth/signup', {
        email: this.email,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
        role: 'Admin'
      }).then(result => {
        this.loading = false
        if (result.status >= 200 && result.status < 300) {
          this.alert = {type: 'success', message: result.data.message ? result.data.message : 'Signup Success'}
          this.$router.push('/signin')
        } else {
          this.alert = {type: 'error', message: result.data.message ? result.data.message : 'Signup Failed'}
        }
      }).catch(error => {
        this.loading = false
        if (error.response && error.response.data) {
          this.alert = {type: 'error', message: error.response.data.message || error.response.status}
        }
      })
    }
  }
}
</script>

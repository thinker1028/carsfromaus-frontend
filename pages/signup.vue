
  <v-layout justify-center align-center>
    <v-card class="elevation-10 pa-2" style="flex: 0 1 400px">
      <v-card-title class="headline">Log In</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-alert v-if="alert" :type="alert.type" value="true">{{alert.message}}</v-alert>
          <v-text-field label="Email" v-model="email" ></v-text-field>
          <v-text-field label="Password" v-model="password" type="password"></v-text-field>
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
          <v-btn type="submit" :loading="loading" :disabled="loading" class="w-full mb-1" color="error">Sign Up</v-btn>
        </v-form>
      </v-card-text>
      <div class="justify-center d-flex align-center flex-col">
        <a class='mb-4 text-base' href='/signin'>Back to login form</a>
      </div>
      
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

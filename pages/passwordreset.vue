<template>
  <v-layout justify-center align-center>
    <v-card class="elevation-10" style="flex: 0 1 400px">
      <v-card-title class="headline">Reset Password</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-alert v-if="alert" :type="alert.type" value="true">{{alert.message}}</v-alert>
          <v-text-field label="Email" v-model="email"></v-text-field>
          <v-text-field label="Current Password" v-model="current_password" type="password"></v-text-field>
          <v-text-field label="New Password" v-model="new_password" type="password"></v-text-field>
          <v-btn type="submit" :loading="loading" :disabled="loading" class="w-full mb-1" color="error">Update</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  layout: 'fullscreen',
  data () {
    return {
      email: '',
      current_password: '',
      new_password: '',
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
      this.$store.dispatch('auth/passwordreset', {
        email: this.email,
        current_password: this.current_password,
        new_password: this.new_password
      }).then(result => {
        this.loading = false
        if (result.status >= 200 && result.status < 300) {
          this.alert = {type: 'success', message: result.data.message ? result.data.message : 'Password Reset Success'}
          this.$router.push('/admin')
        } else {
          this.alert = {type: 'error', message: result.data.message ? result.data.message : 'Password Reset Failed'}
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

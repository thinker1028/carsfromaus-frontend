<template>
  <v-layout justify-center align-center>
    <v-card class="elevation-10" style="flex: 0 1 400px">
      <v-card-title class="headline">Update Profile</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-alert v-if="alert" :type="alert.type" value="true">{{alert.message}}</v-alert>
          <v-text-field label="Email" v-model="email"></v-text-field>
          <v-text-field label="First Name" v-model="first_name"></v-text-field>
          <v-text-field label="Last Name" v-model="last_name"></v-text-field>
          <v-text-field label="Phone Nubmer" v-model="phone_number"></v-text-field>
          <v-btn type="submit" :loading="loading" :disabled="loading" class="w-full mb-1" color="warning">Update</v-btn>
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
      first_name: '',
      last_name: '',
      phone_number: '',
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
      this.$store.dispatch('auth/updateprofile', {
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        phone_number: this.phone_number,
        role: 'Admin'
      }).then(result => {
        this.loading = false
        if (result.status >= 200 && result.status < 300) {
          this.alert = {type: 'success', message: result.data.message ? result.data.message : 'Update Profile Success'}
          this.$router.push('/admin')
        } else {
          this.alert = {type: 'error', message: result.data.message ? result.data.message : 'Update Profile Failed'}
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


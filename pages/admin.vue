<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">Admin page</v-card-title>
        <v-card-text>
          <p v-if="user">Hello, {{user.email}}</p>
          <p v-else>The user is not authenticated!</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/">Main Page</v-btn>
          <v-btn color="primary" flat @click="checkMe">Check Me</v-btn>
          <v-btn color="primary" flat @click="resetPassword">Reset Password</v-btn>
          <v-btn color="primary" flat @click="logOut">Log Out</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters('auth', ['get_token']),
    user () { return this.get_token ? this.$store.state.auth.user : null }
  },
  methods: {
    checkMe () {
      this.$store.dispatch('auth/profile').then(result => {
        this.$router.push('/profile')
      })
    },
    resetPassword () {
      this.$store.dispatch('auth/passwordreset').then(result => {
        this.$router.push('/passwordreset')
      })
    },
    logOut () {
      this.$store.dispatch('auth/reset').then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

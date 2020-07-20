<template>
  <div class="container">
    <header class="">
      <h3>
        <strong>{{user.email}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{user.id}}
    </p>
    <p>
      <strong>First Name:</strong>
      {{user.first_name}}
    </p>
    <p>
      <strong>Last Name:</strong>
      {{user.last_name}}
    </p>
    <p>
      <strong>Phone Number:</strong>
      {{user.phone_number}}
    </p>
    <p>
      <strong>Authorities:</strong>
      {{user.role}}
    </p>
    <p>
      <strong>Verified:</strong>
      {{user.verified}}
    </p>
    <v-btn color="primary" flat nuxt to="/">Home</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    user () { return this.$store.state.auth ? this.$store.state.auth.user : null }
  },
  mounted () {
    if (!this.user) {
      this.$router.push('/login')
    }
  }
}
</script>
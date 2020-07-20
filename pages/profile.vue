<template>
    <v-container fluid>
        <v-layout column>
            <v-card
              max-width="344"
            >
                <v-card-text>
                    <!-- <v-flex class="mb-4">
                        <v-avatar size="96" class="mr-4">
                            <img :src="'/avatars/avatar_' + (form.avatar.toLowerCase()) + '.png'" alt="Avatar">
                        </v-avatar>
                        <v-btn @click="openAvatarPicker">Change Avatar</v-btn>
                    </v-flex> -->
                    <h3> <v-icon>person</v-icon>{{ user ? user.first_name: '' }} {{ user ? user.last_name : ''}} </h3>
                    <v-text-field
                        v-if="user"
                        v-model="user.email"
                        readonly
                        prepend-icon="email"
                    />
                </v-card-text>
                <!-- <v-card-actions>
                    <v-btn color="primary" :loading="loading" @click.native="update">
                        <v-icon left dark>check</v-icon>
                        Save Changes
                    </v-btn>
                </v-card-actions> -->
            </v-card>
        </v-layout>
        <!-- <avatar-picker
            v-model="showAvatarPicker"
            :current-avatar="form.avatar"
            @selected="selectAvatar"></avatar-picker> -->
    </v-container>

  <!-- <v-layout justify-center align-center>
    <v-card class="elevation-10" style="flex: 0 1 400px">
      <h3>
        <strong>{{user.email}}</strong> Profile
      </h3>
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
    </v-card>
  </v-layout> -->
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
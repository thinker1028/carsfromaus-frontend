import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default (ctx) => {
  const vuetify = new Vuetify({
    theme: {
      dark: false, // From 2.0 You have to select the theme dark or light here
      light: {
        primary: '#ce0d2e',
        secondary: '#323941',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  })
  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}

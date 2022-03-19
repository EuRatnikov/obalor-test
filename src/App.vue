<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://vrachu.ru/static/svg/doctor.d2fc918b.svg"
          transition="scale-transition"
          width="40"
        />

        <span class="mr-2">Врачи.ру</span>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default {
  name: 'App'
};
</script>

<script>
  export default {
    data () {
      return {
        drawer: true,
      }
    },
  }
</script>

<template>
  <v-navigation-drawer v-model="drawer">
    <v-list>
      <v-list-item title="Menú" subtitle="Consultas"></v-list-item>
      <v-divider></v-divider>
      <v-list-item class="mt-7 py-2" link title="Diario y futuros pronósticos"></v-list-item>
      <v-list-item class="py-2" link title="Registro de pronósticos"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar class="text-uppercase" title="Pronósticos">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>
  </v-app-bar>
</template>

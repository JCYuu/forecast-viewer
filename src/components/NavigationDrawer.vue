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
      <v-list-item title="VISOR DE PRONÓSTICOS" subtitle="Consultas"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link title="Report 1"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar class="text-uppercase" title="Pronostico de los proximos dias">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>
  </v-app-bar>
</template>

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
      <v-list-item title="Menú" subtitle="Seleccione una opcion:"></v-list-item>
      <v-divider></v-divider>
      <router-link to="/">
        <v-list-item class="mt-7 py-2 text-white" link title="Pronóstico de hoy"></v-list-item>
      </router-link>
      <router-link to="/tables">
        <v-list-item class="py-2 text-white" link title="Registro de pronósticos"></v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar class="text-uppercase" title="VISOR DE PRONÓSTICOS">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>
  </v-app-bar>
</template>

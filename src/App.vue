<script setup>
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import Forecast from "@/components/Forecast.vue";


</script>

<template>
  <header>

  </header>

  <main>
    <v-layout>
      <NavigationDrawer />
      <v-main class="d-block align-content-center align-center justify-center">
        <v-divider></v-divider>
        <router-view />
      </v-main>
    </v-layout>

  </main>
</template>

<style scoped>

</style>

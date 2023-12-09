<script setup>
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import Count from "@/components/Count.vue";
import Forecast from "@/components/Forecast.vue";


</script>

<template>
  <header>

  </header>

  <main>
    <v-layout>
      <NavigationDrawer />
      <v-main class="d-block align-content-center align-center justify-center">
        <h1>Algo aqui</h1>
        <Count />
        <v-divider></v-divider>
        <Forecast />
      </v-main>
    </v-layout>

  </main>
</template>

<style scoped>

</style>

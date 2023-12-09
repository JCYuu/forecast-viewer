<script>
  import axios from "axios";
  const token = "1|RWGuH9pEsMk2CudoOKiYP3sY7UXFaG6vn6eCwmqm47dc6971"
  const config = {
    headers: { Authorization: `Bearer ${token}`},
  }
  export default {
    data(){
      return {
        todayForecast: null,
        text: "",
        nextForecast: null,
        regions: {0: "Norte",}
      }
    },
    methods: {
      async fetchForecast(){
        try{
          const response = await axios('http://localhost:8000/api/weather', config);
          console.log(response.data);
          this.todayForecast = response.data.today.data;
          console.log('Today:');
          for (const region in this.todayForecast) {
            let regionData = this.todayForecast[region]
            console.log(`${this.todayForecast[region]["region"]}`)
            for (const data in regionData) {
              if(data === 'region') continue;
              console.log(`${data} : ${regionData[data]}`)
            }
          }
          // console.log(`Today: ${JSON.stringify(this.forecast.data)}`);
          /*for (const item in this.forecast) {
            console.log(item)
            this.text.concat(`${item}\n'}`);
          }*/
         /* this.text = JSON.stringify(this.forecast);*/
         /* axios.request({
            headers:{ Authorization: `Bearer ${token}` },
            method: 'GET',
            url: 'http://localhost:8000/api/weather'
          }).then(res => { console.log(res.data) });*/
        } catch(e){
          console.error(e);
        }
      }
    },
    mounted(){
      this.fetchForecast();
    }
  }

</script>

<template>
  <div class="today-forecast v-container">
    <h2>Pronóstico para el día de hoy</h2>
    <div class="forecast-container pa-3 d-flex">
      <v-card class="mx-auto" max-width="540">
        <v-card-item title="Región Norte"></v-card-item>


      </v-card>
      <v-card class="mx-auto" max-width="540">
        <v-card-item title="Región Centro"></v-card-item>
      </v-card>
      <v-card class="mx-auto" max-width="540">
        <v-card-item title="Región Sur"></v-card-item>
      </v-card>
    </div>
  </div>
  <v-card
      class="mx-auto"
      max-width="368"
  >
    <v-card-item title="Florida">
      <template v-slot:subtitle>
        <v-icon
            icon="mdi-alert"
            size="18"
            color="error"
            class="me-1 pb-1"
        ></v-icon>

        Extreme Weather Alert
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col
            class="text-h2"
            cols="6"
        >
          64&deg;F
        </v-col>

        <v-col cols="6" class="text-right">
          <v-icon
              color="error"
              icon="mdi-weather-hurricane"
              size="88"
          ></v-icon>
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item
          density="compact"
          prepend-icon="mdi-weather-windy"
      >
        <v-list-item-subtitle>123 km/h</v-list-item-subtitle>
      </v-list-item>

      <v-list-item
          density="compact"
          prepend-icon="mdi-weather-pouring"
      >
        <v-list-item-subtitle>48%</v-list-item-subtitle>
      </v-list-item>
    </div>
  </v-card>
  <v-card
      class="mx-auto"
      max-width="368"
  >
    <v-card-item title="Florida">
      <template v-slot:subtitle>
        <v-icon
            icon="mdi-alert"
            size="18"
            color="error"
            class="me-1 pb-1"
        ></v-icon>

        Extreme Weather Alert
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col
            class="text-h2"
            cols="6"
        >
          64&deg;F
        </v-col>

        <v-col cols="6" class="text-right">
          <v-icon
              color="error"
              icon="mdi-weather-hurricane"
              size="88"
          ></v-icon>
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item
          density="compact"
          prepend-icon="mdi-weather-windy"
      >
        <v-list-item-subtitle>123 km/h</v-list-item-subtitle>
      </v-list-item>

      <v-list-item
          density="compact"
          prepend-icon="mdi-weather-pouring"
      >
        <v-list-item-subtitle>48%</v-list-item-subtitle>
      </v-list-item>
    </div>
  </v-card>
  <v-card
      class="mx-auto"
      max-width="368"
  >
    <v-card-item title="Florida">
      <template v-slot:subtitle>
        <v-icon
            icon="mdi-alert"
            size="18"
            color="error"
            class="me-1 pb-1"
        ></v-icon>

        Extreme Weather Alert
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col
            class="text-h2"
            cols="6"
        >
          64&deg;F
        </v-col>

        <v-col cols="6" class="text-right">
          <v-icon
              color="error"
              icon="mdi-weather-hurricane"
              size="88"
          ></v-icon>
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item
          density="compact"
          prepend-icon="mdi-weather-windy"
      >
        <v-list-item-subtitle>123 km/h</v-list-item-subtitle>
      </v-list-item>

      <v-list-item
          density="compact"
          prepend-icon="mdi-weather-pouring"
      >
        <v-list-item-subtitle>48%</v-list-item-subtitle>
      </v-list-item>
    </div>
  </v-card>


</template>

<style scoped>

</style>
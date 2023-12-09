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
        weatherStatus: {1: "Soleado", 2: "Nublado", 3: "Lluvioso", 4: "Tormenta"},
          weatherIcons: { 1: "mdi-weather-sunny", 2: "mdi-weather-cloudy", 3: "mdi-weather-rainy", 4: "mdi-weather-lightning" }
      }
    },
    methods: {
      async fetchForecast(){
        try{
          const response = await axios('http://localhost:8000/api/weather', config);
          console.log(response.data);
          this.todayForecast = response.data.today.data;
          this.nextForecast = response.data.forecasts.data


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
  <div class="today-forecast pa-3 align-content-center" v-if="todayForecast !== null">
    <h2>Pronóstico para el día de hoy {{ todayForecast[0]['date'] }}</h2>
    <div class="forecast-container align-content-center pa-3 d-md-flex">
      <v-card class="mx-md-3 px-1 mx-auto my-3 w-75" min-width="240">
        <template v-slot:title>
          <v-icon icon="mdi-weather-partly-cloudy"></v-icon>
          <v-card-item title="Región Norte"></v-card-item>
        </template>
        <v-card-text class="py-0">
          <v-row class="align-center">
            <v-col class="text-h2">
              {{ todayForecast[0]['max_temp'] }}&degC
            </v-col>
            <v-col class="v-col px-0">
              <v-icon size="large">{{weatherIcons[todayForecast[0]['weather']]}}</v-icon>
              <span class="pa-2"> {{ weatherStatus[todayForecast[0]['weather']] }} </span>
            </v-col>
          </v-row>
          <v-card-text class="px-0 pb-0">
            <v-icon>mdi-wind-power</v-icon>
            <span class="px-2">Velocidad del viento: {{ todayForecast[0]['wind_speed'] }} - {{ todayForecast[0]['wind_speed_2'] }}</span>
          </v-card-text>
          <v-card-text class="px-0">
            <v-icon>mdi-weather-windy</v-icon>
            <span class="px-2">Dirección del viento: {{ todayForecast[0]['wind_direction'] }}</span>
          </v-card-text>
        </v-card-text>


      </v-card>
      <v-card class="mx-md-3 px-1 mx-auto my-3 w-75" min-width="240">
        <template v-slot:title>
          <v-icon icon="mdi-weather-partly-cloudy"></v-icon>
          <v-card-item title="Región Centro"></v-card-item>
        </template>
        <v-card-text class="py-0">
          <v-row class="align-center">
            <v-col class="text-h2">
              {{ todayForecast[1]['max_temp'] }}&degC
            </v-col>
            <v-col class="v-col px-0">
              <v-icon size="large">{{weatherIcons[todayForecast[1]['weather']]}}</v-icon>
              <span class="pa-2"> {{ weatherStatus[todayForecast[1]['weather']] }} </span>
            </v-col>
          </v-row>
          <v-card-text class="px-0 pb-0">
            <v-icon>mdi-wind-power</v-icon>
            <span class="px-2">Velocidad del viento: {{ todayForecast[1]['wind_speed'] }} - {{ todayForecast[1]['wind_speed_2'] }}</span>
          </v-card-text>
          <v-card-text class="px-0">
            <v-icon>mdi-weather-windy</v-icon>
            <span class="px-2">Dirección del viento: {{ todayForecast[1]['wind_direction'] }}</span>
          </v-card-text>
        </v-card-text>


      </v-card>
      <v-card class="mx-md-3 px-1 mx-auto my-3 w-75" min-width="240">
        <template v-slot:title>
          <v-icon icon="mdi-weather-partly-cloudy"></v-icon>
          <v-card-item title="Región Sur"></v-card-item>
        </template>
        <v-card-text class="py-0">
          <v-row class="align-center">
            <v-col class="text-h2">
              {{ todayForecast[2]['max_temp'] }}&degC
            </v-col>
            <v-col class="v-col px-0">
              <v-icon size="large">{{weatherIcons[todayForecast[2]['weather']]}}</v-icon>
              <span class="pa-2"> {{ weatherStatus[todayForecast[2]['weather']] }} </span>
            </v-col>
          </v-row>
          <v-card-text class="px-0 pb-0">
            <v-icon>mdi-wind-power</v-icon>
            <span class="px-2">Velocidad del viento: {{ todayForecast[2]['wind_speed'] }} - {{ todayForecast[2]['wind_speed_2'] }}</span>
          </v-card-text>
          <v-card-text class="px-0">
            <v-icon>mdi-weather-windy</v-icon>
            <span class="px-2">Dirección del viento: {{ todayForecast[2]['wind_direction'] }}</span>
          </v-card-text>
        </v-card-text>
      </v-card>
    </div>
  </div>


<!--  EJEMPLO-->
<!--  <v-card
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
  </v-card>-->



</template>

<style scoped>

</style>
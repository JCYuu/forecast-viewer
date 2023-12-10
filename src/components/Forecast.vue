<script>
  import axios from "axios";
  const token = "1|RXFFpicTbNIZxrbC25ZTwkhhS3yoHdq4nVpJOQtz92d4ade7"
  const config = {
    headers: { Authorization: `Bearer ${token}`},
  }

/*  function parseFutureForecasts(forecasts){
    this.nextForecast = {}
    for (const date in forecasts) {
      this.nextForecast[0].append({})
    }
  }*/

  function parseFutureForecasts(forecasts){
    console.log(forecasts)
    let currentDate = forecasts[0]['date'];
    console.log(currentDate);
    let futureForecasts = {};
    let forecastIndex = 0;
    let regionIndex = 0;
    let regions = {};
    for (const data of forecasts) {
    if (data['date'] !== currentDate){
      currentDate = data['date'];
      regions = {};
      forecastIndex++;
      regionIndex = 0;
    }
      regions[regionIndex] = data;
      futureForecasts[forecastIndex] = regions;
      console.log(data);
      regionIndex++;
    }
    console.log(futureForecasts)
    return futureForecasts;
  }
  export default {
    data(){
      return {
        todayForecast: null,
        nextForecast: null,
        nextForecastDate: null,
        weatherStatus: {1: "Soleado", 2: "Soleado con nubes", 3: "Nublado",
                        4: "Lluvia ligera", 5: "Lluvioso", 6: "Chubasco",
                        7: "Fuertes Lluvias", 8: "Tormenta"},
        weatherIcons: { 1: "mdi-weather-sunny", 2: "mdi-weather-partly-cloudy", 3: "mdi-weather-cloudy",
                        4: "mdi-weather-partly-rainy", 5: "mdi-weather-rainy", 6: "mdi-weather-pouring",
                        7: "mdi-weather-lightning-rainy", 8: "mdi-weather-hurricane-outline"},
      }
    },
    methods: {
      async fetchForecast(){
        try{
          const response = await axios('http://localhost:8000/api/weather', config);
          console.log(response);
          console.log(response.data);
          console.log(response.data.forecasts);
          this.todayForecast = response.data.today;
          this.nextForecast = parseFutureForecasts(response.data.forecasts);
          console.log(this.nextForecast)


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
    updated() {
      this.fetchForecast();
    },
    mounted(){
      this.fetchForecast();
    }
  }

</script>

<template>
  <div class="today-forecast pa-3 align-content-center" v-if="todayForecast !== null">
    <h2>Fecha de hoy: {{ todayForecast[0]['date'] }}</h2>
    <div class="forecast-container align-content-center justify-space-between pa-3 d-md-flex flex-wrap">
      <v-card v-for="region in todayForecast" class="mx-md-3 px-1 mx-auto my-3" min-width="280">
        <template v-slot:title>
          <v-icon icon="mdi-clouds"></v-icon>
          <v-card-item>Región {{ region["region"] }}</v-card-item>
        </template>
        <v-card-text class="py-0">
          <v-row class="align-center">
            <v-col class="text-h2">
              {{ region['max_temp'] }}&degC
            </v-col>
            <v-col class="v-col px-0">
              <v-icon size="large">{{weatherIcons[region['weather']]}}</v-icon>
              <span class="pa-2"> {{ weatherStatus[region['weather']] }} </span>
            </v-col>
          </v-row>
          <v-card-text class="px-0 pb-0">
            <v-icon>mdi-wind-power</v-icon>
            <span class="px-2">Velocidad del viento: {{ region['wind_speed'] }} - {{ region['wind_speed_2'] }}</span>
          </v-card-text>
          <v-card-text class="px-0">
            <v-icon>mdi-weather-windy</v-icon>
            <span class="px-2">Dirección del viento: {{ region['wind_direction'] }}</span>
          </v-card-text>
        </v-card-text>
      </v-card>

    </div>

    <h2>Días próximos</h2>
    <div v-if="nextForecast !== null">
      <div v-for="forecast in nextForecast" class="forecast-container align-content-center pa-3 d-block">
        <h3 class="pa-2">Fecha: {{ forecast[0]['date'] }}</h3>
        <v-card class="d-md-flex justify-space-between v-row--no-gutters w-100">
          <div v-for="data in forecast" class="v-col-auto pa-2">
            <v-card-title>Region {{ data['region'] }}</v-card-title>
            <v-card-subtitle>Temperatura min - max</v-card-subtitle>
            <v-card-item class="text-h3" id="temp">{{ data['min_temp'] }}&degC - {{ data['max_temp'] }}&degC</v-card-item>
            <v-card-subtitle>Estado del tiempo Mañana</v-card-subtitle>
            <v-card-item>
              <v-icon>{{ weatherIcons[data['weather']] }}</v-icon>
              {{ weatherStatus[data['weather']] }}
            </v-card-item>
            <v-card-subtitle>Velocidad del viento - Direccion</v-card-subtitle>
            <v-card-item class="d-flex justify-space-between text-justify">
              <span><v-icon>mdi-wind-power</v-icon> {{ data['wind_speed'] }} - {{ data['wind_speed_2'] }} </span>
              <span><v-icon>mdi-weather-windy</v-icon> {{ data['wind_direction'] }}</span>
            </v-card-item>
            <v-card-subtitle>Estado del tiempo Tarde</v-card-subtitle>
            <v-card-item>
              <v-icon>{{ weatherIcons[data['weather_2']] }}</v-icon>
              {{ weatherStatus[data['weather_2']] }}
            </v-card-item>
            <v-card-subtitle>Velocidad del viento - Direccion</v-card-subtitle>
            <v-card-item class="d-flex justify-space-between text-justify">
              <span><v-icon>mdi-wind-power</v-icon> {{ data['wind_speed_3'] }} - {{ data['wind_speed_4'] }} </span>
              <span><v-icon>mdi-weather-windy</v-icon> {{ data['wind_direction_2'] }}</span>
            </v-card-item>
          </div>
        </v-card>
      </div>
    </div>
    <div v-else>
      <h3>No hay datos</h3>
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
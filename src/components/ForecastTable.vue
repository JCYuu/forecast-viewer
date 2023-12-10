<script>
  import axios from "axios";

  const token = import.meta.env.VITE_APP_TOKEN;
  const config = {
    headers: { Authorization: `Bearer ${token}`},
  }
  let northTemps = { temp: [] };
  let centerTemps = { temp: [] };
  let southTemps = { temp: [] };
  let dates = [];

  const apiControl = {
    async fetch({ page, itemsPerPage, sortBy }){
      return new Promise(async resolve => {
        let response = '';
        if(sortBy.length){
          let sortKey = sortBy[0].key;
          let sortOrder = sortBy[0].order;
          response = await axios(`http://localhost:8000/api/weather/all/today?pages=${itemsPerPage}&page=${page}&ob[${sortOrder}]=${sortKey}`, config);
        }
        else response = await axios(`http://localhost:8000/api/weather/all/today?pages=${itemsPerPage}&page=${page}`, config);
        let items = response.data.today.data;
        let total = response.data.today.total;
        resolve({ items: items, total: total });
      })
    }
  }

  export default {
    data: () => ({
      itemsPerPage: 5,
      headers: [
        {
          title: 'Fecha',
          align: 'start',
          sortable: true,
          key: 'date',
        },
        { title: 'Región', key: 'region', align: 'end' },
        { title: 'Clima', key: 'weather', align: 'end' },
        { title: 'Temperatura \u00B0C', key: 'max_temp', align: 'end' },
        { title: 'Velocidad min Viento Km/h', key: 'wind_speed', align: 'end' },
        { title: 'Velocidad max Viento Km/h', key: 'wind_speed_2', align: 'end' },
        { title: 'Dirección del Viento', key: 'wind_direction', align: 'end' },
      ],
      search: '',
      serverItems: [],
      loading: true,
      totalItems: 0,
      weatherStatus: {1: "Soleado", 2: "Soleado con nubes", 3: "Nublado",
                      4: "Lluvia ligera", 5: "Lluvioso", 6: "Chubasco",
                      7: "Fuertes Lluvias", 8: "Tormenta"},
      itemsPerPageOption: [5, 10, 25, 50, 75, 100],
      series: [{
        name: 'Norte',
        data: northTemps.temp
      }, {
        name: 'Centro',
        data: centerTemps.temp
      }, {
        name: 'Sur',
        data: southTemps.temp
      }],
      options: {
        chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: true
        },
        theme: {
          mode: 'dark'
        },
        stroke: {
          curve: 'smooth'
        },
        labels: dates,
        xaxis: {
          categories: dates
        },
        yaxis: {
          title: 'Max_temp \u00B0C'
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      },
    }),
    methods: {
      async loadItems ({ page, itemsPerPage, sortBy }) {
        this.loading = true
        console.log({ page, itemsPerPage, sortBy });
        apiControl.fetch({ page, itemsPerPage, sortBy }).then(({ items, total })=>{
          this.serverItems = items;
          this.totalItems = total;
          northTemps = { temp: [] };
          centerTemps = { temp: [] };
          southTemps = { temp: [] };
          dates = [];
          for (const data of this.serverItems) {
            if(dates.indexOf(data.date) === -1) dates.push(data.date);
            switch(data.region){
              case 'Norte':
                northTemps.temp.push(data.max_temp);
                break;
              case 'Centro':
                centerTemps.temp.push(data.max_temp);
                break;
              case 'Sur':
                southTemps.temp.push(data.max_temp);
                break;
            }
            data.weather = this.weatherStatus[data.weather];
          }
          console.log(northTemps.temp);
          console.log(dates);
          console.log(centerTemps.temp);
          console.log(southTemps.temp);
          this.loading = false;
          this.updateChart();
        })

      },
      updateChart() {
        this.series = [{
          name: 'Norte',
          data: northTemps.temp
        }, {
          name: 'Centro',
          data: centerTemps.temp
        }, {
          name: 'Sur',
          data: southTemps.temp
        }]
        this.options = {
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: true
          },
          stroke: {
            curve: 'smooth'
          },
          yaxis: [{
            title: {
              text: 'Max_temp \u00B0C'
            }
          }],
          xaxis: {
            categories: dates
          },
          labels: dates,
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          },
        }
      }
    },
  }

</script>

<template>
  <v-container class="mx-auto">
    <apexchart  type="area" :options="options" :series="series"></apexchart>
  </v-container>
  <v-container>
    <h3>Registro de pronósticos</h3>
    <v-data-table-server
        class="my-2"
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :items="serverItems"
        :loading="loading"
        :search="search"
        :items-per-page-options="itemsPerPageOption"
        item-value="name"
        @update:options="loadItems"
    ></v-data-table-server>
  </v-container>
</template>

<style scoped>

</style>
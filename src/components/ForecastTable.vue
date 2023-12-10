<script>
  import axios from "axios";
  import {fi} from "vuetify/locale";

  const token = import.meta.env.VITE_APP_TOKEN;
  if(!token) alert('APP_Token is not set, you will get an error, please log in and set credentials')
  const config = {
    headers: { Authorization: `Bearer ${token}`},
  }
  let northTemps = { temp: [] };
  let centerTemps = { temp: [] };
  let southTemps = { temp: [] };
  let dates = [];

  const apiControl = {
    async fetch({ page, itemsPerPage, sortBy}, region){
      if(region === 'Todas') region = undefined;
      let regFilter = (region) ? `&region[eq]=${region}` : '';
      return new Promise(async resolve => {
        let response = '';
        if(sortBy.length){
          let sortKey = sortBy[0].key;
          let sortOrder = sortBy[0].order;
          response = await axios(`http://localhost:8000/api/weather/all/today?pages=${itemsPerPage}&page=${page}&ob[${sortOrder}]=${sortKey}${regFilter}`, config);
        }
        else response = await axios(`http://localhost:8000/api/weather/all/today?pages=${itemsPerPage}&page=${page}${regFilter}`, config);
        let items = response.data.today.data;
        let total = response.data.today.total;
        resolve({ items: items, total: total });
      })
    }
  }

  export default {
    computed: {
      fi() {
        return fi
      }
    },
    data: () => ({
      selectData: ['Todas', 'Norte', 'Centro', 'Sur'],
      selectedRegion: undefined,
      itemsPerPage: 15,
      page: 1,
      sortMethod: undefined,
      headers: [
        {
          title: 'Fecha',
          align: 'start',
          sortable: true,
          key: 'date',
        },
        { title: 'Región', sortable: false, key: 'region', align: 'end' },
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
        fill: {
          type: 'gradient',
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
          title: 'Regiones',
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
        this.page = page;
        this.itemsPerPage = itemsPerPage;
        this.sortMethod = sortBy;
        console.log('Region:', this.selectedRegion)
        apiControl.fetch({ page, itemsPerPage, sortBy }, this.selectedRegion).then(({ items, total })=>{
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
          }
          this.loading = false;
          this.updateChart();
        })

      },
      async filterRegion(){
        setTimeout(async ()=> {
          await this.loadItems({page: this.page, itemsPerPage: this.itemsPerPage, sortBy: this.sortMethod});
        }, 300);
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
            title: 'Regiones',
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
    <v-select class="my-3" @update:model-value="filterRegion" label="Filtrar por región" v-model="selectedRegion" :items="selectData"></v-select>
    <v-data-table-server
        class="my-2"
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :items="serverItems"
        :loading="loading"
        :search="search"
        :items-per-page-options="itemsPerPageOption"
        items-per-page-text="Pronósticos por página"
        item-value="name"
        @update:options="loadItems"
    ></v-data-table-server>
  </v-container>
</template>

<style scoped>

</style>
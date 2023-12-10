<script>
  import axios from "axios";
  const token = "1|RXFFpicTbNIZxrbC25ZTwkhhS3yoHdq4nVpJOQtz92d4ade7";
  const config = {
    headers: { Authorization: `Bearer ${token}`},
  }

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
    }),
    methods: {
      async loadItems ({ page, itemsPerPage, sortBy }) {
        this.loading = true
        console.log({ page, itemsPerPage, sortBy });
        apiControl.fetch({ page, itemsPerPage, sortBy }).then(({ items, total })=>{
          this.serverItems = items;
          this.totalItems = total;
          for (const data of this.serverItems) {
            data.weather = this.weatherStatus[data.weather];
          }
          this.loading = false;
        })



        // const sort = JSON.parse(JSON.stringify(sortBy))



       /* console.log(response);
        console.log(response.data.today);
        console.log(response.data.today.data);*/
      /*  this.serverItems = response.data.today.data;

        console.log(this.serverItems);
        this.totalItems = response.data.today.total;
        this.loading = false;*/
        /*FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
          this.serverItems = items
          this.totalItems = total
          this.loading = false
        })*/
      },
    },
  }

</script>

<template>

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
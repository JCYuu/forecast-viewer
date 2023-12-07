<script>
export default {
  name: "Count",
  data(){
    return {
      counter: 1
    }
  },
  methods:{
    increaseCount (){
      this.counter++;
    }
  }
}
</script>

<template>
  <span>Count: {{counter}}</span>
  <button @click="increaseCount">Sube esto</button>
</template>

<style scoped>

</style>
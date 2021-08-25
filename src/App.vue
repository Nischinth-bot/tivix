<template>
  <div class="app">
    <label for="text"> Target City </label>
    <textarea class="text" v-model="newCity"> </textarea>
    <base-button @click="addNewCity()"> Ok </base-button>
    <data-tracker v-for="city in targetCities" :key="city" :cityName="city">
    </data-tracker>
  </div>
</template>

<script>
import DataTracker from "./components/DataTracker.vue";
export default {
  components: { DataTracker },
  data() {
    return {
      newCity: "",
      targetCities: [],
    };
  },
  methods: {
    addNewCity() {
      if (this.newCity != "") {
        this.targetCities.push(this.newCity);
        this.newCity = "";
      }
    },
  },
};
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.text {
  width: 200px;
  font-size: 20px;
  align-self: center;
}
</style>

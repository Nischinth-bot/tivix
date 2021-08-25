<template>
  <div class="app">
    <div class="header">
      <h1>TIVIX TEST</h1>
      <img src="./assets/sunny.png" />
    </div>
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

.header{
  display: flex;
}

.header img{
  height: 100px;
  width: 100px;
  margin-left: 2rem;
}
</style>

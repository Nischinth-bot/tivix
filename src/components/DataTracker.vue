<template>
  <div class="wrapper">
    <base-spinner v-if="isLoading"> </base-spinner>
    <div class="container" v-else>
      <h2 class="cityName">{{ cityName }}</h2>
      <div class="obj">
        <base-button @click="doInsert()"> Insert </base-button>
        <input type="number" v-model.number="insertedValue" v-if="showInput" />
        <button v-if="showInput" @click="updateTemps()">OK</button>
      </div>
      <div class="obj">
        <h2 style="color: green">Min</h2>
        <h3>{{ min }}</h3>
      </div>
      <div class="obj">
        <h2 style="color: red">Max</h2>
        <h3>{{ max }}</h3>
      </div>
      <div class="obj">
        <h2 style="color: orange">Median</h2>
        <h3>{{ median }}</h3>
      </div>
      <div class="obj">
        <h2 style="color: purple">Mode</h2>
        <h3>{{ mode }}</h3>
      </div>
      <p v-if="uninitiated" style="color: red">
        The data tracker has not been initiated!
      </p>
    </div>
  </div>
</template>

<script>
import BaseButton from "./wrappers/BaseButton.vue";
export default {
  components: { BaseButton },
  props: ["cityName"],
  data() {
    return {
      temperatures: [],
      insertedValue: 0.0,
      min: Number.MAX_SAFE_INTEGER,
      max: Number.MIN_SAFE_INTEGER,
      median: 0.0,
      mode: 0.0,
      showInput: false,
      uninitiated: false,
      isLoading: false,
    };
  },
  methods: {
    doInsert() {
      this.showInput = !this.showInput;
    },
    updateTemps() {
      if (this.insertedValue === "") {
        return;
      }
      console.log("Here");
      this.temperatures.push(this.insertedValue);
      this.calculate();
    },
    calcMax() {
      this.max = Math.max(...this.temperatures);
    },
    calcMin() {
      this.min = Math.min(...this.temperatures);
    },
    calcMedian() {
      const idx = Math.round(this.temperatures.length / 2);
      this.median = this.temperatures[idx];
    },
    calculate() {
      console.log("Calculating..");
      this.calcMax();
      this.calcMin();
      this.calcMedian();
    },
  },
  async mounted() {
    if (!this.cityName) {
      this.uninitiated = true;
    } else {
      try {
        const url = `https:api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&appid=e79077ad8ef70a0346800c89e65e6795&units=metric`;
        const response = await fetch(url);
        const obj = await response.json();
        const allDays = obj.list;
        for (const key in allDays) {
          this.temperatures.push(allDays[key].main.temp);
        }
        this.calculate();
      } catch (err) {
        console.log(err);
      }
    }
  },
};
</script>


<style scoped>
.container {
  display: flex;
  margin: 2rem;
  width: 100%;
}
.wrapper {
  width: 100%;
}
.obj {
  display: flex;
  width: 16.66%;
  flex-direction: column;
  border: 1px solid black;
}

.cityName {
  margin-right: 1rem;
  width: 10.66%;
}
</style>


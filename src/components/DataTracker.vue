<template>
  <div class="container">
    <h2>{{ cityName }}</h2>
    <div class="obj">
      <base-button @click="doInsert()"> Insert </base-button>
      <input
        type="number"
        v-model="insertedValue"
        v-if="showInput"
        @click="temperatures.push(insertedValue)"
      />
      <button v-if="showInput">OK</button>
    </div>
    <div class="obj">
      <base-button @click="doMin()"> Min </base-button>
      <h3>{{ min }}</h3>
    </div>
    <div class="obj">
      <base-button @click="doMax()"> Max </base-button>
      <h3>{{ max }}</h3>
    </div>
    <div class="obj">
      <base-button @click="doMedian()"> Median </base-button>
      <h3>{{ median }}</h3>
    </div>
    <div class="obj">
      <base-button @click="doMode()"> Mode </base-button>
      <h3>{{ mode }}</h3>
    </div>
    <p v-if="uninitiated" style="color: red">
      The data tracker has not been initiated!
    </p>
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
    };
  },
  methods: {
    doInsert() {
      this.showInput = !this.showInput;
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
          this.temperatures.push(console.log(allDays[key].main.temp));
        }
        this.calcMax();
        this.calcMin();
        this.calcMedian();
        this.calcMode();
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
}

.obj {
  display: flex;
  flex-direction: column;
}
</style>


<template>
  <div class="wrapper">
    <base-spinner v-if="isLoading"> </base-spinner>
    <div class="container" v-else>
      <h2 class="cityName">{{ cityName }}</h2>
      <div class="obj">
        <h2>Insert</h2>
        <input type="number" v-model.number="insertedValue" />
        <button class="brown-button" @click="updateTemps()">OK</button>
      </div>
      <div class="obj">
        <h2 style="color: green">Min</h2>
        <h3>{{ min }} &#176; C</h3>
      </div>
      <div class="obj">
        <h2 style="color: red">Max</h2>
        <h3>{{ max }} &#176; C</h3>
      </div>
      <div class="obj">
        <h2 style="color: orange">Median</h2>
        <h3>{{ median }} &#176; C</h3>
      </div>
      <div class="obj">
        <h2 style="color: purple">Mode</h2>
        <h3>{{ mode }} &#176; C</h3>
      </div>
      <p v-if="uninitiated" style="color: red">
        The data tracker has not been initiated!
      </p>
    </div>
  </div>
</template>

<script>
export default {
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
    /** Helper method */
    doInsert() {
      this.showInput = !this.showInput;
    },

    /** Helper method to update the temperature array */
    updateTemps() {
      if (this.insertedValue === "") {
        return;
      }
      this.temperatures.push(this.insertedValue);
      this.calculate();
    },

    /** Sets the max field to the maximum of the temperatures array. */
    calcMax() {
      this.max = Math.max(...this.temperatures);
    },

    /** Sets the min field to the minimum of the temperatures array. */
    calcMin() {
      this.min = Math.min(...this.temperatures);
    },

    /** Sets the median field to the median of the temperatures array. */
    calcMedian() {
      const idx = Math.round(this.temperatures.length / 2);
      this.median = this.temperatures[idx];
    },
    /**
     * Use a Map to maintain the obtain of each unique element in the temperature array.
     * Sets the mode field with the correct mode of the temperature array.
     */
    calcMode() {
      // Get the Mapping of (val, count)
      const map = new Map();
      for (const idx in this.temperatures) {
        const key = this.temperatures[idx];
        if (!map.has(key)) {
          map.set(key, 0);
        } else {
          map.set(key, map.get(key) + 1);
        }
      }

      // Set the mode as the val with the maximum count
      var last_freq = 0;
      console.log(map);
      for (var key of map.keys()) {
        if (map.get(key) > last_freq) {
          this.mode = key;
          last_freq = map.get(key);
        }
      }
    },

    /** Helper method */
    calculate() {
      this.calcMax();
      this.calcMin();
      this.calcMedian();
      this.calcMode();
    },
  },

  /** HTTP requests, data loading .... etc */
  async mounted() {
    if (!this.cityName) {
      this.uninitiated = true;
    } else {
      try {
        this.isLoading = true;
        const url = `https:api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&appid=e79077ad8ef70a0346800c89e65e6795&units=metric`;
        const response = await fetch(url);
        const obj = await response.json();
        const allDays = obj.list;
        for (const key in allDays) {
          this.temperatures.push(allDays[key].main.temp);
        }
        this.calculate();
        this.isLoading = false;
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
  justify-content: space-around;
  align-items: center;
  border: 1px solid black;
}

.cityName {
  margin-right: 1rem;
  width: 10.66%;
}

.brown-button {
  background: brown;
  color: white;
  cursor: pointer;
  width: 50px;
}

.brown-button:hover {
  background: rgb(138, 37, 37);
}

input {
  width: 25%;
  height: 20%;
  border: 1px solid black;
}
</style>


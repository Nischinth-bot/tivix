<template>
  <div class="container">
    <div class="obj">
      <base-button @click="doInsert()"> Insert </base-button>
      <input
        type="number"
        v-model="insertedValue"
        @click="temperatures.push(insertedValue)"
      />
    </div>
    <div class="obj">
      <base-button @click="doMin()"> Min </base-button>
    </div>
    <div class="obj">
      <base-button @click="doMax()"> Max </base-button>
    </div>
    <div class="obj">
      <base-button @click="doMedian()"> Median </base-button>
    </div>
    <div class="obj">
      <base-button @click="doMode()"> Mode </base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from "./wrappers/BaseButton.vue";
export default {
  components: { BaseButton },
  data() {
    return {
      temperatures: [],
      insertedValue: 0,
    };
  },
  methods: {
      min() {},
    max() {},
    median() {},
    mode() {},
  },
};
</script>


<style scoped>
.container {
  display: flex;
}

.obj {
  display: flex;
  flex-direction: column;
}
</style>


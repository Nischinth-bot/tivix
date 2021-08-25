<template>
  <div class="card">
    <div class='base-card'>
      <slot> </slot>
    </div>
  </div>
</template>


<script>
export default {
  props: ['background'],
};
</script>



<style scoped>
.base-card {
  border-radius: 12px;
  border-color: gray;
  background: white;
  color: rgb(204, 183, 63);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 0.5rem;
  width: 50rem;
}

.base-card h1 {
  width:100%;
  background: black;
  color: gold;
  text-align: center;
}

p strong {
  margin: 4px;
  font-size: 200%;
}
</style>
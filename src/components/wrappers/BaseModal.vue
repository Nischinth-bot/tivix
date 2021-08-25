<template>
  <div v-if="open" class="backdrop" @click="$emit('close')"></div>
  <transition name="modal">
    <dialog open v-if="open">
      <div class="x-bar">
        <h3 class="title">{{ title }}</h3>
        <div class="x" @click="$emit('close')">x</div>
      </div>
      <div class="slot">
        <slot> </slot>
      </div>
    </dialog>
  </transition>
</template>

<script>
export default {
  props: ['open', 'title'],
  emits: ['close'],
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  border: 1px solid rgb(214, 152, 152);
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.75);
}

dialog {
  position: fixed;
  top: 30vh;
  width: 30rem;
  height: 26rem;
  left: calc(50% - 15rem);
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
  background-color: white;
  z-index: 100;
  border: none;
  /* animation: modal 0.3s ease-out forwards; */
}

.x-bar * {
  padding: 1rem;
}
.x-bar {
  display: flex;
  justify-content: space-between;
  background: black;
  color: gold;
}

.x-bar:hover {
  cursor: pointer;
}

.modal-enter-active {
  animation: modal 0.3s ease-out;
}

.modal-leave-active {
  animation: modal 0.3s ease-in reverse;
}

@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
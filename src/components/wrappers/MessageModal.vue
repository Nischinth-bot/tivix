<template>
  <div v-if="open" class="backdrop" @click="$emit('close')"></div>
  <transition name="modal">
    <dialog open v-if="open" class="message">
      <slot> </slot>
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
  border: 1px solid black;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.75);
}

dialog {
  position: fixed;
  left: calc(60% - 15rem);
  top: 30vh;
  width: 20rem;
  height: 6rem;
  margin-top: 8%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
  background-color: white;
  z-index: 100;
  border: none;
}

.message {
  display: flex;
  justify-content: center;
  align-items: center;
}

.x-bar * {
  padding: 1rem;
}
.x-bar {
  display: flex;
  height: 1rem;
  align-items: center;
  justify-content: flex-end;
  background: gold;
  color: green;
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
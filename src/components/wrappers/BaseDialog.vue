<template>
  <teleport to="body">
    <div v-if="show" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <form method="dialog" @submit.prevent="tryClose('neither')">
            <h3>Thanks for your donation! Join our hall of fame!</h3>
            <p>
              <label for="fullname"> Please enter your name. </label>
              <input id="fullname" type="text" v-model="fullName" />
            </p>
            <h3>Are you an alumini?</h3>
            <p>
              <label for="alum"> Yes </label>
              <input id="alum" type="radio" value="true" v-model="isAlumini" />
              <label for="notAlum"> No </label>
              <input
                id="notAlum"
                type="radio"
                value="false"
                v-model="isAlumini"
              />
            </p>
            <div v-if="isAlumini && isAlumini == 'true'">
              <h3>Please enter your year of graduation.</h3>
              <p>
                <input id="alum" type="text" v-model.number="year" />
              </p>
            </div>
            <span id="confirmCancel">
              <base-button @click="tryClose('confirm')"> Confirm </base-button>
              <base-button @click="tryClose('cancel')"> Close </base-button>
            </span>
          </form>
        </section>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  data() {
    return {
      fullName: '',
      isAlumini: null,
      year: null,
    };
  },
  watch: {
    isAlumini() {},
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['close'],
  methods: {
    tryClose(arg) {
      if (this.fixed) {
        return;
      }
      const donor = {
        fullName: this.fullName,
        isAlumini: this.isAlumini,
        yearOfGraduation: this.year,
      };
      this.$emit('close', { type: arg, donor: donor });
      // console.log(donor);
      this.fullName = '';
      this.isAlumini = null;
      this.year = null;
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  /* top: 0;
  left: 0; */
  height: 100vh;
  width: 100%;
  background-color: rgba(100, 100, 100, 0.8);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px grey(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: gold;
  color: black;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
import { createApp } from "vue";
import App from "./App.vue";
import BaseButton from "./components/wrappers/BaseButton";
import BaseSpinner from "./components/wrappers/BaseSpinner";

const app = createApp(App);
app.component("base-button", BaseButton);
app.component("base-spinner", BaseSpinner);
app.mount("#app");

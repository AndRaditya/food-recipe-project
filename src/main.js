/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";
import "material-design-icons-iconfont/dist/material-design-icons.css";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");
var baseUrl = "";

baseUrl = "https://api.spoonacular.com/recipes";

const api = baseUrl;
app.mixin({
  data() {
    return {
      API: api,
    };
  },
});

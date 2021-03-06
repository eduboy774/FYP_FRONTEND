import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
import VueTelInputVuetify from "vue-tel-input-vuetify/lib";

// connect to  backend
// import apolloProvider from "./apollo_client";
import { DEBUG } from "./settings";
import { createProvider } from "./vue-apollo";

Vue.config.productionTip = DEBUG;
Vue.config.productionTip = false;

Vue.use(VueTelInputVuetify, {
  vuetify,
});

const options = {
  confirmButtonColor: "#41b882",
  cancelButtonColor: "#ff7674",
};

Vue.use(VueSweetalert2, options);
new Vue({
  router,
  vuetify,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");

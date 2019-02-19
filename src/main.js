// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import store from "./store";

Vue.config.productionTip = false;

String.prototype.replaceAt = function(index, char) {
  return this.substring(0, index) + char + this.substring(index + 1);
};
/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  store,
  template: "<App/>"
});

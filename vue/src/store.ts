import Vue from "vue";
import {Store} from "vuex";
import Vuex from "vuex";

import appState from "./store/AppState";
import fsConfig from "./store/FootSwitchConfig";

Vue.use(Vuex);

const store : Store<any> = new Store({
  modules: {
      fsConfig,
      appState
  }
});


export default store;
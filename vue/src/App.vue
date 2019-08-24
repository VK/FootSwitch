<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Device</span>
      </div>
      <input type="text" class="form-control" v-model="config.name" :disabled="appState.disabled" />
      <div class="input-group-append" v-if="appState.bluetoothVersion === true">
        <button
          type="button"
          class="btn btn-primary"
          v-if="!appState.connected"
          v-on:click="loadConfig"
        >Connect</button>
        <button
          type="button"
          class="btn btn-secondary"
          v-if="appState.connected"
          v-on:click="disconnect"
        >Disconnect</button>
      </div>
    </div>

    <div v-if="showConfigsMenu" class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Config</span>
      </div>
      <!-- v-on:change="configChanged" -->
      <select
        class="input-txt-smp pad2 form-control"
        id="selectedConfig"
        ref="configSelect"
        v-model="selectedConfigName"
        :disabled="appState.disabled"
      >
        <option v-for="(name, index) in configNames" v-bind:key="index">{{ name }}</option>
      </select>

      <div class="input-group-append">
        <button
          type="button"
          class="btn btn-secondary"
          v-on:click="deleteConfig"
          :disabled="appState.disabled"
        >Delete</button>
      </div>
    </div>

    <div v-if="showConfigsSetting">
      <div v-for="(value, shortName, index) in selectedConfigData" v-bind:key="index">
        <div class="input-group mb-1">
          <div class="input-group-prepend">
            <span
              class="input-group-text mp-0"
              id="basic-addon1"
              style="flex: 1; min-width: 3.4em; max-width:20%; padding:0; padding-left:0.2em;"
            >
              <img
                :src="appState.publicPath + 'img/icon' +  shortName +  '.svg'"
                height="35"
                v-bind:alt="fsConfig.shortToLongNameMap[shortName]"
                class="mb-0"
              />
            </span>
          </div>

          <select
            class="input-txt-smp pad2 form-control"
            v-model="value.KEY"
            :disabled="appState.disabled"
          >
            <option
              v-for="(keyvalue, index) in fsConfig.possibleKeys"
              v-bind:key="index"
            >{{ keyvalue }}</option>
          </select>

          <div class="input-group-append">
            <div class="input-group-text">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  :id="shortName+'_SHIFT'"
                  v-model="value.SHIFT"
                  :disabled="appState.disabled"
                />
                <label class="custom-control-label" :for="shortName+'_SHIFT'">
                  <img :src="appState.publicPath + 'img/iconShift.svg'" height="20" alt="Shift" />
                </label>
              </div>

              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  :id="shortName+'_CTR'"
                  v-model="value.CTR"
                  :disabled="appState.disabled"
                />
                <label class="custom-control-label" :for="shortName+'_CTR'">
                  <img :src="appState.publicPath + 'img/iconCtr.svg'" height="20" alt="Ctr" />
                </label>
              </div>

              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  :id="shortName+'_ALT'"
                  v-model="value.ALT"
                  :disabled="appState.disabled"
                />
                <label class="custom-control-label m-0 p-0" :for="shortName+'_ALT'">
                  <img :src="appState.publicPath + 'img/iconAlt.svg'" height="20" alt="Alt" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="input-group mt-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">New Config</span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Name"
          v-model="newConfigName"
          :disabled="appState.disabled"
        />
        <div class="input-group-append">
          <button
            type="button"
            class="btn btn-secondary"
            v-on:click="addNewConfig"
            :disabled="appState.disabled"
          >Add</button>
        </div>
      </div>

      <div class="input-group mt-3">
        <button
          type="button"
          class="btn btn-primary w-100"
          v-on:click="saveConfig"
          :disabled="appState.disabled"
        >Save</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "./store";

interface KeyConfig {
  KEY: String;
  CTR: boolean;
  ALT: boolean;
  SHIFT: boolean;
}

interface SingleConfig {
  [key: string]: KeyConfig;
}

type AllConfigs = {
  [key: string]: SingleConfig;
};

type ConfigType = {
  [key: string]: any;
};

@Component
export default class App extends Vue {
  constructor() {
    super();
    store.commit("appState/registerProgressbar", this.$Progress);
  }

  get appState(): any {
    return store.state.appState;
  }

  get fsConfig(): any {
    return store.state.fsConfig;
  }

  get config(): ConfigType {
    return store.state.fsConfig.data;
  }

  get showConfigsMenu(): boolean {
    return Object.keys(this.config.configs).length > 0;
  }

  get showConfigsSetting(): boolean {
    return this.config.configs[this.selectedConfigName] !== undefined;
  }

  get allConfigs(): AllConfigs {
    return this.config.configs;
  }
  get configNames(): String[] {
    return Object.keys(this.allConfigs);
  }

  get selectedConfigData(): SingleConfig {
    return this.config.configs[this.selectedConfigName];
  }

  get selectedConfigName(): string {
    return this.config.currentConfig;
  }

  set selectedConfigName(value: string) {
    store.commit("fsConfig/setCurrentConfig", value);
  }

  disconnect() {
    store.commit("appState/disconnect");
  }

  loadConfig() {
    store.commit("fsConfig/load");
  }

  newConfigName: string = "";
  addNewConfig() {
    if (this.newConfigName === "") {
      alert("Please choose a name for the new configuration.");
      return;
    }
    if (this.config.configs[this.newConfigName] === undefined) {
      store.commit("fsConfig/addNewConfig", this.newConfigName);
    } else {
      alert(
        "Configuration with same name already defined. Choose a different name!"
      );
    }
  }

  deleteConfig() {
    if (Object.keys(store.state.fsConfig.data.configs).length <= 1) {
      alert("Please do not delete the last configuration.");
      return;
    }
    store.commit("fsConfig/deleteCurrentConfig");
  }

  saveConfig() {
    store.commit("fsConfig/save");
  }
}
</script>

<style lang="scss">

//@import "node_modules/bootstrap/scss/bootstrap";

// boostrap minimal set needed
@import "node_modules/bootstrap/scss/functions";
@import "node_modules/bootstrap/scss/variables";
@import "node_modules/bootstrap/scss/mixins";
@import "node_modules/bootstrap/scss/root";
@import "node_modules/bootstrap/scss/reboot";
@import "node_modules/bootstrap/scss/forms";
@import "node_modules/bootstrap/scss/buttons";
@import "node_modules/bootstrap/scss/dropdown";
@import "node_modules/bootstrap/scss/button-group";
@import "node_modules/bootstrap/scss/input-group";
@import "node_modules/bootstrap/scss/custom-forms";
@import "node_modules/bootstrap/scss/utilities";



#app
{
  z-index: 10;

  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 20px;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

.custom-checkbox .custom-control-label::before {
  left: -1.2rem;
}
.custom-checkbox .custom-control-label::after {
  left: -1.2rem;
}

.fsSlowDownL {
  animation: pulseSlowDown 30s infinite;
  animation-delay: -15s;
}

.fsSlowDownC {
  animation: pulseSlowDown 30s infinite;
  animation-delay: -14.4s;
}

.fsSlowDownR {
  animation: pulseSlowDown 30s infinite;
  animation-delay: -14.6s;
}

@keyframes pulseSlowDown {
  0% {
    transform: scale(1);
  }

  70% {
    transform: scale(1);
  }

  70.5% {
    transform: scale(0.95);
    opacity: 1;
  }

  72% {
    transform: scale(2.1);
    opacity: 0.5;
  }

  74% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.fadeOut {
  -webkit-transition: opacity 3s ease-in-out;
  -moz-transition: opacity 3s ease-in-out;
  -ms-transition: opacity 3s ease-in-out;
  -o-transition: opacity 3s ease-in-out;
  transition: opacity 3s ease-in-out;
  opacity: 0.2;
}
</style>

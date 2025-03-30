<script setup>
import PlaySound from './components/PlaySound.vue'
import PlayScale from './components/PlayScale.vue'
import PlayMelody from './components/PlayMelody.vue'
import * as Tone from 'tone'
import { ref, reactive, watch } from 'vue'
import { useSoundsStore } from './stores/store'
import { storeToRefs } from 'pinia'

const store = useSoundsStore()
const { oscTypes } = storeToRefs(store)

const selectedOsc = ref(oscTypes.value[0])
const selectedVol = ref(1)

const synthSettings = reactive({
  oscType: selectedOsc,
  vol: selectedVol
})

// watch(selectedOsc, () => {
//   console.log(selectedOsc.value)
// })


</script>

<template>
  <div class="main-container">
    <div class="synth">
      <h1>Synth Settings</h1>
      <div class="setting">
        <label for="oscillator">Oscillator</label>
        <select name="oscillator" v-model="selectedOsc">
          <option v-for="osc in oscTypes" :key="osc" :value="osc">{{ osc }}</option>
        </select>
      </div>
      <div class="setting">
        <label for="volume">Volume</label>
        <div class="slider-container">
          <input
            type="range"
            min="-12"
            max="12"
            step="0.5"
            v-model="selectedVol"/>
          <span class="live-label">{{ selectedVol }}</span>
        </div>
      </div>
    </div>
    <div class="component-wrapper">
      <PlaySound :synthSettings="synthSettings"/>
      <PlayScale :synthSettings="synthSettings"/>
      <PlayMelody />
    </div>
  </div>
</template>


<style>
/* global styles for the components above */
.main-container {
  display: flex;
  flex-direction: column;
}

.synth {
  margin: 20px;
  padding: 10px;
  border: 2px solid grey;
  border-radius: 20px;
}

.component-wrapper {
  display: flex;
  flex-direction: row;
}

.component {
  display: flex;
  flex-direction: column;
  min-height: 40vh;
  min-width: 20vw;
  margin: 10px;
  padding: 10px;
  border: 2px solid grey;
  border-radius: 20px;
}

.setting {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

/* syles for spans that show the range slider value */
.live-label {
  display: inline-block;
  width: 130px;
  text-align: center;
}

.slider-container {
  display: flex;
  flex-direction: row;
}

.main-button {
  margin: 20px;
  padding: 10px;
  border: none;
  border-radius: 20px;
  margin-top:auto;
}

.sub-button {
  margin: 10px;
  padding: 8px 10px;
  border: none;
  border-radius: 20px;
  font-size: smaller;
}

button {
  background-color: #15EB55;
}
button:hover {
  background-color: #03d341
}
button:active {
  background-color: #56ec83
}

</style>

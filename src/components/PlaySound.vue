<script setup>
import { ref } from 'vue'
import * as Tone from "tone"
import { useSoundsStore } from '@/stores/store.js'
import { storeToRefs } from 'pinia'

const props = defineProps({
  synthSettings: {
    type: Object,
    required: true
  }
})
const soundsStore = useSoundsStore()
const { notes } = storeToRefs(soundsStore)

// const synth = new Tone.Synth().toDestination();
// const notes = ['a3','b3','c4','d4','e4','f4','g4']

const selectedNote = ref('c4')
const selectedLength = ref(0.5)
const selectedOctave = ref(3)

async function playSound(){
  await Tone.start()
  const synth = soundsStore.createSynth(props.synthSettings)
  synth.triggerAttackRelease(selectedNote.value, selectedLength.value)
}

</script>

<template>
  <div class="component">
    <div class="setting">
      <p>Note Length</p>
      <div class="slider-container">
        <v-slider 
          v-model="selectedLength"
          :min="0.1"
          :max="1.0"
          :step="0.1"
          hide-details>
          <template v-slot:append>
            <p style="width: 21px">{{ selectedLength }}</p>
          </template>
        </v-slider>
      </div>
    </div>
    <div class="setting">
      <label for="octave">Octave</label>
      <div class="slider-container">
        <v-slider
          :min="1"
          :max="5"
          :step="1"
          v-model="selectedOctave">
          <template v-slot:append>
            <p style="width: 21px">{{ selectedOctave }}</p>
          </template>
        </v-slider>
      </div>
    </div>
    <div class="setting">
      <v-select 
        label="Note" 
        v-model="selectedNote"
        :items="soundsStore.addOctaveNum(selectedOctave)"
        density="compact">
      </v-select>
    </div>
    <v-btn color="green" type="tonal" @click="playSound">Play Sound</v-btn>
  </div>    
</template>

<style scoped>

</style>
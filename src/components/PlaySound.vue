<script setup>
import { ref } from 'vue'
import * as Tone from "tone"
import { useSoundsStore } from '@/stores/store.js'
import { storeToRefs } from 'pinia'

const soundsStore = useSoundsStore()
const { notes } = storeToRefs(soundsStore)

const synth = new Tone.Synth().toDestination();
// const notes = ['a3','b3','c4','d4','e4','f4','g4']

const selectedNote = ref('c4')
const selectedLength = ref(0.5)
const selectedOctave = ref(3)

function playSound(){
  Tone.start()
  synth.triggerAttackRelease(selectedNote.value, selectedLength.value)
}

</script>

<template>
  <div class="component">
    <div class="setting">
      <label for="length">Note Length</label>
      <div class="length-slider">
        <input 
          name="length" 
          type="range" 
          v-model="selectedLength"
          min="0.1"
          max="1.0"
          step="0.1"/>
          <span class="live-label">{{ selectedLength + ' Second(s)' }}</span>
      </div>
    </div>
    <div class="setting">
      <label for="octave">Octave</label>
      <div class="octave-slider">
        <input
          name="octave"
          type="range"
          min="1"
          max="5"
          step="1"
          v-model="selectedOctave"/>
          <span class="live-label">{{ selectedOctave }}</span>
      </div>
    </div>
    <div class="setting">
      <label for="note">Note</label>
      <select name="note" v-model="selectedNote">
        <option v-for="note in soundsStore.addOctaveNum(selectedOctave)" :value="note" :key="note">{{ note }}</option>

      </select>
    </div>
    <button type="button" @click="playSound">Play Sound</button>
  </div>    
</template>

<style scoped>




</style>
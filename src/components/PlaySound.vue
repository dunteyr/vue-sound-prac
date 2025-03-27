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
function addOctaveNum(octave) {
  const newNotes = [...this.notes]
  for (let i=0; i<newNotes.length; i++){
    if(i<3){
      newNotes[i] += octave
    }
    else{
      newNotes[i] += (Number(octave)+1)
    }
  }
  return newNotes
}

</script>

<template>
  <div class="note-settings">
    <div class="note-length">
      <label for="length">Note Length</label>
      <div class="length-slider">
        <input 
          name="length" 
          type="range" 
          v-model="selectedLength"
          min="0.1"
          max="1.0"
          step="0.1"/>
          <span id="selected-length">{{ selectedLength + ' Second(s)' }}</span>
      </div>
    </div>
    <div class="scale-octave">
      <label for="octave">Octave</label>
      <div class="octave-slider">
        <input
          name="octave"
          type="range"
          min="1"
          max="5"
          step="1"
          v-model="selectedOctave"/>
          <span id="selected-octave">{{ selectedOctave }}</span>
      </div>
    </div>
    <div class="note">
      <label for="note">Note</label>
      <select name="note" v-model="selectedNote">
        <option v-for="note in addOctaveNum(selectedOctave)" :value="note" :key="note">{{ note }}</option>

      </select>
    </div>
    <button type="button" @click="playSound">Play Sound</button>
  </div>    
</template>

<style scoped>
.note-settings, .note-length, .note, .scale-octave {
  display: flex;
  flex-direction: column;
}
.note-length, .note, .scale-octave {
  margin: 10px;
}
button {
  margin: 20px;
  padding: 10px;
  background-color: #15EB55;
  border: none;
  border-radius: 20px;
}
button:hover {
  background-color: #03d341
}
button:active {
  background-color: #56ec83
}
#selected-length, #selected-octave {
  display: inline-block;
  width: 130px;
  text-align: center;
}
</style>
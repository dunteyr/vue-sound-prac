<script setup>
import { ref } from 'vue'
import * as Tone from "tone"

const synth = new Tone.Synth().toDestination();
const notes = ['a3','b3','c4','d4','e4','f4','g4']

const selectedNote = ref('c4')
const selectedLength = ref(0.5)

function playSound(){
  Tone.start()
  synth.triggerAttackRelease(selectedNote.value, selectedLength.value)
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
    <div class="note">
      <label for="note">Note</label>
      <select name="note" v-model="selectedNote">
        <option v-for="note in notes" :value="note">{{ note }}</option>

      </select>
    </div>
    <button type="button" @click="playSound">Play Sound</button>
  </div>
</template>

<style scoped>
.note-settings, .note-length, .note {
  display: flex;
  flex-direction: column;
}
.note-length, .note {
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
#selected-length {
  display: inline-block;
  width: 130px;
  text-align: center;
}
</style>

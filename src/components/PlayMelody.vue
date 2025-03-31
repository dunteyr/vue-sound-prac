<script setup>
import { ref } from 'vue'
import { useSoundsStore } from '@/stores/store.js'
import { storeToRefs } from 'pinia'
import * as Tone from "tone"

const props = defineProps({
    synthSettings: {
        type: Object,
        required: true
    }
})

const soundsStore = useSoundsStore()
const { scaleTypes, notes } = storeToRefs(soundsStore)

const selectedScaleType = ref(scaleTypes.value[0].name)
const selectedScaleNote = ref('c4')
const selectedMelodyLength = ref(1)

const storedMelody = ref([])

function createMelodyRhythm(length){
    
    let currentLength = 0
    // total length in 16th notes
    let totalLength = length * 16
    const notes = [
        {noteName: '16n', noteLength: 1},
        {noteName: '8n', noteLength: 2},
        {noteName: '4n', noteLength: 4}
    ]
    const melodyRhythm = []

    // until the requested length is full, add notes to the rhythm array
    while (currentLength < totalLength) {
        // add random note to rhythm array
        let randomNumber = Math.floor(Math.random() * notes.length)
        melodyRhythm.push(notes[randomNumber].noteName)
        // add the length of that note to the tally
        currentLength += notes[randomNumber].noteLength
    }
    return melodyRhythm
}
function createMelody(){
    // get the notes in the key and the random rhythm blueprint
    const key = soundsStore.createKey(selectedScaleType.value, selectedScaleNote.value)
    const melodyRhythm = createMelodyRhythm(selectedMelodyLength.value)
    const melody = []

    for(let i = 0; i < melodyRhythm.length; i++) {
        let randomNumber = Math.floor(Math.random() * key.length)
        melody.push({noteName: key[randomNumber], noteLength: melodyRhythm[i]})
    }

    // set storedMelody ref to the completed melody
    storedMelody.value = melody
    console.log(storedMelody.value)
}

function clearMelody(){
    storedMelody.value = []
    console.log(storedMelody.value)
}

function playMelody(){
    console.log('Play Melody')
    Tone.start()
    const synth = soundsStore.createSynth(props.synthSettings)

    for (let i = 0; i < storedMelody.value.length; i++) {
        console.log(storedMelody.value[i].noteName)
        synth.triggerAttackRelease(storedMelody.value[i].noteName, storedMelody.value[i].noteLength, Tone.now())

    }
}
</script>

<template>
    <div class="component">
        <div class="setting">
            <label for="scale-type">Scale Type</label>
            <select
                name="scale-type"
                v-model="selectedScaleType">
                <option v-for="scale in scaleTypes" :value="scale.name" :key="scale.name">{{ scale.name }}</option>
            </select>            
        </div>
        <div class="setting">
            <label for="scale-note">Scale Root</label>
            <select
                name="scale-note"
                v-model="selectedScaleNote">
                <option v-for="note in soundsStore.getAllNotes()" :value="note" :key="note">{{ note }}</option>

            </select>
        </div>
        <div class="setting">
            <label for="melody-length">Length (Measures)</label>
            <div class="slider-container">
                <input type="range" min="1" max="4" step="1" v-model="selectedMelodyLength"/>
                <span class="live-label">{{ selectedMelodyLength }}</span>
            </div>
        </div>
        <div class="sub-button-container">
            <button class="sub-button" type="button" @click="createMelody">Create Melody</button>
            <button class="sub-button" type="button" @click="clearMelody">Clear Melody</button>
        </div>
        <button class="main-button" type="button" @click="playMelody">Play Melody</button>
    </div>
</template>

<style scoped>
.sub-button-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 10px;
}
</style>
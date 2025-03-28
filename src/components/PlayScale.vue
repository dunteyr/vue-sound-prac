<script setup>
import { ref } from 'vue'
import { useSoundsStore } from '@/stores/store.js'
import { storeToRefs } from 'pinia'

const soundsStore = useSoundsStore()
const { scaleTypes, notes } = storeToRefs(soundsStore)

const selectedScaleType = ref(scaleTypes[0])
const selectedScaleNote = ref('c4')
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
        <button type="button">Play Scale</button>
    </div>
    

</template>

<style scoped>
</style>
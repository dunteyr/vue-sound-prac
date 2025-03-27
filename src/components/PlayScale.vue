<script setup>
import { ref } from 'vue'
import { useSoundsStore } from '@/stores/store.js'
import { storeToRefs } from 'pinia'

const soundsStore = useSoundsStore()
const { scaleTypes } = storeToRefs(soundsStore)

const selectedScaleType = ref(scaleTypes[0])
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

    </div>
    

</template>

<style scoped>
</style>
import { defineStore } from 'pinia'

export const useSoundsStore = defineStore('sounds', {
    state: () => ({
        notes: ['a','a#','b','c','c#','d','d#','e','f','f#','g','g#'],
    }),

    actions: {

    },
})
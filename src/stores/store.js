import { defineStore } from 'pinia'

export const useSoundsStore = defineStore('sounds', {
    state: () => ({
        notes: ['a','a#','b','c','c#','d','d#','e','f','f#','g','g#'],
        scaleTypes: [
            {name: 'Major', formula: [2,2,1,2,2,2,1]},
            {name: 'Minor', formula: [2,1,2,2,1,2,2]}
        ]
    }),

    actions: {

    },
})
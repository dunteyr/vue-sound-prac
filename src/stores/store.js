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
        addOctaveNum(octave){
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
        },
        getAllNotes(){
            const allNotes = []
            for(let i=1; i<6; i++){
                allNotes.push(...this.addOctaveNum(i))
            }
            return allNotes
        }

    },
})
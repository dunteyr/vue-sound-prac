import { defineStore } from 'pinia'

export const useSoundsStore = defineStore('sounds', {
    state: () => ({
        notes: ['a','a#','b','c','c#','d','d#','e','f','f#','g','g#'],
        scaleTypes: [
            {name: 'Ionian', formula: [2,2,1,2,2,2,1]},
            {name: 'Dorian', formula: [2,1,2,2,2,1,2]},
            {name: 'Phrygian', formula: [1,2,2,2,1,2,2]},
            {name: 'Lydian', formula: [2,2,2,1,2,2,1]},
            {name: 'Mixolydian', formula: [2,2,1,2,2,1,2]},
            {name: 'Aeolian', formula: [2,1,2,2,1,2,2]},
            {name: 'Locrian', formula: [1,2,2,1,2,2,2]},
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
        getAllNotes(overflow = 0){
            const allNotes = []
            for(let i=1; i<6 + overflow; i++){
                allNotes.push(...this.addOctaveNum(i))
            }
            return allNotes
        },
        createScale(type, rootNote){

            // get the formula for chosen scale type
            let scaleFormula = []
            for (const scaleType of this.scaleTypes) {
                if (scaleType.name === type){
                    scaleFormula = [...scaleType.formula]
                }
            }

            // get an array of all the notes but starting at rootNote
            const allNotes = this.getAllNotes(2)            
            const notes = allNotes.slice(allNotes.indexOf(rootNote))
            const scaleNotes = []

            // add notes to scaleNotes based on scale formula
            let stepsFromRoot = 0
            for (let i=0; i<8; i++){
                let noteToAdd = null
                if(i == 0){
                    noteToAdd = notes[i]
                }
                else{
                    stepsFromRoot += scaleFormula[i-1]
                    noteToAdd = notes[0 + stepsFromRoot]
                }
                scaleNotes.push(noteToAdd)               
            }
            return scaleNotes

        }

    },
})
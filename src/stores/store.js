import { defineStore } from 'pinia'
import * as Tone from 'tone'

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
        ],
        oscTypes: [
            "sine", "square", "sawtooth", "triangle"
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

        },
        //same as createScale but an octave higher and lower as well
        createKey(type, rootNote){
            // chatgpt shit to get octave from rest of string 
            let match = rootNote.match(/^([a-gA-G#b]+)(\d+)$/)
            let lowerNote = ''
            let higherNote = ''
            if(match){
                let pitch = match[1]; // 'c'
                let octave = parseInt(match[2], 10); // 3
                lowerNote = pitch + (octave - 1); // 'c2'
                higherNote = pitch + (octave + 1) // 'c4'
            }
            // create scales for the rootNote and the above and below it an octave
            // also remove last note in array (it is the root note up an octave)
            const lowerScale = this.createScale(type, lowerNote)
            lowerScale.splice(lowerScale.length - 1, 1)
            const baseScale = this.createScale(type, rootNote)
            baseScale.splice(baseScale.length - 1, 1)
            const higherScale = this.createScale(type, higherNote)
            higherScale.splice(higherScale.length - 1, 1)
            const key = [...lowerScale]
            key.push(...baseScale)
            key.push(...higherScale)

            return key

        },
        createSynth(synthSettings) {
            return new Tone.MonoSynth({
                oscillator: {
                    type: synthSettings.oscType
                },
                envelope: {
                    attack: 0.2,
                    decay: 0.001,
                    sustain: 1,
                    release: 0.2
                  },
                filter: {
                    Q: 0,
                    type: 'lowpass',
                    rolloff: -12
                },
                filterEnvelope: {
                    attack: 0.2,
                    decay: 0.001,
                    sustain: 1,
                    release: 0.2,
                    baseFrequency: 20000, // effectively disables filter shaping
                    octaves: 0
                },
                volume: synthSettings.vol
            }).toDestination()
        }

    },
})
<script setup>
import PlaySound from './components/PlaySound.vue'
import PlayScale from './components/PlayScale.vue'
import PlayMelody from './components/PlayMelody.vue'

</script>

<template>
  <PlaySound />
  <PlayScale />
  <PlayMelody />
</template>


<style>
/* global styles for the components above */

.component {
  display: flex;
  flex-direction: column;
  min-height: 35vh;
}

.setting {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

/* syles for spans that show the range slider value */
.live-label {
  display: inline-block;
  width: 130px;
  text-align: center;
}

.main-button {
  margin: 20px;
  padding: 10px;
  border: none;
  border-radius: 20px;
  margin-top:auto;
}

.sub-button {
  margin: 10px;
  padding: 10px;
  border: none;
  border-radius: 20px;
}

button {
  background-color: #15EB55;
}
button:hover {
  background-color: #03d341
}
button:active {
  background-color: #56ec83
}

</style>

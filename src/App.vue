<script setup>
import PlaySound from './components/PlaySound.vue'
import PlayScale from './components/PlayScale.vue'

</script>

<template>
  <PlaySound />
  <PlayScale />
</template>


<style>
/* global styles for the components above */

.component {
  display: flex;
  flex-direction: column;
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

</style>

<script setup>
import Timer from './components/Timer.vue'
import YouTubePlayer from './components/YouTubePlayer.vue';

import { ref } from 'vue';

const bgColor = ref('#FF5C5C');

</script>

<template>
  <div id='debug' class = "flex justify-content-center align-items-center h-screen" :style = "{backgroundColor: bgColor}">
    <YouTubePlayer/>
    <Timer v-model="bgColor"/>
  </div>
</template>

<style scoped>
</style>

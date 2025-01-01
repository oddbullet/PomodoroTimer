<script setup>
import Timer from './components/Timer.vue'
import YouTubePlayer from './components/YouTubePlayer.vue';

import { ref } from 'vue';

const bgColor = ref('#FF5C5C');

</script>

<template>
  <!-- <div id='debug' class = "flex justify-content-center align-items-center h-screen" :style = "{backgroundColor: bgColor}">
    <YouTubePlayer/>
    <Timer v-model="bgColor"/>
  </div> -->
  <div class='full' :style = "{backgroundColor: bgColor}">

    <div class="grid pt-1 pl-1">
      <div class="col-6">
        <YouTubePlayer class=""/>
      </div>
    </div>
   
    <div class="grid pt-8">
      <div class="col-12 col-offset-4">
        <Timer v-model="bgColor"/>
      </div>
    </div>


  </div>
</template>

<style scoped>
.full {
  height: 100vh;
  overflow: hidden;
}
</style>

<script setup>
import Timer from './components/Timer.vue'
import YouTubePlayer from './components/YouTubePlayer.vue';
import TodoList from './components/TodoList.vue';

import { ref } from 'vue';

const bgColor = ref('#FF5C5C');

</script>

<template>
  <div class='full' :style = "{backgroundColor: bgColor}">

    <div class="grid pt-1 pl-1">
      <div class="col-6">
        <YouTubePlayer class=""/>
      </div>
    </div>
   
    <div class="grid pt-8">
      <div class="col-6 col-offset-4">
        <Timer v-model="bgColor"/>
      </div>

      <div class="col-2">
        <TodoList/>
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

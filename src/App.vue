<script setup>
import Timer from './components/Timer.vue'
import YouTubePlayer from './components/YouTubePlayer.vue';
import TodoList from './components/TodoList.vue';

import { ref } from 'vue';

const bgColor = ref('#FF5C5C');

</script>

<template>
  <div class='full grid nested-grid' :style = "{backgroundColor: bgColor}">
    <div class="col-2">
      <div class="grid">
        <div class="col-10">
          <YouTubePlayer/>
        </div>
      </div>
    </div>

    <div class="col-8 align-content-center">
      <div class="grid">
        <div class="col-9 col-offset-2">
          <Timer v-model="bgColor"/>
        </div>
      </div>
    </div>

    <div class="col-2 align-content-center">
      <div class="grid">
        <div class="col-10">
          <TodoList/>
        </div>
      </div>
    </div>

  </div>

</template>

<style scoped>
.full {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>

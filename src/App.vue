<script setup>
import Timer from './components/Timer.vue'
import YouTubePlayer from './components/YouTubePlayer.vue';
import TodoList from './components/TodoList.vue';

import { ref } from 'vue';

const bgColor = ref('#FF5C5C');

</script>

<template>
  <div class='dashboard' :style = "{backgroundColor: bgColor}">
    <div class="youtube-section">
      <YouTubePlayer/>
    </div>

    <div class="timer-section">
      <div class="timer-container">
        <Timer v-model="bgColor"/>
      </div>
    </div>

    <div class="todolist-section">
      <div class="todolist-container">
          <TodoList/>
      </div>
    </div>

  </div>

</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  height: 100vh;
  width: 100vw;
}

.youtube-section {
  grid-column: 1;
  padding: 10px;
}

.timer-section {
  grid-column: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
    
.todolist-section {
  grid-column: 3;
  display: flex;
  justify-content: center;
  align-items: center;
}
    
.todolist-container {
  padding: 20px;
  width: 100%;
  max-width: 300px;
}
</style>

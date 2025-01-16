<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';

import { ref } from 'vue';

const backgroundColor = defineModel();

const timeDisplay = ref('25:00');

let focusTime = 1 * 60;
let shortTime = 5 * 60;
let longTime = 30 * 60;

let timerAmount = focusTime; //Seconds

let timeOn = ref(false);

let worker = new Worker(new URL('../worker.js', import.meta.url));

const startTimer = ()=> {
    if(timerAmount > 0) {
        timeOn.value = true;
        worker.postMessage(timerAmount);
    } else {
        return;
    }

    worker.onmessage = (e)=> {
        updateTimer(e.data);
        timerAmount = e.data;
        if(e.data == 0) {
            stopTimer();
        }
    };
};

const stopTimer = ()=> {
    if (timeOn.value) {
        let mySound = new Audio('sound/japan-eas-alarm.mp3')
        mySound.play()
    }

    timeOn.value = false;
    worker.terminate();
    worker = new Worker(new URL('../worker.js', import.meta.url));
};

const changeTab = (newTime, bgColor)=> {
    stopTimer();
    backgroundColor.value = bgColor;
    timerAmount = newTime;
    updateTimer(newTime);
}

const formatTime = (time)=> {
    let min = Math.floor(time / 60);
    let sec = Math.floor((time % 60));

    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

const updateTimer = (time)=> {
    timeDisplay.value = formatTime(time);
}

const openSetting = () => {
  alert('Open Setting');
}

</script>

<template>
    <div class = "flex flex-column">
      <div class="mb-1">
        <Button @click="openSetting" label="Setting"/>
      </div>
      <Card id='timer-container'>
          <template #header>
              <div class="flex justify-content-center align-content-item gap-2 pt-4">
                  <Button @click="changeTab(focusTime, '#FF5C5C')" label="Focus"/>
                  <Button @click="changeTab(shortTime, '#7684FF')" label="Short"/>
                  <Button @click="changeTab(longTime, '#3D3D3D')" label="Long"/>
              </div>
          </template>
          <template #title>
              <div class="flex justify-content-center align-content-item">
                  <h1> {{ timeDisplay }} </h1>
              </div>
          </template>
          <template #footer>
              <div class="flex justify-content-center gap-2 mt-1">
                  <Button v-if="!timeOn" @click="startTimer" label='Start'/>
                  <Button v-else @click="stopTimer" label='Pause'/>
              </div>
          </template>
      </Card>
    </div>
    
</template>

<style scoped>

#timer-container {
    width: 40rem;
    background-color: antiquewhite;
}

</style>
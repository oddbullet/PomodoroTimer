<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';

import { ref, watch } from 'vue';
import Setting  from '../components/Setting.vue';

const State = {
    FOCUS: 'focus',
    SHORT: 'short',
    LONG: 'long'
}

const BgColor = {
    FOCUS: '#FF5C5C',
    SHORT: '#7684FF',
    LONG: '#3D3D3D'
}

Object.freeze(State)
Object.freeze(BgColor)

const backgroundColor = defineModel();

const timeDisplay = ref('25:00');

// These hold the time.
let focusTime = ref(25);
let shortTime = ref(5);
let longTime = ref(15);

// Need to update timeramount when given new values.
let timerAmount = focusTime.value * 60; //Seconds

let state = State.FOCUS;

let timeOn = ref(false); // Maybe not needed
let settingOn = ref(false);

let worker = new Worker(new URL('../worker.js', import.meta.url));

watch(focusTime, (newTime) => {
    stopTimer();
    resetTimer(state);
    if (state == State.FOCUS) {
        timerAmount = focusTime.value * 60;
        updateTimer(timerAmount);
    }  
})

watch(shortTime, (newTime) => {
    stopTimer();
    resetTimer(state);
    if (state == State.SHORT) {
        timerAmount = shortTime.value * 60;
        updateTimer(timerAmount);
    }
})

watch(longTime, (newTime) => {
    stopTimer();
    resetTimer(state);
    if (state == State.LONG) {
        timerAmount = longTime.value * 60;
        updateTimer(timerAmount);
    }
})


const startTimer = ()=> {
    if(timerAmount > 0) {
        timeOn.value = true; // Maybe not needed
        worker.postMessage(timerAmount);
    } else {
        return;
    }

    worker.onmessage = (e)=> {
        updateTimer(e.data);
        timerAmount = e.data;
        if(e.data == 0) {
            let mySound = new Audio('sound/japan-eas-alarm.mp3')
            mySound.play()
            stopTimer();
            resetTimer(state);
        }
    };
};

const stopTimer = ()=> {
    timeOn.value = false; // Maybe not needed
    worker.terminate();
    worker = new Worker(new URL('../worker.js', import.meta.url));
};

const resetTimer = (state)=> {
    switch(state) {
        case State.FOCUS:
            timerAmount = focusTime.value * 60;
            break;
        case State.SHORT:
            timerAmount = shortTime.value * 60;
            break;
        case State.LONG:
            timerAmount = longTime.value * 60;
            break;
        default:
            alert('Reset Timer Error');
    }

    updateTimer(timerAmount);
}

const changeTab = (newState)=> {
    stopTimer();
    
    state = newState;

    switch(newState) {
        case State.FOCUS:
            backgroundColor.value = BgColor.FOCUS;
            timerAmount = focusTime.value * 60;
            break;
        case State.SHORT:
            backgroundColor.value = BgColor.SHORT;
            timerAmount = shortTime.value * 60;
            break;
        case State.LONG:
            backgroundColor.value = BgColor.LONG;
            timerAmount = longTime.value * 60;
            break;
        default:
            alert('Switch Timer Error');
    }

    updateTimer(timerAmount);
}

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor((time % 60));

    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

const updateTimer = (timerAmount)=> {
    timeDisplay.value = formatTime(timerAmount)
}

const toggleSetting = () => {
    settingOn.value = !settingOn.value
}

</script>

<template>
    <div class = "flex flex-column">
      <div class="mb-1">
        <Button @click="toggleSetting" label="Setting"/>
        <Setting v-if="settingOn"
        v-model:focus="focusTime"
        v-model:short="shortTime"
        v-model:long="longTime"
        v-model:setting="settingOn"
        />
      </div>
      <Card id='timer-container'>
          <template #header>
              <div class="flex justify-content-center align-content-item gap-2 pt-4">
                  <Button @click="changeTab(State.FOCUS)" label="Focus"/>
                  <Button @click="changeTab(State.SHORT)" label="Short"/>
                  <Button @click="changeTab(State.LONG)" label="Long"/>
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

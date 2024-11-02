<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';

import { ref } from 'vue';

const timeDisplay = ref('25:00');
let timerAmount = 25; // Minutes

let worker = new Worker(new URL('../worker.js', import.meta.url));

const startTimer = ()=> {
    let endTime = timerAmount * 60 + Date.now() / 1000;
    worker.postMessage(endTime);

    worker.onmessage = (e)=> {
        let min = Math.floor(e.data / 60);
        let sec = Math.floor((e.data % 60));

        timeDisplay.value = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };
};

const stopTimer = ()=> {
    worker.terminate();
    worker = new Worker(new URL('../worker.js', import.meta.url));
};

</script>

<template>
        <Card id='timer-container'>
            <template #title>
                <div class="flex justify-content-center align-content-item">
                    <h1> {{ timeDisplay }} </h1>
                </div>
            </template> 
            <template #footer>
                <div class="flex justify-content-center align-content-item gap-2 mt-1">
                    <Button @click="startTimer" label='Start'></Button>
                    <Button @click="stopTimer" label='Stop'></Button>
                    <Button label='Reset'></Button>
                </div>
            </template>
        </Card>
</template>

<style scoped>

#timer-container {
    width: 40rem;
    background-color: antiquewhite;
}

</style>
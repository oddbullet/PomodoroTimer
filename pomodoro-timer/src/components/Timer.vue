<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';

import { ref } from 'vue';

const timeDisplay = ref('25:00')
let timer = 25; // Minutes

const startTime = new Date();

const startTimer = ()=> {
    setInterval( ()=> {
        let currentTime = new Date();
        console.log(currentTime.getTime() - startTime.getTime())
    }
    , 1000)
}

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
                    <Button label='Stop'></Button>
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
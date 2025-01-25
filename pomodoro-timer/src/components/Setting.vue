<script setup>
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';

import {ref} from 'vue';

const focusTime = defineModel('focus');
const shortTime = defineModel('short');
const longTime = defineModel('long');

const submit = () => {
    return;
}

</script>

<template>
    <div class="card flex flex-wrap gap-4" id="setting">
        <div class="flex-auto">
            <label for="focus" class="font-bold block mb-2"> Focus </label>
            <InputNumber v-model="focusTime" inputId="focus" :useGrouping="false" fluid/>
        </div>
        <div class="flex-auto">
            <label for="short" class="font-bold block mb-2"> Short </label>
            <InputNumber v-model="shortTime" inputId="short" :useGrouping="false" fluid/>
        </div>
        <div class="flex-auto">
            <label for="long" class="font-bold block mb-2"> Long </label>
            <InputNumber v-model="longTime" inputId="long" :useGrouping="false" fluid/>
        </div>
        <!-- <Button @click="submit" label="Save"/> -->
    </div>
</template>

<style scoped>
#setting {
    background-color: white;
    /* height: 500px;
    width: 800px; */
    z-index: 99;
}
</style>
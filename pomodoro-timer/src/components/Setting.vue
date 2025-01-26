<script setup>
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';

import {ref} from 'vue';

const focusTime = defineModel('focus');
const shortTime = defineModel('short');
const longTime = defineModel('long');
const settingOn = defineModel('setting');

const save = () => {
    settingOn.value = !settingOn.value;
}

</script>

<template>
    <div class="fixed flex top-0 bottom-0 left-0 right-0 z-5 bg-black-alpha-20 align-items-center align-content-center justify-content-center" id="outer">
        <div id="inner">
            <div class="card flex flex-wrap gap-4">
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
            </div>
            <div class="flex justify-content-center">
                <Button class="mt-5" @click="save" label="Save"/>
            </div>
        </div>  
    </div>
</template>

<style scoped>

#inner {
    background-color: white;
    border-radius: 0.25rem;
    padding-top: 50px;
    padding-bottom: 40px;
    padding-left: 35px;
    padding-right: 35px;
}
</style>
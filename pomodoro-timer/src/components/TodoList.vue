<script setup>
import { ref } from 'vue';

import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';

const list = ref([
    {task: 'Make my bed', key: JSON.stringify(Date.now())},
    {task: 'Do coding project', key: JSON.stringify(Date.now() + 1)}
]);

const checked = ref();
const newItem = ref(false);

const addItem = (newTask) => {
    list.value.push({task: newTask, key: JSON.stringify(Date.now())});
    switchVal()
}

const doneItem = (key) => {
    list.value = list.value.filter((item) => item.key != key);
}

const switchVal = () => {
    newItem.value = !newItem.value
}

</script>

<template>
    <div class="todo-list">
        <div v-for="item in list" :key="item.key">
            <Checkbox v-model="checked" :inputId="item.key" name="item" :value="item.task" @click="doneItem(item.key)"/>
            <label :for="item.key">{{ item.task }}</label>
        </div>

        <input v-if="newItem"  @keyup.enter="addItem($event.target.value)"/>
        <Button v-else label="+ New Task" @click="switchVal"/>
    </div>
  
</template>

<style scoped>
</style>

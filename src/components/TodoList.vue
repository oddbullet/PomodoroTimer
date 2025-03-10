<script setup>
import { ref } from 'vue';

import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';

import Database from '../classes/Database.js';

const list = ref([
    // {task: 'Make my bed', key: JSON.stringify(Date.now())},
    // {task: 'Do coding project', key: JSON.stringify(Date.now() + 1)}
]);

const checked = ref();
const newItem = ref(false);

// const db = new Database();
// db.open().then(() => loadData()).catch((error) => console.error(error));

loadData()

const addItem = (newTask) => {
    let date = JSON.stringify(Date.now());
    let data = {task: newTask, key: date}

    list.value.push(data);

    try {
        // db.add('tasks', {task: newTask, taskID: date});
        localStorage.setItem("userTask", JSON.stringify(list.value))
    } catch (error) {
        console.error(`Error: ${error}`);
    } finally {
        toggleNewTaskButton()
    }
}

const doneItem = (key) => {
    list.value = list.value.filter((item) => item.key != key);
    // db.delete(key);
    localStorage.setItem("userTask", JSON.stringify(list.value))
}

const toggleNewTaskButton = () => {
    newItem.value = !newItem.value
}


function loadData() {
    // let data = db.getAll();

    const saveData = JSON.parse(localStorage.getItem("userTask"))

    saveData.forEach(task => {
        list.value.push(task)
    });

    // data.forEach((item) => console.log(item));
}


</script>

<template>
    <div class="flex flex-column border-round-md" id="todo-list">
        <div class="flex mt-1 ml-2 mb-1" v-for="item in list" :key="item.key"> 
            <Checkbox v-model="checked" :inputId="item.key" name="item" :value="item.task" @click="doneItem(item.key)"/>
            <label class="ml-1" :for="item.key">{{ item.task }}</label>
        </div>

        <div class="flex justify-content-center mt-1 mb-1">
            <input v-if="newItem"  @keyup.enter="addItem($event.target.value)"/>
            <Button v-else label="+ New Task" @click="toggleNewTaskButton"/>
        </div>
    </div>
  
</template>

<style scoped>
#todo-list {
    background-color:   #FF7F7F;
}
</style>

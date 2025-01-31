export default class DataBase {

    constructor() {
        this.db = null;
    }

    open() {
        let request = indexedDB.open('myDatabase', 1);

        request.onsuccess = function(event) {
            this.db = event.target.result;
            console.log('Database: ', this.db);
        }

        request.onerror = (event) => {
            console.error('Database fail to open: ', event.target.error);
        }

        request.onupgradeneeded = function(event) {
            this.db = event.target.result;
            
            if (!this.db.objectStoreNames.contains('tasks')) {
                const objectStore = this.db.createObjectStore('tasks', {keyPath: 'taskID'});

                objectStore.createIndex('taskID', 'taskID', {unique: true});
            }

            if (!this.db.objectStoreNames.contains('time')) {
                const objectStore = this.db.createObjectStore('time', {keyPath: 'name'});

                objectStore.createIndex('name', 'name', {unique: true});
            }
        }
    }

    // Test
    add(type, data) {
        const transaction = this.db.transaction([type], 'readwrite');

        transaction.onerror = (event) => {
            console.error('Cannot complete transaction');
        }

        transaction.oncomplete = (event) => {
            console.log("All done!")
        }

        const objectStore = transaction.objectStore(type);
        const request = objectStore.add(data);

        request.onerror = (event) => {
            console.error('Unable to add: ', type);
        }
    }

    put() {

    }

    // Test
    delete(taskID) {
        const request = this.db.transaction(['tasks'], 'readwrite')
        .objectStore('tasks')
        .delete(taskID);

        request.onerror = (event) => {
            console.error('Cannot delete task:', taskID);
        }
    }

    //Test
    retrieve(key) {
        const request = this.db.transaction('time', 'readonly')
        .objectStore('time')
        .get(key);

        request.onsuccess = () => {
            const time = request.result

            return time;
        }

        request.onerror = (event) => {
            console.error(`Error in getting time ${event}`);
        }
    }

    // Test
    getAll() {
        const request = this.db.transaction('tasks', 'readonly')
        .objectStore('tasks')
        .getAll();

        request.onsuccess = () => {
            const tasks = request.result;
    
            console.table(tasks)
    
            return tasks;
        }

        request.onerror = (event)=> {
            console.error(`Error to get all tasks: ${event}`)
        }
    }

    
    updateVersion() {

    }
}

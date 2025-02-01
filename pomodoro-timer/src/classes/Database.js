export default class DataBase {

    constructor() {
        this.db = null;
    }

    open() {
        return new Promise((resolve, reject) => {
            let request = indexedDB.open('myDatabase', 1);

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve('success');
                // console.log('Database: ', this.db);
            }
    
            request.onerror = (event) => {
                console.error('Database fail to open: ', event.target.error);
                reject(false);
            }
    
            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
    
                console.log('Here 2: ', this.db)
                
                if (!this.db.objectStoreNames.contains('tasks')) {
                    const objectStore = this.db.createObjectStore('tasks', {keyPath: 'taskID'});
    
                    objectStore.createIndex('taskID', 'taskID', {unique: true});
                }
    
                if (!this.db.objectStoreNames.contains('time')) {
                    const objectStore = this.db.createObjectStore('time', {keyPath: 'name'});
    
                    objectStore.createIndex('name', 'name', {unique: true});
                }
            }
        });
    }

    add(type, data) {

        if(this.db == null) {
            console.error('Database is not initialize!');
            return;
        } else {
            console.log('Database Loaded Add: ', this.db);
        }

        const transaction = this.db.transaction(type, 'readwrite');

        const objectStore = transaction.objectStore(type);
        const request = objectStore.add(data);

        transaction.onerror = (event) => {
            console.error(`Cannot complete transaction: ${event.target.error}`);
        }

        transaction.oncomplete = () => {
            console.log("All done!");
        }

        request.onerror = () => {
            console.error('Unable to add: ', type);
        }
    }

    put() {

    }

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
        if(this.db == null) {
            console.error('Database is not initialize!');
            console.log(this.db);
            return;
        } else {
            console.log('Database loaded getALL')
        }

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

    deleteDataBase() {
        // window.indexedDB.deleteDatabase("myDatabase");
    }
}

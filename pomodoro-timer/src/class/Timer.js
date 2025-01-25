/**
 * Keep track of timer.
 * @param  {Number} time Time in minutes
 */
export class Timer {
    constructor(time) {
        this.time = time * 60;
        this.copyTime = this.time;
        this.worker = new Worker(new URL('../worker.js', import.meta.url));
    }

    start() {
        this.worker.postMessage(this.time);

        this.worker.onmessage = (event)=> {
            this.time = event.data;
            if(event.data == 0) {
                stop();
            }
        };
    }

    run() {

    }
        

    stop() {
        this.worker.terminate()
        this.worker = new Worker(new URL('../worker.js', import.meta.url));
    }

    reset() {

    }

    updateTime(newTime) {
        this.time = newTime * 60;

    }

    currentTime() {
        return this.time;
    }
}

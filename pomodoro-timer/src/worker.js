const startTime = Date.now();

self.onmessage = (endTime)=> {
    setInterval( ()=> {
        let remainder = endTime.data - (Date.now() / 1000)
        self.postMessage(remainder)
    }, 100);
};

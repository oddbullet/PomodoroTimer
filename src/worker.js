self.onmessage = (endTime)=> {
    let remainder = endTime.data
    setInterval( ()=> {
        remainder--;
        self.postMessage(remainder);
    }, 1000);
};

<script setup>
import { ref } from 'vue';

const embedURL = ref("https://www.youtube.com/embed/8fjRf8DiMYg?autoplay=0");
const videoID = ref();

// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url modified.
const getVideoId = (url) => {
    let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);

    if (match && match[2].length == 11) {
        videoID.value = match[2];
    } else {
        //error
        alert("Invalid URL");
    }

    document.getElementById("ytURL").value = "";
    embedURL.value = `https://www.youtube.com/embed/${videoID.value}?autoplay=0`;
}

</script>

<template>
    <div class="flex flex-column">
        <iframe class="border-round-top-sm" id="ytPlayer" title="player" type="text/html" width="400px" height="200px" frameborder="0" :src="embedURL"></iframe>
        <input class="border-round-bottom-sm" id="ytURL" type="text" @keyup.enter="getVideoId($event.target.value)" placeholder="Enter YouTube URL"/>
    </div>
</template>

<style scoped>
#ytURL {
    width: 400px;
}
</style>

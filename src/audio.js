let audioDom = document.createElement('audio');

let $audio={
    /**
     * 播放歌曲
     */
    play(src){
        audioDom.src =  src;
        audioDom.play();
    }
}

export default $audio
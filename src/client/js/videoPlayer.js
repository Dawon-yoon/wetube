const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let volumeValue=0.5;
video.volume= volumeValue;
let controlsTimeout=null;
let controlsMovementTimeout=null;

const handlePlayClick=(event)=>{
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};
const handlePause=()=>{playBtn.innerText="Play";}
const handlePlay=()=>{playBtn.innerText="Pause";}

const handleMute=(event)=>{
    if(video.muted){
        video.muted=false;
    }else{
        video.muted=true;
    }
    muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
    volumeRange.value=video.muted? 0 : volumeValue;
};

const handleVolumeChange=(event)=>{
    const {target:{value}}=event;
    if(video.muted){
        video.muted=false;
        muteBtn.innerText="Mute";
    }
    volumeValue=value;
    video.volume=value;

};
const formatTime=(seconds)=>new Date(seconds*1000).toISOString().substring(14,19);

const handleLoadedMetadata=()=>{
    totalTime.innerText=formatTime(Math.floor(video.duration));
    timeLine.max=Math.floor(video.duration);
}
const handleTimeUpdate=()=>{
    currentTime.innerText=formatTime(Math.floor(video.currentTime));
    timeLine.value=Math.floor(video.currentTime);
}
const handleTimeLineChange=(event)=>{
    const {target:{value},}=event;
    video.currentTime=value;    
}

const handleFullScreen=()=>{
    const fullscreen=document.fullscreenElement;
    if(fullscreen){
        document.exitFullscreen();
        fullScreenIcon.classList = "fas fa-expand";
    }else{
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
    }
    
}
const hideControls=()=>videoControls.classList.remove("showing");

const handleMouseMove=()=>{
    if(controlsTimeout){
        clearTimeout(controlsTimeout);
        controlsTimeout=null;
    }
    if(controlsMovementTimeout){
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout=null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout=setTimeout(hideControls,3000);
}

const handleMouseLeave=()=>{
    controlsTimeout= setTimeout(hideControls,3000); 
}

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

playBtn.addEventListener("click",handlePlayClick);
muteBtn.addEventListener("click",handleMute);
volumeRange.addEventListener("input",handleVolumeChange);
video.addEventListener("loadeddata",handleLoadedMetadata);
video.addEventListener("timeupdate",handleTimeUpdate);
video.addEventListener("ended",handleEnded);
timeLine.addEventListener("input",handleTimeLineChange);
fullScreenBtn.addEventListener("click",handleFullScreen);
videoContainer.addEventListener("mousemove",handleMouseMove);
videoContainer.addEventListener("mouseleave",handleMouseLeave);
video.addEventListener("click",handlePlayClick);

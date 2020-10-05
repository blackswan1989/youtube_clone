const videoContainer = document.getElementById("jsVideoPlayer")
const videoPlayer = document.querySelector("#jsVideoPlayer video")
const playBtn = document.getElementById("jsPlayButton")


function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play()
  } else {
    videoPlayer.pause()
  }
}

function init() {
  playBtn.addEventListener("click", handlePlayClick)
}

if (videoContainer) {
  init()
}


//NOTE https://developer.mozilla.org/ko/docs/Web/api/HTMLmediaelement
// HTMLMediaElement.paused 미디어 일시 정지 여부를 Boolean 값으로 반환합니다.
// HTMLMediaElement.play() 미디어를 재생합니다.
// HTMLMediaElement.pause() 미디어 재생을 일시 정지합니다.
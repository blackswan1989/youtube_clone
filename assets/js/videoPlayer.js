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

/* NOTE 코드 설명
자바스크립트 파일은 모든 페이지에 로드된다 footer 밑에 include되기 때문이다.
따라서 videoContainer가 없는 페이지에는 videoContainer.addEventListender(..)를 불러올 수 없기 때문에 에러가 발생 할 수 있다. 

그러므로 init()함수를 생성하고, if(videoContainer){}로 
videoContainer가 있으면 init()함수가 호출되도록 만들었다.
그리고 그 init함수 안에서 adding/findig변수를 사용하여
해당하는 element가 존재 하지 않으면 그 어떤 click event listener도 
발생되지 않도록(항상 체크 되도록 설정)하였다.
*/
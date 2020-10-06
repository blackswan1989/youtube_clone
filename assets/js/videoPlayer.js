const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumnBtn = document.getElementById("jsVolumnBtn")


function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    //if Play중일때 -> innerHTML로 'pause' icon을 넣어준다
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    //esle pause중일때 -> innerHTML로 'play' icon을 넣어준다
  }
}

function handleVolumnClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumnBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
  } else {
    videoPlayer.muted = true;
    volumnBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function init() {
  //해당 페이지에 있다는것을 체크하기 위함.
  playBtn.addEventListener("click", handlePlayClick);
  volumnBtn.addEventListener("click", handleVolumnClick);
}

if (videoContainer) {
  init();
}


//NOTE https://developer.mozilla.org/ko/docs/Web/api/HTMLmediaelement
//NOTE 속성(Properties)
// HTMLMediaElement.paused 미디어 일시 정지 여부를 Boolean 값으로 반환합니다.(read only:값을 바꿀 수 없음)
// HTMLMediaElement.muted 오디오 음소거 여부를 Boolean 값으로 반환합니다. 음소거라면 true 반대는 false 를 반환합니다.
//NOTE 방법, 방식(method)-메소드
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
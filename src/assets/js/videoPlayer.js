const {
  doc
} = require("prettier");

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

const registerView = () => {
  //split는 서로 나눠준다(콘솔에 window.location.href.split("4000")등을 입력해보자
  //.split("/videos/")[1]에서 "[1]"은 split된 두번째 것(id)을 선택하기 위함이다.
  /* (2) ["http://localhost:", "/videos/5f7be38929ef3b60fae5c0fe"]
      0: "http://localhost:"
      1: "/videos/5f7be38929ef3b60fae5c0fe" -> id */
  const videoId = window.location.href.split("/videos/")[1]
  fetch(`/api/${videoId}/view`, {
    method: "POST"
  })
}


// Video Player Play & Pause Part

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

// Video Player Volume Part

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
    volumeRange.value = videoPlayer.volume //unmute하면 원래 음량range로
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeRange.value = 0; //mute되면 range value값이 0이 되도록.
  }
}

// Video Player Full Screen Part

function exitFullScreen() {
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenBtn.addEventListener("click", goFullScreen)
  //For other browsers
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function goFullScreen() {
  //For other browsers
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", goFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen)
}


// Video Player Play Time Part

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

function setTotalTime() {
  //videoPlayer와 duration을 가져온 후 formatData에 값을 주고 String을 반환시켜준다.
  //그리고 totalTimeString을 totalTime안에 정의해준다.
  const totalTimeString = formatDate(videoPlayer.duration)
  totalTime.innerHTML = totalTimeString
  //setInterval은 current time을 시계처럼 매초마다 호출되도록 해준다.
  setInterval(getCurrentTime, 1000)
}

function handleEnded() {
  registerView()
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
  //event가 어디서 발생했는지 알아야한다. console.log로 event를 체크해보면 target이 확인되고 target안에서 value값을 찾을 수 있다. 따라서 event.target.value로 이벤트를 가져올 수 있게 된다. 
  //console.log(event.target.value);
  const {
    target: {
      value
    }
  } = event;
  videoPlayer.volume = value
  if (value >= 0.4) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
  } else if (value >= 0.1) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>'
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>'
  }
}


function init() {
  //해당 페이지에 있다는것을 체크하기 위함.
  videoPlayer.volumn = 0.5;
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
}

if (videoContainer) {
  init();
}


//NOTE https://developer.mozilla.org/ko/docs/Web/api/HTMLmediaelement
//? 속성(Properties)
// HTMLMediaElement.paused 미디어 일시 정지 여부를 Boolean 값으로 반환합니다.(Read only:값을 바꿀 수 없음)
// HTMLMediaElement.muted 오디오 음소거 여부를 Boolean 값으로 반환합니다. 음소거라면 true 반대는 false 를 반환합니다.
// HTMLMediaElement.currentTime 현재 재생 시점을 초 단위로 표현한 double값입니다. 이 값을 세팅하여 재생 시점을 변경할 수 있습니다.
// HTMLMediaElement.duration(Read only) 미디어의 전체 길이를 초 단위로 double 값으로 반환합니다. 재생 가능한 미디어가 없을 경우 0을 반환합니다.

//? 방법, 방식(method)-메소드
// HTMLMediaElement.play() 미디어를 재생합니다.
// HTMLMediaElement.pause() 미디어 재생을 일시 정지합니다.

//NOTE https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
//NOTE https://developer.mozilla.org/en-US/docs/Web/API/Document/exitFullscreen
//? Element.requestFullscreen() & Document.exitFullscreen()
//play나 mute처럼 if & esle가 가능한 기능은 제공되지 않기 때문에 풀스크린(requestFullscreen) 확대(expand) 기능을 만들었다가, 다시 반대로 축소해서(compress) 나가는 기능(exitFullscreen)을 만들어야 한다.
//webkit : 크롬에서 완전한 지원이 되지 않아 추가 입력. (webkitRequestFullscreen, webkitExitFullscreen)

/* NOTE 코드 설명
자바스크립트 파일은 모든 페이지에 로드된다 footer 밑에 include되기 때문이다.
따라서 videoContainer가 없는 페이지에는 videoContainer.addEventListender(..)를 불러올 수 없기 때문에 에러가 발생 할 수 있다. 

그러므로 init()함수를 생성하고, if(videoContainer){}로 
videoContainer가 있으면 init()함수가 호출되도록 만들었다.
그리고 그 init함수 안에서 adding/findig변수를 사용하여
해당하는 element가 존재 하지 않으면 그 어떤 click event listener도 
발생되지 않도록(항상 체크 되도록 설정)하였다.
*/
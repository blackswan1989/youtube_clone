"use strict";

//TODO Upload Page의 Video Record기능
//media를 user로 부터 얻어와서 video에 넣어준다.
var _require = require("prettier"),
    doc = _require.doc;

var recorderContainer = document.getElementById("jsrecorderContainer");
var recordBtn = document.getElementById("jsRecordBtn");
var videoPreview = document.getElementById("jsRecordVideoPreview");
var streamObject; //모든 함수에서 접근이 가능하도록 선언

var videoRecorder;

var handleVideoData = function handleVideoData(event) {
  //console.log(event);
  var videoFile = event.data;
  var link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

function stopStreamedVideo(videoElem) {
  var stream = videoElem.srcObject;
  var tracks = stream.getTracks();
  tracks.forEach(function (track) {
    track.stop();
  });
  videoElem.srcObject = null;
}

var stopRecording = function stopRecording() {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  stopStreamedVideo(videoPreview);
  recordBtn.innerHTML = '<i class="fas fa-play-circle"></i> Start Recording';
};

var startRecording = function startRecording() {
  //console.log(streamObject)
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start(); //videoRecorder.start(1000) //()안에 1000(1초)를 넣어보면 매초 콘솔에 event.data가 출력되는 것을 확인 할 수 있다. but 구현하는 기능은 레코딩이 모두 끝났을때(stop recording) 데이터를 얻는것.
  //console.log(videoRecorder)

  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);
};

var getVideo = function getVideo() {
  var stream;
  return regeneratorRuntime.async(function getVideo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
              width: 1280,
              height: 720
            }
          }));

        case 3:
          stream = _context.sent;
          //console.log(stream)
          videoPreview.srcObject = stream;
          videoPreview.muted = true;
          videoPreview.play();
          recordBtn.innerHTML = '<i class="fas fa-stop-circle"></i> Stop Recording';
          streamObject = stream;
          startRecording(); //스트리밍한 비디오를 저장하기 위해 stream을 argument로 하는 startRecording함수를 호출한다.

          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          //media에 접근 권한을 통과하지 못한 경우 (record를 할 수 없는 경우)
          recordBtn.innerHTML = "😰 Can't Record";

        case 15:
          _context.prev = 15;
          //finally는 try나 catch 둘 중 하나가 실행되면 작동한다.
          recordBtn.removeEventListener("click", getVideo);
          return _context.finish(15);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12, 15, 18]]);
};

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
  //recorderContainer일때만 init함수를 호출하도록
  init();
} //https://developer.mozilla.org/ko/docs/Web/API/MediaDevices
//MediaDevices 인터페이스는 카메라, 마이크, 공유 화면 등 현재 연결된 미디어 입력 장치로의 접근 방법을 제공하는 인터페이스입니다. 다르게 말하자면, 미디어 데이터를 제공하는 모든 하드웨어로 접근할 수 있는 방법입니다.
//https://developer.mozilla.org/ko/docs/Web/API/MediaDevices/getUserMedia
//MediaDevices.getUserMedia() 사용자에게 권한을 요청한 후, 시스템의 카메라와 오디오 각각 혹은 모두 활성화하여, 장치의 입력 데이터를 비디오/오디오 트랙으로 포함한 MediaStream을 반환합니다.
//https://developer.mozilla.org/ko/docs/Web/API/MediaRecorder
//MediaRecorder() MediaStream Recording API 의 MediaRecorder인터페이스는 미디어를 쉽게 기록하는 기능을 제공합니다. 생성자를 사용하여 생성됩니다.
//to 레코드가 MediaRecorder주어지면 새 개체를 만듭니다 MediaStream. 컨테이너의 MIME 유형 (예 : "video/webm"또는 "video/mp4"), 오디오 및 비디오 트랙의 비트 전송률 또는 단일 전체 비트 전송률 설정과 같은 작업을 수행하는 옵션을 사용할 수 있습니다 .
//! videoRecorder.js:28 Uncaught TypeError: Failed to construct 'MediaRecorder': parameter 1 is not of type 'MediaStream'. at HTMLButtonElement.startRecording
//TODO Upload Page의 Video Record기능
//media를 user로 부터 얻어와서 video에 넣어준다.

const recorderContainer = document.getElementById("jsrecorderContainer")
const recordBtn = document.getElementById("jsRecordBtn")
const videoPreview = document.getElementById("jsRecordVideoPreview")

const startRecording = async () => {
  //await사용 이유는 user가 우리에게 대답을 할 때까지 기다리기 위해서(media에 접근할수있게 해줄지 아닐지 기다린 후 진행되어야 하기 때문이다.)
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 1280,
        height: 720
      }
    });
    //console.log(stream)
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
  } catch (error) {
    //media에 접근 권한을 통과하지 못한 경우 (record를 할 수 없는 경우)
    recordBtn.innerHTML = "😰 Can't Record"
    recordBtn.removeEventListener("click", startRecording)
  }
}


function init() {
  recordBtn.addEventListener("click", startRecording)
}

if (recorderContainer) {
  //recorderContainer일때만 init함수를 호출하도록
  init()
}

//https://developer.mozilla.org/ko/docs/Web/API/MediaDevices
//MediaDevices 인터페이스는 카메라, 마이크, 공유 화면 등 현재 연결된 미디어 입력 장치로의 접근 방법을 제공하는 인터페이스입니다. 다르게 말하자면, 미디어 데이터를 제공하는 모든 하드웨어로 접근할 수 있는 방법입니다.

//https://developer.mozilla.org/ko/docs/Web/API/MediaDevices/getUserMedia
//MediaDevices.getUserMedia() 사용자에게 권한을 요청한 후, 시스템의 카메라와 오디오 각각 혹은 모두 활성화하여, 장치의 입력 데이터를 비디오/오디오 트랙으로 포함한 MediaStream을 반환합니다.
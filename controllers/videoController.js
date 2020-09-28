import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  //async를 추가하면 javascript에게 function이 끝날때까지 기다려달라는 것과 같다. 즉 해당 과정이 끝나야 다음 실행이 이어진다.
  //"Video.find({})"는 Database에 있는 모든 Video를 가지고 오게 한다.
  //await는 async함수와 함께 사용해야만 한다.
  //try와 catch는 error가 생기면 화면은 띄워주되 console.log로 넘겨준다.
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    //.sort는 정렬해주는 함수이다 -1을 부여한것은 위아래 순서를 바꾸겠다는 의미이다.
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  //console.log(req.query.term); //example&something=lalalala&filter=price 이런 식으로 추가 입력해도 페이지 표시가 가능해진다(콘솔로도 확인 가능).
  //const searchingBy = req.query.turm
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
    // $regex: searchingBy는 완전히 동일한 단어가 아닌 검색한 단어를 포함하는 모든 것을 찾기 위함이고, $options: "i"는 검색시 대소문자 구분을 하지 않게 해준다.
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  // console.log(body, file);
  //console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

// Video Detail

export const videoDetail = async (req, res) => {
  //console.log(req.params);
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id).populate("creator");
    console.log(video);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    //console.log(error);
    res.redirect(routes.home);
  }
};

// Edit Video

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id)); //edit후 다시 videoDetail페이지로 redirect시켜준다.
  } catch (error) {
    res.redirect(routers.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {}
  res.redirect(routes.home);
};

//각각의 controller들
//search는 req,res를 함수의 인자로 입력받고 res.send("Search")로 리턴한다. 따라서 home과 search둘다 export해주어야 한다.
//res.send에서 pug설치 후 views폴더의 pug들을 위해 res.render로 작성
//render함수의 첫번째 인자는 템플릿이고, 두번째 인자는 템플릿에 추가할 정보가 담긴 객체이다.
//예시) res.render("Home", { pageTitle: "Home" });

import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  //async를 추가하면 javascript에게 function이 끝날때까지 기다려달라는 것과 같다. 즉 해당 과정이 끝나야 다음 실행이 이어진다.
  //"Video.find({})"는 Database에 있는 모든 Video를 가지고 오게 한다.
  //await는 async함수와 함께 사용해야만 한다.
  //try와 catch는 error가 생기면 화면은 띄워주되 console.log로 넘겨준다.
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = (req, res) => {
  //console.log(req.query.term); //example&something=lalalala&filter=price 이런 식으로 추가 입력해도 페이지 표시가 가능해진다(콘솔로도 확인 가능).
  //const searchingBy = req.query.turm
  const {
    query: { term: searchingBy },
  } = req;
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
  });
  // console.log(body, file);
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });

//각각의 controller들
//search는 req,res를 함수의 인자로 입력받고 res.send("Search")로 리턴한다. 따라서 home과 search둘다 export해주어야 한다.
//res.send에서 pug설치 후 views폴더의 pug들을 위해 res.render로 작성
//render함수의 첫번째 인자는 템플릿이고, 두번째 인자는 템플릿에 추가할 정보가 담긴 객체이다.
//예시) res.render("Home", { pageTitle: "Home" });

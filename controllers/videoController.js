export const home = (req, res) => res.render("Home", { pageTitle: "Home" });

export const search = (req, res) => {
  //console.log(req.query.term); //example&something=lalalala&filter=price 이런 식으로 추가 입력해도 페이지 표시가 가능해진다(콘솔로도 확인 가능).
  //const searchingBy = req.query.turm
  const {
    query: { term: searchingBy },
  } = req;
  console.log(searchingBy);
  res.render("Search", { pageTitle: "Search", searchingBy });
};

export const upload = (req, res) =>
  res.render("Upload", { pageTitle: "Upload" });

export const videoDetail = (req, res) =>
  res.render("Video Detail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) =>
  res.render("Edit Video", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("Delete Video", { pageTitle: "Delete Video" });

//각각의 controller들
//search는 req,res를 함수의 인자로 입력받고 res.send("Search")로 리턴한다. 따라서 home과 search둘다 export해주어야 한다.
//res.send에서 pug설치 후 views폴더의 pug들을 위해 res.render로 작성
//render함수의 첫번째 인자는 템플릿이고, 두번째 인자는 템플릿에 추가할 정보가 담긴 객체이다.
//예시) res.render("Home", { pageTitle: "Home" });

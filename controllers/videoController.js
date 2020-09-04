export const home = (req, res) => res.render("Home"); //home controller
//res.send에서 pug설치 후 views폴더의 pug들을 위해 res.render로 작성
export const search = (req, res) => res.render("Search"); //search는 req,res를 함수의 인자로 입력받고 res.send("Search")로 리턴한다. 따라서 home과 search둘다 export해주어야 한다.
export const upload = (req, res) => res.render("Upload");
export const videoDetail = (req, res) => res.render("Video Detail");
export const editVideo = (req, res) => res.render("Edit Video");
export const deleteVideo = (req, res) => res.render("Delete Video");

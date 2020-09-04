export const home = (req, res) => res.send("Home"); //home controller
export const search = (req, res) => res.send("Search"); //search는 req,res를 함수의 인자로 입력받고 res.send("Search")로 리턴한다. 따라서 home과 search둘다 export해주어야 한다.
export const videos = (req, res) => res.send("Videos");
export const upload = (req, res) => res.send("Upload");
export const videoDetail = (req, res) => res.send("Video Detail");
export const editVideo = (req, res) => res.send("Edit Video");
export const deleteVideo = (req, res) => res.send("Delete Video");

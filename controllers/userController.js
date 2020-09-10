import routes from "../routes";

//- Join Part
export const getJoin = (req, res) => {
  // join page를 보여준다.
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = (req, res) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400); //- password가 일치하지 않으면 코드400(Bad Request) 발동.
    console.log(req.body); //- 콘솔에 Join now 정보 출력시켜준다. 추가로 (pssword가 일치하지 않으면 콘솔에 400(Bad Request)띄워준다. )
    res.render("join", { pageTitle: "Join" }); //- 다시 join화면을 띄워준다
  } else {
    //- password가 일치하면 로그인이 되어 redirect를 해준다.
    //- To Do: Register User
    //- To Do: Log user in
    res.redirect(routes.home);
  }
};

//- Login Part
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

//- Log out Part
export const logout = (req, res) => {
  // To Do: Process Log Out
  res.redirect(routes.home);
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

/*
get은 서버 등의 resource에서 데이터를 가져오는 메소드이고,
post는 생성/업로드한 리소스를 서버로 보내는 메소드. 
*/

/* arrow founction
function join() {
  return true;
}

return true는 => 과 같다.
return은 {}안에 적어주어야한다.
*/

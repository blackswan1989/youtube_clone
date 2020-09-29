import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// Join Part
export const getJoin = (req, res) => {
  // join page를 보여준다.
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400); //- password가 일치하지 않으면 코드400(Bad Request) 발동.
    console.log(req.body); //- 콘솔에 Join now 정보 출력시켜준다. 추가로 (pssword가 일치하지 않으면 콘솔에 400(Bad Request)띄워준다. )
    res.render("join", { pageTitle: "Join" }); //- 다시 join화면을 띄워준다
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      //console.log(error);
      res.redirect(routes.home);
      //- password가 일치하면 로그인이 되어 redirect를 해준다.
    }
  }
};

// Login Part
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  //failureRedirect는 로그인이 실패하면 routes.login으로 가게 만들어주었다.
  failureRedirect: routes.login,
  //successRedirect는 로그인 성공시 home 화면을 바로 띄워준다.
  successRedirect: routes.home,
});

// Github Login
export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  //console.log(accessToken, refreshToken, profile, cb);
  const {
    _json: { id, avatar_url, name }, //* email 삭제
  } = profile;
  const { value: email } = profile.emails.filter((item) => item.primary)[0]; //* github email이 private 설정되어있어도 가입되도록 코드추가
  try {
    const user = await User.findOne({ email });
    //console.log(user);
    if (user) {
      user.githubId = id;
      // user.avatarUrl = avatar_url;
      // user.name = name;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

// Log out Part
export const logout = (req, res) => {
  req.logout(); //Process Log Out
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
  //req.user는 현재 로그인 된 사용자이다.
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id); //.populate("videos");
    //console.log(user);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};

/* NOTE github website(auth)
github website(auth) -> /auth/github/callback
githubLoginCallback(profile) => cb(error, user)
  error -> user is not exist -> The end
  user exist  -> cookie = makeCookie(user) 
              -> savedCooke = saveCookie(cookie) 
              -> sendCookie(savedCookie)
*/

/* NOTE get & post method
get은 서버 등의 resource에서 데이터를 가져오는 메소드이고,
post는 생성/업로드한 리소스를 서버로 보내는 메소드. 
*/

/* NOTE arrow founction
function join() {
  return true;
}

return true는 => 과 같다.
return은 {}안에 적어주어야한다.
*/

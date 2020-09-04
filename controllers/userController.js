export const join = (req, res) => res.render("Join");
export const login = (req, res) => res.render("Login");
export const logout = (req, res) => res.render("Logout");
export const userDetail = (req, res) => res.render("User Detail");
export const editProfile = (req, res) => res.render("Edit Profile");
export const changePassword = (req, res) => res.render("Change Password");

/* arrow founction

function join() {
  return true;
}

return true는 => 과 같다.
return은 {}안에 적어주어야한다.
*/

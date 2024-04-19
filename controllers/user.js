const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");
async function handelUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
}
async function handelUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid email or password",
    });

  const token = setUser(user);
  res.cookie("token", token);
  console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.url}`);
  console.log(req.user,"user generated");
  // return res.json({token});
  return res.redirect("/");
}
module.exports = { handelUserSignUp, handelUserLogin };

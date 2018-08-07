const getUser = (req, res) => {
  console.log("yo");
  if (req.user) res.status(200).json(req.user);
  else res.status(403).json({ message: "Not Logged In" });
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("http://localhost:3000/#/");
    // res.redirect("/#/");
  });
};

module.exports = {
  getUser,
  logout
};

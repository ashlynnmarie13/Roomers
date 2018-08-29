const getUser = (req, res) => {
  console.log("yo");
  if (req.user) res.status(200).json(req.user);
  else res.status(403).json({ message: "Not Logged In" });
};

const logout = (req, res) => {
  console.log("im out");
  req.session.destroy(() => {
    res.redirect(process.env.LOGOUT_REDIRECT);
  });
};

module.exports = {
  getUser,
  logout
};

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json("Unauthorized");
  }
};
const object = { isLoggedIn };
module.exports = object;

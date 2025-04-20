const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

function createtoken(user) {
  const payload = {
    _id: user._id,
    Fullname: user.Fullname,
    email: user.email,
    profileimageURL: user.profileimageURL,
    role: user.role,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  return token;
}

function validatetoken(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}

module.exports = {
  createtoken,
  validatetoken,
};

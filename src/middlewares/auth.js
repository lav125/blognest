const { validatetoken } = require("../service/auth");

function checkforAuth(cookieName) {
  return (req, res, next) => {
    const tokencookieValue = req.cookies[cookieName];

    if (!tokencookieValue) {
      return next();
    }

    try {
      const userPayload = validatetoken(tokencookieValue);

      req.user = userPayload;
    } catch (error) {
      req.user = null;
    }

    next();
  };
}

module.exports = {
  checkforAuth,
};

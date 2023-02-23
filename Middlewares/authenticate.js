const jwt = require("jsonwebtoken");

const KEY = process.env.SecretKey;

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token)
  if (token) {
    const decoded = jwt.verify(token, KEY);
    if (decoded) {
      const userID = decoded.userID;
      // console.log(decoded,userID)
      // req.body.userID=userID
      next();
    } else {
      res.send("Please Login first");
    }
  } else {
    res.send("Please Login First");
  }
};

module.exports = {
  authenticate,
};

const jwt = require("jsonwebtoken")

exports.requireSignIn = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, "090480439");
    console.log(user);
    req.user = user;
    next();
}
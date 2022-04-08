const {User} = require("../models/user");
const jwt = require("jsonwebtoken");
const path = require("path");
const envPath = path.join(__dirname, "../.env");
require("dotenv").config({ path: envPath });
const {Unauthorized} = require("http-errors");

const { SECRET_KEY } = process.env;
console.log(SECRET_KEY);

async function authorizationMiddleware(req, res, next) {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    try {
        if (bearer !== "Bearer") {
            throw new Unauthorized("Not authorized");
        }
        const { id } = jwt.verify(token, SECRET_KEY); // checking token
        const user = await User.findById(id); // searching user by id
        if (!user || !user.token) {  // if not user with such id and user doesnt have token (didnt login)
            throw new Unauthorized("Not authorized");  // means that user cant get the requested trace (nincs multipass :( ))
        }
        req.user = user; // setting up user
        next(); //going further
    }
    catch(error) {
        if (error.message === "Invalid signature") {
            error.status = 401;
        }
        next(error);
    }
}

module.exports = authorizationMiddleware;
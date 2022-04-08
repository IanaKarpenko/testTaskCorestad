const {User} = require("../../models/user");
const jwt = require("jsonwebtoken");
const path = require("path");
const envPath = path.join(__dirname, "../../.env");
require("dotenv").config({ path: envPath });
const {Unauthorized, NotFound} = require("http-errors");
const {SECRET_KEY} = process.env;

async function login(req, res) {
    const {email, password} = req.body;
    console.log(email);
    const user = await User.findOne({email});
    if (!user) {
        throw new NotFound('No user with this email');
    }
    if (!user.verifyPassword(password)) {
        throw new Unauthorized('Password is invalid');
    }
    const payload = {
        id: user._id
    }

    const token = await jwt.sign(payload, SECRET_KEY, {expiresIn: "2h"});
    await User.findByIdAndUpdate(user._id, {token});
    res.status(200).json({
        status: "success",
        data: {
            user: {
                email,
                token
            }
        }
    })
}

module.exports = login;


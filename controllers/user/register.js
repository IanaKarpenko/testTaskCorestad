const {User} = require("../../models/user");
const {Conflict} = require("http-errors");
const { json } = require("body-parser");

async function register(req, res) {
    const {email, password} = req.body; // getting userdata 
    const user = await User.findOne({email});
    console.log(user);
    if (user) {
        throw new Conflict('This email is already in use');   
    }
    const newUser = new User({email});
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
        status: "success",
        data: {
            user: { email, token: null }
        }
    })
}

module.exports = register;
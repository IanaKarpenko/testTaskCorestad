const {Schema, model} = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = Schema({
    email: {
        type: String,
        required: [true, "field email is required in 'user' table"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "field parrsord is required in 'user' table"]
    },
    token: {
        type: String
    }
});

const userJoiSchema = Joi.object({
    email: Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required(),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required()
});

userSchema.methods.setPassword = function(password) {
    this.password = bcrypt.hashSync(password, 10);
}

userSchema.methods.verifyPassword = function(password) {
    const result = bcrypt.compareSync(password, this.password);
    console.log(result);
    return result;
}

const User = model("user", userSchema);

module.exports = {
    User,
    userJoiSchema
}
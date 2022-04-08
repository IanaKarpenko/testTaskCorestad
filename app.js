//TODO endpoints
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const userRouter = require("./routes/api/user"); // routes for User
const randomRouter = require("./routes/api/random"); // random secured route(s)

const app = express();

const formatLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatLogger));
app.use(cors());
app.use(express.json())

app.use("/api/user", userRouter);
app.use("/api/random", randomRouter);

app.use((req, res) => {
    res.status(404).json({
        message: "Not found"
    })
});

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    res.status(status).json({
        message: err.message
    })
})

module.exports = app







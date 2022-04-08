const asyncHandler = require('express-async-handler');

function controlslWrapper(control) {
    return asyncHandler(async function (req, res, next) {
        try {
            await control(req, res, next);
        } catch (error) {
            next(error);
        }
    })
}

module.exports = controlslWrapper;
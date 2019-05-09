// Ensure EJS has access to variables and avoid having to pass them every render call
module.exports = (req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.error = false;
    next();
};

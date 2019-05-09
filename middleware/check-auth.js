module.exports = (req, res, next) => {
    if (!req.session.user) {
        req.session.unauthedRoute = req.originalUrl;
        res.redirect('/auth/login');
    } else {
        next();
    }
};

const home = (req, res) => {
    res.render("home");
};

const about = (req, res) => {
    res.render("about");
};

const player = (req, res) => {
    res.render("game");
}

const isAuthenticated = (req, res, next) => {
    
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login"); 
};

module.exports = {home, about, player, isAuthenticated};
const bcrypt = require('bcryptjs');

const home = (req, res) => {
    res.render("home");
};

const about = (req, res) => {
    if(req.session.uid){
        res.render("about");
    }else{
        res.render("about", {layout: "withou_login", showLink: true});
        
    }
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
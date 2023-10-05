const home = (req, res) => {
    res.render("home");
};

const about = (req, res) => {
    res.render("about");
};

const player = (req, res) => {
    res.render("game");
}

module.exports = {home, about, player};
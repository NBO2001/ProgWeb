const express = require('express');
const logger = require('morgan');
const handlebars = require('express-handlebars')

const app = express();
const PORT = 3000;

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(logger("short"));

app.use("/imgs", [ express.static(`${__dirname}/../public/imgs`)])


app.get("/", (req, res) => {
    res.render("home");
});

app.get("/sobre", (req, res) => {
    res.render("about");
});

app.use((req, res) => {
    res.statusCode = 404;
    res.end("404!");
    });

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
})
const express = require('express');
const logger = require('morgan');
const handlebars = require('express-handlebars');
const sass = require('node-sass-middleware');
const router = require("./router/router.js");
const path = require('path');

const app = express();
const PORT = 3000;

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);


app.use(sass({
    src: path.join(__dirname, '../public/scss'),
    dest: path.join(__dirname, '../public/css'),
    outputStyle: 'compressed',
    prefix: '/css',
}));


app.use("/css", [
    express.static(`${__dirname}/../public/css`),
]);


app.use("/imgs", express.static(`${__dirname}/../public/imgs`));
app.use("/webfonts", express.static(`${__dirname}/../node_modules/@fortawesome/fontawesome-free/webfonts`))
app.use("/js", [
    express.static(`${__dirname}/../public/js`),
    express.static(`${__dirname}/../node_modules/bootstrap/dist/js/`),
]);

app.use(logger("short"));
app.use(router);

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
})
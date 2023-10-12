const express = require('express');
const logger = require('morgan');
const handlebars = require('express-handlebars');
const sass = require('node-sass-middleware');
const router = require("./router/router.js");
const path = require('path');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const session = require('express-session');
const uuid = require('uuid');

require('dotenv').config();

const app = express();

app.use(cookieParser());

app.use(session({
    genid: (req) => {
    return uuid.v4() // usamos UUIDs para gerar os SESSID
    },
    secret: 'Hi9Cf#mK98',
    resave: false,
    saveUninitialized: true
}));

app.engine("handlebars", handlebars.engine({
    helpers: require(`${__dirname}/views/helpers/helpers.js`)
}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

// Configuração do Multer
const upload = multer();

app.use(express.urlencoded({ extended: true }));

app.use(csurf({ cookie: true }));
app.use(upload.none());

app.use(express.json());


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

app.listen(process.env.PORT, () => {
    console.log(`Express app iniciada na porta ${process.env.PORT}.`);
})
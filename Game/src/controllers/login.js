const bcrypt = require('bcryptjs');
const models = require('../models/index');
const Curso = models.Curso;

const User = models.User;


async function login(req, res){
    
    if(req.session.uid){
        res.redirect('/');
    }else{
        res.render("login", {
            csrf: req.csrfToken(),
            layout: "withou_login"
        });
    }
}

async function authenticate(req, res){

    const data = req.body;

    const user = await User.findOne({
        where: {
            email: data.email
        }
    });
    
    if(user){
        bcrypt.compare(data.password, user.senha, (err, ok) => {
            if(ok){
                req.session.uid = user.id;
                res.status(200).redirect('/');
            }else{
                res.render('login', {
                    csrf: req.csrfToken(),
                    error: true,
                    msg: "login ou senha incorretos"
                });
            }
        });
        
    }else{
        res.render('login', {
            csrf: req.csrfToken(),
            error: true,
            msg: "login ou senha incorretos"
        });
    }
}

async function logout(req, res){
    req.session.destroy(function (err) {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });

}
async function singup(req, res){
    
    
    if(req.route.methods.get){
        const allCursos = await Curso.findAll({
            include: [{
                model: models.Area,
                attributes: ['nome'],
            }],
            order:[
                ['nome', 'ASC'],
                ['sigla', 'ASC'],   
            ],
            limit: 150
        });

        res.render('login/cadastro', {
            csrf: req.csrfToken(),
            layout: "withou_login",
            cursos: allCursos.map(cur => cur.toJSON())
        })
    }else{

        if(req.body.password === req.body.passwordverify && req.body.useTerms){

            try{
                const rounds = 2;
                

                bcrypt.genSalt(rounds, function(err, salt) {
                    bcrypt.hash(req.body.password,salt,async(err, hash) => {
                        try{
                            const userNew = await User.create({
                                nome: req.body.name,
                                email: req.body.email,
                                cursoId: req.body.curso,
                                senha: hash
                            });
    
                            if(userNew){
                                req.session.uid = userNew.id;
    
                                res.redirect('/');
                            }

                        }catch(e){
                            console.error(e);
                            res.redirect('/login');
                        }
                    });
                });

            }catch(e){
                res.render('login/cadastro', {
                    csrf: req.csrfToken(),
                    layout: "withou_login",
                    error: true,
                    errors: e
                })
            }

        }else{

            const allCursos = await Curso.findAll({
                include: [{
                    model: models.Area,
                    attributes: ['nome'],
                }],
                order:[
                    ['nome', 'ASC'],
                    ['sigla', 'ASC'],   
                ],
                limit: 150
            });
    
            
            res.render('login/cadastro', {
                csrf: req.csrfToken(),
                error: true,
                layout: "withou_login",
                user: req.body,
                cursos: allCursos.map(cur => cur.toJSON())
            })

        }

      
    }
}

module.exports = { login, authenticate, singup, logout };
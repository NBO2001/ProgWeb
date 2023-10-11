const models = require('../models/index');

const User = models.User;


async function login(req, res){
    
    res.render("login");
}

async function authenticate(req, res){

    const data = req.body;

    const user = await User.findOne({
        where: {
            email: data.email,
            senha: data.password
        }
    });
    
    if(user){
        res.status(200).redirect("/"); 
    }else{
        res.status(401).send(JSON.stringify({"Error": "Invalid credetials"}))
    }
}

module.exports = { login, authenticate };
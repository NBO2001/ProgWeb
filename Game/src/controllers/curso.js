const models = require("../models/index");
const Curso = models.Curso;

async function index (req, res) {

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
    res.render("curso", {cursos: allCursos.map(cur => cur.toJSON())});
};

async function read (req, res) {
    
    const cursoId = req.params.id;

    const cursoSelected = await Curso.findOne({
        include: [{
            model: models.Area,
            attributes: ['nome'],
        }],
        where: {
            id: { [models.Sequelize.Op.eq]: cursoId }
        }
    });

    if(cursoSelected){
        res.render("curso", { cursos: [cursoSelected.toJSON()]});
    }else{
        res.render("curso");
    }
    

};

async function create (req, res) {

    if(req.route.methods.get){
        res.render('curso/cadastro', {
            csrf: req.csrfToken()
        });
    }else{
        
        try{
            await Curso.create(req.body);
    
            res.redirect('/curso');
        }catch(e){
            
            res.render('curso/cadastro', {
                curso: req.body,
                errors: e.errors,
                csrf: req.csrfToken()
            });
        }
    }

};

async function update (req, res) {

    const cursoId = req.params.id;

    if(req.route.methods.get){
        
        const cursoSelected = await Curso.findOne({
            include: [{
                model: models.Area,
                attributes: ['nome'],
            }],
            where: {
                id: { [models.Sequelize.Op.eq]: cursoId }
            }
        });
        
        if(cursoSelected){
            res.render("curso/update", { 
                id: cursoId,
                curso: cursoSelected.toJSON(),
                csrf: req.csrfToken()
            });
        }else{
            res.render("curso/update", { error: true, msg: "Nenhum curso encontrado!", csrf: req.csrfToken()});
        }
    }else{

        try{
            const cursoUpdated = await Curso.update(req.body, {
                where: {
                    id: { [models.Sequelize.Op.eq]: cursoId }
                }
            });
            
            res.redirect("/curso");

        }catch(e){
            console.log(e);
            res.redirect("/curso");
        }
    }

};
async function remove (req, res) {};
module.exports = { index, read, create, update, remove }

const showError = function (errors, field) {
    let mensagem;

    if (typeof errors != 'undefined') {
        errors.forEach(function (error) {
            
            if (error.path === field) {

                mensagem = error.message;

                return;
            }
        });
        
        return mensagem;
    }
    
}

const eq = (a,b) => {
    let aa = parseInt(a);
    let bb = parseInt(b);
    return aa===bb;
};

module.exports = {showError, eq};
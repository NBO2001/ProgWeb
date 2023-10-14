/* Código desenvolvido corretamente */
/* Nota: 2.0 */

class Empregado {

    #nome;
    #salario;

    constructor(nome, salario) {
        this.#nome = nome;
        this.#salario = salario;
    }

    get Salario() {
        return this.#salario;
    }

    set Salario(salarioNovo) {

        if (salarioNovo < 0) {
            console.log("Erro, valor negativo");
        } else {
            this.#salario = salarioNovo;
        }

    }

    toString() {
        let string = `Empregado(nome: ${this.#nome}, salario: ${this.#salario})`;
        return string;
    }

    static somaSalarios(empregados) {

        let sum = 0;

        empregados.map(e => {
            sum = sum + e.Salario;
        });

        return sum;
    }

}

let empregado01 = new Empregado("Natanael B.", 10500);
let empregado02 = new Empregado("Beatriz E.", 10000);

let empregados = [empregado01, empregado02];

// Valores iniciais
empregados.map(e => console.log(e.toString()));

// Aumentando 10%
empregados.map(e => {

    let aumento = e.Salario * 0.10;
    let newSalario = e.Salario + aumento;
    e.Salario = newSalario;
})

// Valores apos o aumento
empregados.map(e => console.log(e.toString()));


// Soma dos salarios
let somaSalarioTol = Empregado.somaSalarios(empregados);
console.log(`Total dos salarios: ${somaSalarioTol}`)

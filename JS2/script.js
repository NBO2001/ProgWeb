

const stoneCases = (other) => {

    if(other===1){
        return -1;
    }else if(other===3){
        return 1;
    }else{
        return 0;
    }
}

const paperCases = (other) => {

    if(other===3){
        return -1;
    }else if(other===2){
        return 1;
    }else{
        return 0;
    }
}

const cutCases = (other) => {

    if(other===2){
        return -1;
    }else if(other===1){
        return 1;
    }else{
        return 0;
    }
}

const printOption = (choice) => {
    if(choice===1){
        console.log("O computador jogou Papel")
    }else if(choice===2){
        console.log("O computador jogou Pedra")
    }else if(choice===3){
        console.log("O computador jogou Tesoura")
    }

}

const printResult = (choice, pontuation) => {
    if(choice===1){
        console.log("Você ganhou!!")
    }else if(choice===-1){
        console.log("Voce perdeu, sua pontuação foi " + pontuation)
    }else if(choice===0){
        console.log("A rodada empatou")
    }
}

const game = (userChoice) => {

    let randomNumber = (Math.floor((Math.random()*10))%3)+1
    let result;

    if(userChoice===1){
        result= paperCases(randomNumber)
    }else if(userChoice===2){
        result= stoneCases(randomNumber)
    }else if(userChoice===3){
        result = cutCases(randomNumber)
    }else{
        result = -1
    }
    
    printOption(randomNumber)

    return result

    
}

(()=>{
    console.log("Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura")
    let selection = parseInt(prompt())
    let pontuation = 0
    let result = 0;
    while(result !== -1){
        result = game(selection)

        if(result !== -1){
            pontuation += result
            printResult(result,pontuation)
        }

        selection = parseInt(prompt())
    }
    printResult(result,pontuation)

})()



export class Score{
    
    #frameCount = 0;
    #playerScore = 0;
    #betterScore = 0;
    #isPause = false;
    #animation;
    #scoreBoardNumbers;
    #scoreBoard;

    #scoreBoardNumbersBestResult;
    
    #numbersBestScore;

    constructor(){
        const boardSize = 5;
        const bestScore = 7;

        this.#scoreBoardNumbers = this.#createScoreBoardNumbers(boardSize);
        this.#scoreBoardNumbersBestResult = this.#createScoreBoardNumbers(bestScore);
        
        this.#scoreBoard = this.#createScoreBoard();
        this.#alterNumber(this.#scoreBoardNumbersBestResult[0], '10');
        this.#alterNumber(this.#scoreBoardNumbersBestResult[1], '11');
    }

    get Element(){
        return this.#scoreBoard;    
    }

    clearScore(){
        this.#updateScoreBoard(this.#playerScore);
    }

    #createElement(){
        const element = document.createElement('div');
        element.className = "number";
        this.#alterNumber(element, '0');
        return element;
    }

    #createScoreBoardNumbers(boardSize){

        let scoreBoardNumbers = [];

        for (let i = 0; i < boardSize; i++) {
            scoreBoardNumbers.push(this.#createElement());
        }

        return scoreBoardNumbers;
    }

    #createNumbersElement(numbersArray){
        const element = document.createElement("div");
        element.className = "numbers";
        numbersArray.map( (number) => element.appendChild(number) );
        return element;
    }

    #createScoreBoard(){
        const element = document.createElement("div");
        element.className = "score";
        
        const boardCount = this.#createNumbersElement(this.#scoreBoardNumbers);
        const boardCountBest = this.#createNumbersElement(this.#scoreBoardNumbersBestResult);

        element.appendChild(boardCountBest);
        this.#numbersBestScore = boardCountBest;
        this.#numbersBestScore.style.display = "none";
        
        element.appendChild(boardCount);

        return element;

    }

    #alterNumber(element, number){

        let numbers= [-971,-987,-1001, -1016, -1031, -1046, -1061,-1076, -1091, -1106, -1121, -1137]

        let index = parseInt(number);

        let shift = numbers[index];

        element.style.backgroundPositionX = `${shift}px`;
    }

    #updateScoreBoard(score){
        const formattedString = String(score).padStart(5, '0');

        for(let i=0; i < formattedString.length; i++){

            let nun = formattedString[i];
            let nunHtml = this.#scoreBoardNumbers[i];

            this.#alterNumber(nunHtml, nun);
        }

    }

    #updateScoreBoardBest(score){

        if(score===0){
            if(this.#numbersBestScore){
                this.#numbersBestScore.style.display = "none";
            }
        }else{
            this.#numbersBestScore.style.display = "flex";
        }

        const formattedString = String(score).padStart(5, '0');

        for(let i=0; i < formattedString.length; i++){

            let nun = formattedString[i];
            let nunHtml = this.#scoreBoardNumbersBestResult[i+2];

            this.#alterNumber(nunHtml, nun);
        }

    }

    start(){

        if (this.#animation) {
            cancelAnimationFrame(this.#animation);
        }
        this.#isPause = false;
        this.#updateScoreBoardBest(this.#betterScore);

        const count = () => {

            if(!this.#isPause){

                this.#frameCount++;
            
                if (this.#frameCount % 30 === 0) {
                    
                        this.#playerScore++;

                        if(this.#betterScore < this.#playerScore){
                            this.#betterScore = this.#playerScore;
                        }
                        
                        this.#updateScoreBoard(this.#playerScore);
                }

            }
            
            this.#animation = requestAnimationFrame(count);
        }

        this.#animation = requestAnimationFrame(count);

        
    }

    pause(){
        this.#isPause = !this.#isPause;
    }

    restart(){
        cancelAnimationFrame(this.#animation);
        this.#frameCount = 0;
        this.#playerScore = 0;
        this.start();
        this.pause();
    }

}
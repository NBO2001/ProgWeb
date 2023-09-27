
export class GameOverScreen{

    #element;
    #button;
    #gameOverName;
    constructor(){

        const conteinner = this.#createElement("conteinner");
        const gameOverName = this.#createElement("game-over");
        const buttonRestart = this.#createElement("cicle-button");

        conteinner.appendChild(gameOverName);
        conteinner.appendChild(buttonRestart);

        this.#element = conteinner;
        this.#button = buttonRestart;
        this.#gameOverName = gameOverName;
        this.#addEvent();
    }

    #addEvent(){
        this.#button.addEventListener('click', () => {
            let restartGame = new Event("restartGame");
            document.dispatchEvent(restartGame);

        });
    }
    get Element(){
        return this.#element;
    }

    #createElement(className){
        const element = document.createElement("div");
        element.className = className;
        return element;
    }

    destroy(){
        this.#gameOverName.remove();
        this.#button.remove();
        this.#element.remove();
    }

}
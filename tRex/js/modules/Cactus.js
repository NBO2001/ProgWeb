
export class Cactus{

    #element;
    #windownWidth;
    #animationId;
    #dinoElement;
    #factorPixel = 3;

    constructor(initial_position, windowWidth, dino, speed){
        this.#factorPixel = speed;
        this.#element = this.#createElement(initial_position);
        this.#windownWidth = windowWidth;
        this.#dinoElement = dino;
        // this.#element.style.border = "1px solid blue";
        this.#moveCactus();
        this.#addEvent();
    }

    get Element(){
        return this.#element;
    }

    #createElement(intial_position){
        const element = document.createElement('div');
        element.className = "cactus";
        element.style.right = `${intial_position}px`;
        this.#randomCactus(element);
        return element;
    }

    #randomCactus(element){

        const cactusVariants = [ 
            {height: "52px", width: "27px", backgroundPositionX: "-335px" }, 
            {height: "52px", width: "50px", backgroundPositionX: "-360px" }, 
            {height: "52px", width: "79px", backgroundPositionX: "-411px" }, 
            {height: "75px", width: "37px", backgroundPositionX: "-489px" }, 
            {height: "75px", width: "37px", backgroundPositionX: "-527px" }, 
            {height: "75px", width: "37px", backgroundPositionX: "-602px" }, 
        ];

        const choice = parseInt( Math.random() * 50) % 6;
        let cactus_style = cactusVariants[choice];

        element.style.height = cactus_style.height;
        element.style.width = cactus_style.width;
        element.style.backgroundPositionX = cactus_style.backgroundPositionX;
   
    }

    #moveCactus(){

        const move = () => {

            let now_position = parseInt(this.#element.style.right);
            let new_position = now_position + this.#factorPixel;
            
            this.#element.style.right = `${new_position}px`;

            this.#animationId = requestAnimationFrame(move);

            let r1 = this.#dinoElement.dinoPosition();
            let r2 = this.elementPosition();

            if(r1.height !== 0 && this.#intersectRect(r1,r2)){
                let gameOverEvent = new Event('gameOver');
                document.dispatchEvent(gameOverEvent);
            }

            if(new_position >= this.#windownWidth){
                cancelAnimationFrame(this.#animationId);
                this.#element.remove();
            }

        }

        this.#animationId = requestAnimationFrame(move);




    }

    stopCactus(){
        cancelAnimationFrame(this.#animationId);
    }

    #addEvent(){
        document.addEventListener("allElementsStop", () => this.stopCactus() );
        document.addEventListener("allElementsStart", () => this.#moveCactus() );
        document.addEventListener("allElementsDestroy", () => this.destroy() );
        document.addEventListener("speedIncrement", () => this.#increment_speed() );
    }

    #increment_speed(){
        this.#factorPixel = this.#factorPixel + 1;  
    }

    elementPositionRigth(){
        let position = parseInt(this.#element.style.right);
        return position;
    }

    elementPosition(){

        const rect = this.#element.getBoundingClientRect();

        return rect
    }

    #intersectRect(r1, r2) {
        return !(r2.left > r1.right || 
                 r2.right < r1.left || 
                 r2.top > r1.bottom ||
                 r2.bottom < r1.top);
    }

    destroy(){
        this.#element.remove();
    }


}

export class Pterosaur{

    #element;
    #style = [-195, -264];
    #indxStyleNow = 0;
    #animation;
    #wingTime;
    #factorPixel;
    #dino;
    #initialPosition;
    #heights = [0,48,71];
    #windownWidth;
    
    constructor(initialPosition, windowWidth, dino, initialSpeed ){
        this.#dino = dino;
        this.#factorPixel = initialSpeed;
        this.#initialPosition = initialPosition;
        this.#windownWidth = windowWidth;
        this.#element =  this.#createElement();
        this.#fly_animation();
        this.#fly();
        this.#addEvent();
        // this.#element.style.border = "1px solid green";
    }

    get Element(){
        return this.#element;
    }

    elementPositionRigth(){
        let position = parseInt(this.#element.style.right);
        return position;
    }
    #createElement(){
        const element = document.createElement("div");
        let randomIndex = parseInt((Math.random()*3)%3);
        let bottomVal = this.#heights[randomIndex];

        element.className = "pterosaur";
        element.style.right = `${this.#initialPosition}px`;
        element.style.bottom = `${bottomVal}px`;

        return element;
    }

    #fly_animation(){
        let timeSpeed = 125;

        this.#wingTime = setInterval(() => {

            this.#indxStyleNow  = Math.abs(this.#indxStyleNow -1 );
            
            this.#element.style.backgroundPositionX = `${this.#style[this.#indxStyleNow]}px`;

        }, timeSpeed);

    }

    #fly(){

        const move = () => {

            let nowPosition = parseInt( this.#element.style.right );
            let newPos = nowPosition + this.#factorPixel;

            this.#element.style.right = `${newPos}px`;

            this.#animation = requestAnimationFrame(move);
            
            let r1 = this.#dino.dinoPosition();
            let r2 = this.elementPosition();
            
            if(r1.height !== 0 &&  this.#intersectRect(r1,r2)){
                let gameOverEvent = new Event('gameOver');
                document.dispatchEvent(gameOverEvent);
            }

            if(newPos >= this.#windownWidth){
                this.destroy();
            }
        }

        this.#animation = requestAnimationFrame(move);

    }

    stop(){
        cancelAnimationFrame(this.#animation);
        clearInterval(this.#wingTime);
    }

    #addEvent(){
        document.addEventListener("allElementsStop", () => this.stop() );
        document.addEventListener("allElementsStart", () => {
            this.#fly();
            this.#fly_animation();
        } );
        document.addEventListener("allElementsDestroy", () => this.destroy() );
        document.addEventListener("speedIncrement", () => this.#increment_speed() );
    }


    elementPosition(){

        const rect = this.#element.getBoundingClientRect();

        return rect
    }

    #increment_speed(){
        this.#factorPixel = this.#factorPixel + 1;  
    }


    #intersectRect(r1, r2) {
        return !(r2.left > r1.right || 
                 r2.right < r1.left || 
                 r2.top > r1.bottom ||
                 r2.bottom < r1.top);
    }

    destroy(){
        cancelAnimationFrame(this.#animation);
        this.#element.remove();
    }


}
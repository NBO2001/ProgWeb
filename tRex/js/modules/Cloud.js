
export class Cloud{

    #element_cloud;
    #moveAnimation;
    #windownWidth;
    #speedFactor = 0;

    constructor(windownWidth, initialSpeed){
        this.#speedFactor = initialSpeed;   
        this.#element_cloud = this.#createElement();
        this.#windownWidth = windownWidth;
        this.#addEvent();
        this.#moveCloud();
    }

    get Element(){
        return this.#element_cloud;
    }

    #createElement(){
        const element = document.createElement('div');
        let top_position= parseInt(Math.random() * 200);
        let rigthPositon = parseInt(Math.random() * 200);
        element.className = "cloud";
        element.style.right = `${rigthPositon}px`;
        element.style.top = `${top_position}px`;

        return element;
    }

    #moveCloud(){  
        
        const move = () => {
            let now_position = parseInt(this.#element_cloud.style.right);

            let next_positon = now_position+this.#speedFactor;

            this.#element_cloud.style.right = `${next_positon}px`;

            this.#moveAnimation = requestAnimationFrame(move);
            if(next_positon > this.#windownWidth){
                this.destroy();
            }
        }

        this.#moveAnimation = requestAnimationFrame(move);

    }

    stopCloud(){
        cancelAnimationFrame(this.#moveAnimation);
    }

    #addEvent(){
        document.addEventListener("allElementsStop", () => this.stopCloud());
        document.addEventListener("allElementsStart", () => this.#moveCloud());
        document.addEventListener("allElementsDestroy", () => this.destroy());
        document.addEventListener("speedIncrement", () => this.#increment_speed() );
    }
    
    #increment_speed(){
        this.#speedFactor++;
    }
    destroy(){
        cancelAnimationFrame(this.#moveAnimation);
        this.#element_cloud.remove();
        
        const event = new CustomEvent("cloudOutOfScreen", { detail: this });
        document.dispatchEvent(event);
}

}
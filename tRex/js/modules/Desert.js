
export class Desert{

    #element;
    #floor_element;
    #animationFrameId;
    #factorPixel = 3
    #intervalIncrement = 60000;
    #intevalId;
    #class_scenario = {0: "desert", 1: "desert black_element"};
    #time_day;
    #id_class_scenario = 0;
    #isPause = false;

    constructor(width, height){

        this.#element = this.#create_element(width, height);
        this.#floor_element = this.#create_floor();

        this.#element.appendChild(this.#floor_element);
        
    }

    start(){
        this.#moveFloor();
        this.#addDayMoviment();
    }

    #create_element(width, height){

        let element = document.createElement("div");

        element.className = this.#class_scenario[0];
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;

        return element;

    }

    #create_floor(){
        let element = document.createElement("div");
        element.className = "floor";
        element.style.backgroundPositionX = '0px';
        return element;
    }


    #moveFloor(){

        let now_pos;
    
        const move = () => {
            now_pos = parseInt(this.#floor_element.style.backgroundPositionX);
            let new_pos = now_pos - this.#factorPixel;
            this.#floor_element.style.backgroundPositionX = `${new_pos}px`;
            
            this.#animationFrameId = requestAnimationFrame(move);
        };
        
        this.#intevalId = setInterval(() => {
            this.#factorPixel = this.#factorPixel + 1;
            document.dispatchEvent(new Event("speedIncrement"));
        }, this.#intervalIncrement);

        this.#animationFrameId = requestAnimationFrame(move);
    }

    #addDayMoviment(){

        this.#time_day = setInterval( () => {
            let id = Math.abs( this.#id_class_scenario - 1);
            this.#id_class_scenario = id;
            this.#element.className = this.#class_scenario[id];
        }, 60000);


    }

    stopFloor(){
        clearInterval(this.#intevalId);
        clearInterval(this.#time_day);
        cancelAnimationFrame(this.#animationFrameId);
    }

    addIn(father){
        father.appendChild(this.#element);
    }

    addChild(child){
        this.#element.appendChild(child);
    }

    pause(){
        if(!this.#isPause){
            this.stopFloor();
            this.#isPause = true;
        }else{
            this.#moveFloor();
            this.#addDayMoviment();
            this.#isPause = false;
        }
    }


    destroy(){
        this.#floor_element.remove();
        this.#element.remove();
    }
}
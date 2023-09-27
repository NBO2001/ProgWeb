
export class Dino{

    #currentBackgroud = 'leg_right';
    #isJumping = false;
    #isLower = false;
    #element;
    #timeIdDinoLegs;
    #animationId;
    #goingUp = true;
    #gamePause = false;
   
    constructor(){
        this.#element = this.#create_element();
        // this.#element.style.border = "1px solid red";
    }

    start(){
        this.#dinoRun();
        this.#addDinoControls();
    }

    #create_element(){
        const element = document.createElement('div');
        element.className = "dino";
        element.style.bottom = '0';
        this.#configureDinoAppearance(element, "default");
        return element;
    }

    #configureDinoAppearance(element, type_backgroud) {

        if(!this.#isLower){
            element.style.height = "70px";
            element.style.width = "66px";
            element.style.backgroundPositionY = "0px";
        }else{
            element.style.height = "47px";
            element.style.width = "89px";
            element.style.backgroundPositionY = "-25px";
        }

        switch(type_backgroud) {
            case "leg_left":
                element.style.backgroundPositionX = "-1391px";
                break;
            case "leg_right":
                element.style.backgroundPositionX = "-1457px";
                break;
            case "jump":
                element.style.backgroundPositionX = "-1260px";
                break;
            case "lower_leg_left":
                element.style.backgroundPositionX = "-1652px";
                break;
            case "lower_leg_right":
                element.style.backgroundPositionX = "-1740px";
                break;
            default:
                element.style.backgroundPositionX = "-1260px";
                break;
        }
    }

    #dinoRun(){
        this.#timeIdDinoLegs = setInterval(() => {
            
            if(!this.#gamePause){

                if( this.#currentBackgroud === 'leg_right' || this.#currentBackgroud === 'lower_leg_right'){
                    this.#currentBackgroud = this.#isLower ? 'lower_leg_left' : 'leg_left' ;
                }else{
                    this.#currentBackgroud = this.#isLower ? 'lower_leg_right' : 'leg_right';
                }
                
                this.#configureDinoAppearance(this.#element, this.#currentBackgroud);
            }

        }, 125);
    }

    #stopRunner(){
        clearInterval(this.#timeIdDinoLegs);

        if(this.#isJumping){
            cancelAnimationFrame(this.#animationId);
        }
    }
    stop(){
       this.#stopRunner(); 
       this.pause();
    }

    pause() {
        this.#gamePause = !this.#gamePause;
    }

    get Element(){
        return this.#element;
    }

    #addDinoControls() {
        document.addEventListener('keydown', this.#handleKeyDown.bind(this));
        document.addEventListener('keyup', this.#handleKeyUp.bind(this));
    }

    #lowerDino(){
        this.#isLower = true;
    }

    #jumping() {
        this.#stopRunner()
        this.#isJumping = true;
        this.#goingUp = true;

        this.#currentBackgroud = "jump";

        this.#configureDinoAppearance(this.#element, this.#currentBackgroud);

        let maximumHeigth = 180;
        let incrementValue = 4;

        const jumping = () => {

            let now_position = parseInt(this.#element.style.bottom);
            let new_postion = now_position + incrementValue;

            if(this.#goingUp){
                this.#element.style.bottom = `${new_postion}px`;

                if(new_postion >= maximumHeigth){
                    this.#goingUp = false;
                }
            }else{
                new_postion = now_position - incrementValue;
                this.#element.style.bottom = `${new_postion}px`;

                if(new_postion <= 0){
                    this.#isJumping = false;
                    this.#element.style.bottom = `0px`;
                    cancelAnimationFrame(this.#animationId);
                    this.#dinoRun();
                    return;
                }
            }

            this.#animationId = requestAnimationFrame(jumping);

        }

        this.#animationId = requestAnimationFrame(jumping);


    }
    

    #handleKeyDown(e){
        e.stopPropagation();
        
        if(this.#gamePause) return;

        if ((e.code === 'Space' || e.code === 'ArrowUp') && !this.#isJumping) {
            this.#jumping();
        } else if (e.code === 'ArrowDown' && !this.#isJumping) {
            this.#lowerDino();
        }
    }

    #handleKeyUp(e){
        e.stopPropagation();
        
        if(this.#gamePause) return;
        if (e.code === 'ArrowDown' && !this.#isJumping) {
            this.#isLower = false;
        }
    }

    dinoPosition(){
    
        const rect = this.#element.getBoundingClientRect();

        return rect
    }

    destroy(){
        this.#element.remove();
    }
}
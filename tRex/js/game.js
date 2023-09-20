// === CONFIGURAÇÃO ===
const CONFIG = {
    SCREEN_GAME: document.getElementById("screen-game"),
    SCREEN_HEIGHT: 300,
    SCREEN_WIDTH: 1024,
    INIT_SPEED: 4,
    MIN_CACTUS_DISTANCE: 0,
    PROB_NUVEM: 1,
    PROB_CACTUS: 0.5,
    TOL_NUVENS: 4,
    SPEED_INCREMENT: 0.1  // Quanto a velocidade deve aumentar ao longo do tempo
};

let lastCactusPosition = -CONFIG.MIN_CACTUS_DISTANCE;
let clouds = [];
let lastTimestamp = null;
let lastCactus = null;

// === JOGO ===
class Game {
    constructor() {
        this.speed = CONFIG.INIT_SPEED;
        this.desert = new Desert(CONFIG.SCREEN_GAME, CONFIG.SCREEN_WIDTH, CONFIG.SCREEN_HEIGHT, this.speed);
        this.dino = new Dino(this.desert.desert_element);
        this.loop();
    }

    loop(timestamp = 0) {
        if (!lastTimestamp) {
            lastTimestamp = timestamp;
            requestAnimationFrame(this.loop.bind(this));
            return;
        }

        if (Math.random() * 100 <= CONFIG.PROB_NUVEM) {
            if (clouds.length < CONFIG.TOL_NUVENS) {
                clouds.push(new Cloud(this.desert.desert_element));
            }
        }

        let initialCactusPosition = parseInt(CONFIG.SCREEN_WIDTH*0.20);

        if(!lastCactus){
            lastCactus = new Cactus(this.desert.desert_element, initialCactusPosition);
            lastCactus.ElementDino = this.dino;
        }

        let position_last = lastCactus.cactusPosition()

        if (position_last >= CONFIG.MIN_CACTUS_DISTANCE) {
            if (Math.random() * 100 <= CONFIG.PROB_CACTUS) {
                lastCactus = new Cactus(this.desert.desert_element, initialCactusPosition);
                lastCactus.ElementDino = this.dino;
            }
        }

        lastTimestamp = timestamp;
        requestAnimationFrame(this.loop.bind(this));
    }

    increaseSpeed() {
        this.speed += CONFIG.SPEED_INCREMENT;
        this.desert.speed = this.speed;
        // Aqui você também pode ajustar outras coisas, como a frequência de geração de cactos, etc.
    }
}

class Desert {

    #element_desert;
    #element_floor;
    #desert_speed;

    constructor(screen_game, width_screen, height_screen, speed) {
        this.#desert_speed = speed;
        this.#element_desert = this.#createDesert(width_screen, height_screen);
        this.#element_floor = this.#createFloor();
        this.#element_desert.appendChild(this.#element_floor);
        screen_game.appendChild(this.#element_desert);
    }

    #createDesert(width_screen, height_screen) {
        const element = document.createElement('div');
        element.style.width = `${width_screen}px`;
        element.style.height = `${height_screen}px`;
        element.className = "desert";
        return element;
    }

    #createFloor() {
        const element = document.createElement('div');
        element.className = "floor";
        element.style.backgroundPositionX = '0px';
        return element;
    }

    move_floor(deltaTime) {
        let now_position = parseInt(this.#element_floor.style.backgroundPositionX || 0);
        let new_position = now_position - this.#desert_speed * (deltaTime / 16.67);  // Normalizing based on 60fps
        this.#element_floor.style.backgroundPositionX = `${new_position}px`;
    }
    

    get speed() {
        return this.#desert_speed;
    }
    

    set speed(value) {
        
        if (typeof value === 'number' && value >= 0) {
            this.#desert_speed = value;
        } else {
            console.error("Invalid speed value!");
        }
    }

    get desert_element(){
        return this.#element_desert;
    }
}

class Dino {
    #dino_element;
    #currentBackgroud = 'leg_right';
    #runningInterval;
    #speed = 100;
    #isJumping = false;
    #isLower = false;
    #jump_speed = 2;
    #jump_screen_update = 2;

    constructor(element_father) {
        this.#dino_element = this.#create_dino();
        element_father.appendChild(this.#dino_element);
        this.startRunning();
        this.#addDinoControls();
    }


    #create_dino() {
        const element = document.createElement('div');
        element.className = "dino";
        element.style.bottom = '0';
        this.#configureDinoAppearance(element, this.#currentBackgroud);
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
                element.style.backgroundPositionX = "-1391px";
                break;
        }
    }

    startRunning() {
        this.#runningInterval = setInterval(() => {

            // Alternate the leg position
            if (this.#currentBackgroud === 'leg_right' || this.#currentBackgroud === 'lower_leg_right') {
                this.#currentBackgroud = this.#isLower === false ? 'leg_left' : 'lower_leg_left' ;
            } else {
                this.#currentBackgroud = this.#isLower === false ? 'leg_right' : 'lower_leg_right' ;
            }

            this.#configureDinoAppearance(this.#dino_element, this.#currentBackgroud);
        }, this.#speed); 
    }

    stopRunning() {
        clearInterval(this.#runningInterval);
    }

    runner() {
        this.#currentBackgroud = 'leg_left';
        this.startRunning();
    }

    #addDinoControls() {
        document.addEventListener('keydown', this.#handleKeyDown.bind(this));
        document.addEventListener('keyup', this.#handleKeyUp.bind(this));
    }

    #handleKeyDown(event) {
        console.log(event.code)
        if ((event.code === 'Space' || event.code === 'ArrowUp') && !this.#isJumping) {
            this.#jumping();
        } else if (event.code === 'ArrowDown' && !this.#isJumping) {
            this.#lowerDino();
        }
    }

    #handleKeyUp(event) {
        if (event.code === 'ArrowDown' && !this.#isJumping) {
            this.#isLower = false;
        }
    }
    
    #lowerDino(){
        this.#isLower = true;
    }

    #jumping() {
        this.stopRunning();
        this.#isJumping = true;
        this.#currentBackgroud = 'jump';
        this.#configureDinoAppearance(this.#dino_element, this.#currentBackgroud);

        const jumpHeight = 120;
        let currentPosition = 0;

        const rising = setInterval(() => {
            currentPosition += this.#jump_speed;
            this.#dino_element.style.bottom = `${currentPosition}px`;
            
            if (currentPosition >= jumpHeight) {
                clearInterval(rising);
                this.#descend();
            }
        }, this.#jump_screen_update);
    }

    #descend() {
        
        let currentPosition = 120; 

        const falling = setInterval(() => {
            currentPosition -= this.#jump_speed;
            this.#dino_element.style.bottom = `${currentPosition}px`;
            
            if (currentPosition <= 0) {
                clearInterval(falling);
                this.#dino_element.style.bottom = '0';
                this.#isJumping = false;
                this.runner();
            }
        }, this.#jump_screen_update);
    }

    destroy() {
        document.removeEventListener('keydown', this.#handleKeyDown.bind(this));
        document.removeEventListener('keyup', this.#handleKeyUp.bind(this));
    }

    elementPositon(){

        const rect = this.#dino_element.getBoundingClientRect();

        return rect
    }
}

class Cloud{

    #element_cloud;
    #father_element;
    #moveInterval;

    constructor(element_father){

        this.#element_cloud = this.#createElement();
        this.#father_element = element_father;

        this.#father_element.appendChild(this.#element_cloud);
        this.#moveCloud();
    }

    #createElement(){
        const element = document.createElement('div');
        let top_position= parseInt(Math.random() * 200);
        element.className = "cloud";
        element.style.right = 0;
        element.style.top = `${top_position}px`;

        return element;
    }

    #moveCloud(){
        const speed = (parseInt(Math.random() * 3)%3) + 1;       

        this.#moveInterval = setInterval(() => {
            let now_position = parseInt(this.#element_cloud.style.right);

            let next_positon = now_position+speed;

            this.#element_cloud.style.right = `${next_positon}px`;

            if(next_positon > this.#father_element.offsetWidth){
                clearInterval(this.#moveInterval);
                this.#element_cloud.remove();
                
                // Emita um evento personalizado
                const event = new CustomEvent("cloudOutOfScreen", { detail: this });
                document.dispatchEvent(event);
            }
        },50);
    }

    get element(){
        return this.#element_cloud;
    }

}

class Cactus{

    #element_cactus;
    #intervalMove;
    #father_element;
    #catcus_speed = 3;
    #time_update = 9;
    #element_dino = null;
    

    constructor(father_element, intial_position){

        this.#element_cactus = this.#createElement(intial_position);
        this.#father_element = father_element;
        this.#father_element.appendChild(this.#element_cactus);
        this.#cacutsMove();

        this.#element_cactus.style.border = "1px solid blue";
    
    }

    set ElementDino(element){
        
        this.#element_dino = element;

    }
    cactusPosition(){
        let position = parseInt(this.#element_cactus.style.right);
        return position;
    }

    #createElement(intial_position){
        const element = document.createElement('div');
        element.className = "cactus";
        element.style.right = `-${intial_position}px`;
        this.#randomCactus(element);
        return element;
    }

    #randomCactus(element){
        const smallOrBigger = parseInt( Math.random() * 1) % 1;

        if(smallOrBigger==1){
            return this.#smallCactus(element);
        }else{
            return this.#bigCactus(element);
        }
    }

    #smallCactus(element){
        const type_cactus = parseInt( Math.random() * 2) % 3 + 1;
        element.style.height = "52px";
        switch(type_cactus){
            case 1:
                element.style.width = "27px";
                element.style.backgroundPositionX = "-335px";
                break;
            case 2:
                element.style.width = "50px";
                element.style.backgroundPositionX = "-360px";
                break;
            case 3:
                element.style.width = "79px";
                element.style.backgroundPositionX = "-411px";
                break;
            default:
                break;


        }
    }

    #bigCactus(element){
        const type_cactus = parseInt( Math.random() * 2) % 3 + 1;
        element.style.height = "75px";
        switch(type_cactus){
            case 1:
                element.style.width = "37px";
                element.style.backgroundPositionX = "-489px";
                break;
            case 2:
                element.style.width = "75px";
                element.style.backgroundPositionX = "-527px";
                break;
            case 3:
                element.style.width = "112px";
                element.style.backgroundPositionX = "-602px";
                break;
            default:
                break;


        }
    }

    #intersectRect(r1, r2) {
        return !(r2.left > r1.right || 
                 r2.right < r1.left || 
                 r2.top > r1.bottom ||
                 r2.bottom < r1.top);
    }

    #cacutsMove(){
        
        this.#intervalMove = setInterval( () => {
            let now_position = parseInt(this.#element_cactus.style.right);

            let next_positon = now_position+ this.#catcus_speed;

            this.#element_cactus.style.right = `${next_positon}px`;

            lastCactusPosition = next_positon; // atualizando a posição do cactus aqui


            let dino = this.#element_dino.elementPositon();
            let cactus = this.elementPositon();

            if(this.#intersectRect(dino, cactus)){

                console.log("bateu..")
                console.log(dino)
                console.log(cactus)
                
            }
            
            if(next_positon > this.#father_element.offsetWidth){
                clearInterval(this.#intervalMove);
                this.#element_cactus.remove();
            }
        }, this.#time_update);

    }

    elementPositon(){
        

        const rect = this.#element_cactus.getBoundingClientRect();

        return rect
    }

}

document.addEventListener("cloudOutOfScreen", (e) => {
    const cloudToRemove = e.detail;
    const cloudIndex = clouds.indexOf(cloudToRemove);
    if (cloudIndex > -1) {
        clouds.splice(cloudIndex, 1);
    }
});

// === INICIALIZAÇÃO ===
const game = new Game();


setInterval(() => {
    game.increaseSpeed();
}, 30000);

// Apenas para debug visual
document.querySelector('.dino').style.border = "1px solid red";


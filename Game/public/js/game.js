
const DEBUG = false;

class Dino{

    #currentBackgroud = 'leg_right';
    #isJumping = false;
    #isLower = false;
    #element;
    #timeIdDinoLegs;
    #animationId;
    #goingUp = true;
    #gamePause = false;
    #bounderBoxs = [];
   
    constructor(){
        this.#element = this.#create_element();
        if(DEBUG){
            this.#bounderBoxs[0].style.border = "1px solid red";
            this.#bounderBoxs[1].style.border = "1px solid black";
            this.#bounderBoxs[2].style.border = "1px solid red";
        }
    }

    start(){
        this.#dinoRun();
        this.#addDinoControls();
    }

    #create_element(){
        const element = document.createElement('div');
        element.className = "dino";
        element.style.bottom = '0';
        this.#createBonderBoxs(element);
        this.#configureDinoAppearance(element, "default");
        return element;
    }

    #createBonderBoxs(element){
        const element_h = document.createElement('div');
        const element_b = document.createElement('div');
        const element_f = document.createElement('div');
        element_h.className = "dino_h";
        element_b.className = "dino_b";
        element_f.className = "dino_f";

        element.appendChild(element_h);
        element.appendChild(element_b);
        element.appendChild(element_f);

        this.#bounderBoxs = [element_h,element_b,element_f]

    }

    #configureDinoAppearance(element, type_backgroud) {

        if(!this.#isLower){
            element.style.height = "70px";
            element.style.width = "66px";
            element.style.backgroundPositionY = "0px";
            element.style.flexDirection= "column";

            this.#bounderBoxs[0].style.width = "37px";
            this.#bounderBoxs[0].style.height = "28px";
            this.#bounderBoxs[0].style.margin = "0px";
            this.#bounderBoxs[0].style.marginLeft = "20px";

            this.#bounderBoxs[1].style.width = "51px";
            this.#bounderBoxs[1].style.height = "33px";
            this.#bounderBoxs[1].style.marginRight = "15px";

            this.#bounderBoxs[2].style.width = "30px";
            this.#bounderBoxs[2].style.height = "15px";

        }else{
            element.style.height = "47px";
            element.style.width = "89px";
            element.style.flexDirection= "row-reverse";
            element.style.backgroundPositionY = "-25px";

            this.#bounderBoxs[0].style.width = "35px";
            this.#bounderBoxs[0].style.margin = "0px";
            this.#bounderBoxs[0].style.marginRight = "4px";
            this.#bounderBoxs[0].style.marginBottom = "5px";

            this.#bounderBoxs[1].style.width = "21px";
            this.#bounderBoxs[1].style.margin = "0px";

            this.#bounderBoxs[2].style.width = "35px";
            this.#bounderBoxs[2].style.height = "45px";
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
            case "game_over":
                element.style.backgroundPositionX = "-1523px";
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
        document.addEventListener('gameOver', this.#changeForGameOver.bind(this));
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
    
    #changeForGameOver(){
        this.#configureDinoAppearance(this.#element, "game_over");
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

        const h = this.#bounderBoxs[0].getBoundingClientRect();
        const b = this.#bounderBoxs[1].getBoundingClientRect();
        const f = this.#bounderBoxs[2].getBoundingClientRect();
        return {rect, h,b,f}
    }

    destroy(){
        this.#element.remove();
    }
}

class GameOverScreen{

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

class Score{
    
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

class Pterosaur{

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
        if(DEBUG){
            this.#element.style.border = "1px solid green";
        }
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
            
            if(r1.h.height !== 0 && this.#intersectRect(r1.h,r2)){
                let gameOverEvent = new Event('gameOver');
                document.dispatchEvent(gameOverEvent);
            }else if(r1.b.height !== 0 && this.#intersectRect(r1.b,r2)){
                let gameOverEvent = new Event('gameOver');
                document.dispatchEvent(gameOverEvent);
            } else if(r1.f.height !== 0 && this.#intersectRect(r1.f,r2)){
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

class Desert{

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
        element.style.width = `100%`;
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

class Cloud{

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

class Cactus{

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
        if(DEBUG){
            this.#element.style.border = "1px solid blue";
        }
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

            if(r1.h.height !== 0 && this.#intersectRect(r1.h,r2)){
                let gameOverEvent = new Event('gameOver');
                document.dispatchEvent(gameOverEvent);
            }else if(r1.b.height !== 0 && this.#intersectRect(r1.b,r2)){
                let gameOverEvent = new Event('gameOver');
                document.dispatchEvent(gameOverEvent);
            } else if(r1.f.height !== 0 && this.#intersectRect(r1.f,r2)){
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

(function(){
    const CONFIG = {
        widthScreen: 1500,
        heigthScreen: 500,
        minimunDistance: 250,
        PROB_CACTUS: 1.8,
        PROB_NUVEM: 1.5,
        TOL_NUVENS: 150,
        PROB_PTEROSAUR: 0.8
    };
    
    const screenGame = document.getElementById("screen-game");
    
    let desert, dino,lastObstacle, intervalobstacleGenerator;
    let intervalCloudGen, gameIsRunning,score , isGameOver = false;
    let clouds = [];
    let gameOverSc;
    let initialSpeed = 3;
    
    
    
    function initializeGame() {
        
        desert = new Desert(CONFIG.widthScreen, CONFIG.heigthScreen);
        dino = new Dino();
    
        if(!score){
            score = new Score();
        }else{
            score.restart();
            score.clearScore();
        }
        
        desert.addChild(dino.Element);
        desert.addChild(score.Element);
     
    
        desert.addIn(screenGame);
    
        lastObstacle = null;
        
    }
    
    function startGame(){
        gameIsRunning = true;
        desert.start();
        dino.start();
        score.start();
    
        intervalobstacleGenerator = setInterval(obstacleGenerator, 10);
        intervalCloudGen = setInterval(cloudGenerator, 10);
    }
    
    let isPauseGame = false;
    
    function pauseOrResumeGame() {
        
        if(!gameIsRunning) return;
        
        if(isPauseGame){
            desert.pause();
            score.pause();
            dino.pause();
            intervalobstacleGenerator = setInterval(obstacleGenerator, 10);
            intervalCloudGen = setInterval(cloudGenerator, 10);
            document.dispatchEvent(new Event("allElementsStart"));
        }else{
            desert.pause();
            score.pause();
            dino.pause();
            clearInterval(intervalobstacleGenerator);
            clearInterval(intervalCloudGen);
            // clearInterval(intervalPterosaur);
            
            document.dispatchEvent(new Event("allElementsStop"));
        }
    
    
        isPauseGame = !isPauseGame;
    }
    
    function endGame() {
    
        desert.stopFloor();
        dino.stop();
        score.restart();
    
        clearInterval(intervalobstacleGenerator);
        clearInterval(intervalCloudGen);
    
        document.dispatchEvent(new Event("allElementsStop"));
    
        gameOverSc = new GameOverScreen();
        desert.addChild(gameOverSc.Element);
    
        gameIsRunning = false;
        isGameOver = true;
    }
    
    
    function obstacleGenerator(){
    
    
        if (!lastObstacle) {
            let prob = Math.random() * 100;
            let changed = false;
    
            if( prob <= CONFIG.PROB_CACTUS ){
                lastObstacle = new Cactus(0, CONFIG.widthScreen, dino, initialSpeed);
                changed = true;
            }else if( prob <= CONFIG.PROB_PTEROSAUR ){
                lastObstacle = new Pterosaur(0, CONFIG.widthScreen, dino, initialSpeed);
                changed = true;
            }
    
            if(changed){
                desert.addChild(lastObstacle.Element);
            }
        }else{
            
            let elementNowPosition = lastObstacle.elementPositionRigth();
            let distance = Math.abs(0 - elementNowPosition);
            
            if(distance >= CONFIG.minimunDistance){
                let prob = Math.random() * 100;
                
                let changed = false;
                
                if( prob <= CONFIG.PROB_PTEROSAUR ){
                    lastObstacle = new Pterosaur(0, CONFIG.widthScreen, dino, initialSpeed);
                    changed = true;
                }else if( prob <= CONFIG.PROB_CACTUS ){
                    lastObstacle = new Cactus(0, CONFIG.widthScreen, dino, initialSpeed);
                    changed = true;
                }
    
                if(changed){
                    desert.addChild(lastObstacle.Element);
                }
    
            }
        }
    
    }
    
    function cloudGenerator() {
        if (Math.random() * 100 <= CONFIG.PROB_NUVEM && clouds.length < CONFIG.TOL_NUVENS) {
            let seed = (parseInt(Math.random() * 1)%1) + initialSpeed;
            let cloud = new Cloud(CONFIG.widthScreen, seed);
            desert.addChild(cloud.Element);
            clouds.push(cloud);
        }
    }
    
    document.addEventListener('keydown', (e) => {
        e.preventDefault();  
        if (e.key === "p") {
            pauseOrResumeGame();
        }else if( !gameIsRunning && e.code === "Space"){
            if(!isGameOver){
                startGame();
            }
        }
    });
    
    document.addEventListener('restartGame', () => {
    
        if(gameOverSc){
            gameOverSc.destroy();
        }
    
        if(dino){
            dino.destroy();
        }
    
        document.dispatchEvent(new Event("allElementsDestroy"));
    
        if(desert){
            desert.destroy();
        }
    
        isGameOver = false;
        initializeGame();
    
    })
    
    document.addEventListener('gameOver', endGame);
    
    document.addEventListener("cloudOutOfScreen", (e) => {
        const cloudToRemove = e.detail;
        const cloudIndex = clouds.indexOf(cloudToRemove);
        if (cloudIndex > -1) {
            clouds.splice(cloudIndex, 1);
        }
    });
    
    document.addEventListener("speedIncrement", () => {initialSpeed = initialSpeed + 1} );
    
    

    initializeGame();
})();
import { Desert, Dino, Cactus, Cloud, GameOverScreen, Score, Pterosaur  } from "./modules/index.js";


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
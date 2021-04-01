var PLAY=1;
var END=0;
var gameState=PLAY;
var trex,trex_running,trexCollided;
var ground,ground1;
var invground;
var Acloud;
var obs1,obs2,obs3,obs4,obs5,obs6;
var score;
var cloudGroup, obstacleGroup;
var gameover1,restartg;
var gameOver;
var restart;
var checkPointsound,jumpSound,dieSound;

function preload(){
trex_running = 
loadAnimation("trex1.png","trex3.png","trex4.png")
  
ground1 = loadImage("ground2.png")  

Acloud = loadAnimation("cloud.png");
  
obs1 = loadImage("obstacle1.png");
obs2 = loadImage("obstacle2.png");
obs3 = loadImage("obstacle3.png");
obs4 = loadImage("obstacle4.png");
obs5 = loadImage("obstacle4.png");
obs6 = loadImage("obstacle5.png");
  
trexCollided = loadAnimation("trex_collided.png")
  
restartg = loadImage("restart.png");
gameover1 = loadImage("gameOver.png");
  
checkPointsound = loadSound("checkPoint.mp3");
jumpSound = loadSound("jump.mp3");
dieSound = loadSound("die.mp3");
  
}

function setup() {
  createCanvas(600, 200);
  // trex = createSprite(x,y,width,height);
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running",trex_running)
  trex.addAnimation("collided",trexCollided);
  trex.scale = 0.5;
  //trex.debug = true;
  //trex.setCollider("rectangle",0,0,400,trex.height) --> is used to change the shape or size of the collider.
   
  ground = createSprite(300,180,600,3);
  ground.addImage("ground",ground1)  
  
  
  invground = createSprite(300,190,600,10)
  invground.visible = false;
  
  score = 0;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
  gameOver = createSprite(300,80,10,10);
  gameOver.addImage("gameo",gameover1);
  
  restart = createSprite(300,130,10,10);
  restart.addImage("res",restartg)
  restart.scale = 0.5
}

function draw() {
  background("black");
  
  text("Score:" + score, 500,30);
   
  if(gameState == PLAY){
    ground.velocityX = -(2+score/100);
    if (keyDown("Space") && trex.y >= 160) {
  trex.velocityY = -18;
  jumpSound.play();
  }
    score = score+Math.round(frameCount/100);
      if (ground.x < 0) {
  ground.x = ground.width/2;
 }
  gameOver.visible = false;
  restart.visible = false;  
    trex.velocityY = trex.velocityY+1
    formClouds();
    formObstacles();
    
    if(obstacleGroup.isTouching(trex)){
      gameState = END;
      dieSound.play();
      // The following code can be added to add AI where the trex will automatically jump when an obstacle comes. 
      //trex.velocityY = -12;
      //jumpSound.play();
    }
    if(score % 500 == 0 && score>0){
  checkPointsound.play();
  }
    
  }
  else if (gameState == END){
  ground.velocityX = 0; 
  obstacleGroup.setVelocityXEach(0);
  cloudGroup.setVelocityXEach(0);
  trex.changeAnimation("collided",trexCollided);
  obstacleGroup.setLifetimeEach(-1);  
  cloudGroup.setLifetimeEach(-1);
    trex.velocityY = 0;
  gameOver.visible = true;
  restart.visible = true;  
  }
  //console.log(trex.y);
        
  trex.collide(invground);
  
 if(mousePressedOver(restart)){
  reset();
 }
      
  drawSprites();
 
}

function formClouds() {
// to make the cluods on top

if(frameCount % 60 == 0) { 
var cloud = createSprite (600,50,15,15)
cloud.y = Math.round(random(50,100));
cloud.velocityX = -5
console.log(trex.depth);
console.log(cloud.depth);
cloud.addAnimation ("Clouds",Acloud)
cloud.scale = 0.7;
// used so that the clouds do not pass through the trex.
cloud.depth = trex.depth
trex.depth = trex.depth + 1

cloudGroup.add(cloud);
}
}

function formObstacles() {
// to make the obstacles on ground
if(frameCount % 80 == 0) { 
var obs = createSprite (550,180,15,15)
obs.velocityX = -(4+score/100); 
// obs stands for obstacle

// to create random obstacles:
var rand = Math.round(random(1,6));
  
// to choose different pics for obstacles
switch(rand){
    case 1: obs.addImage("obs",obs1)
    break;
    case 2: obs.addImage("obs",obs2)
    break;
    case 3: obs.addImage("obs",obs3)
    break;
    case 4: obs.addImage("obs",obs4)
    break;
    case 5: obs.addImage("obs",obs5)
    break;
    case 6: obs.addImage("obs",obs6)
    break;
    default: break;
}
  
obs.lifetime = 183;
obs.scale = 0.4 ;
  
obstacleGroup.add(obs);
}
}

function reset(){
gameState = PLAY;
score = 0;
restart.visible = false;
gameOver.visible = false;
cloudGroup.destroyEach();
obstacleGroup.destroyEach();
trex.changeAnimation("running",trex_running);
score = score + Math.round(getFrameRate()/60);
// getFrameRate is used to slow the speed of the land after the reset button is pressed.
}